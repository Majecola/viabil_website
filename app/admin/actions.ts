"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { writeAuditEvent } from "@/lib/admin/audit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServer, hasSupabasePublicEnv } from "@/lib/supabase/server";
import { newsletterCampaignSchema } from "@/lib/validation/contact";

export type AuthActionState = {
  error?: string;
};

export async function loginAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  if (!hasSupabasePublicEnv()) {
    return { error: "Supabase Auth não está configurado." };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Credenciais inválidas ou acesso não autorizado." };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("is_active", true)
    .eq("email", email)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return { error: "Este e-mail não está aprovado para o painel VIABIL." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateInquiryStatusAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "open");

  if (!id || !["new", "open", "replied", "closed"].includes(status)) {
    return;
  }

  const supabase = getSupabaseAdmin();
  await supabase.from("lead_inquiries").update({ status }).eq("id", id);
  await writeAuditEvent(supabase, {
    actorAdminId: admin.id,
    action: "inquiry.status.update",
    entityType: "lead_inquiry",
    entityId: id,
    metadata: { status },
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function addInquiryNoteAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id") || "");
  const note = String(formData.get("note") || "").trim();

  if (!id || !note) {
    return;
  }

  const supabase = getSupabaseAdmin();
  await supabase.from("inquiry_notes").insert({
    inquiry_id: id,
    admin_id: admin.id,
    note,
  });
  await writeAuditEvent(supabase, {
    actorAdminId: admin.id,
    action: "inquiry.note.add",
    entityType: "lead_inquiry",
    entityId: id,
  });
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function createNewsletterCampaignAction(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = newsletterCampaignSchema.safeParse({
    title: formData.get("title"),
    subject: formData.get("subject"),
    audience: formData.get("audience"),
    previewText: formData.get("previewText"),
    bodyHtml: formData.get("bodyHtml"),
  });

  if (!parsed.success) {
    return;
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("newsletter_campaigns")
    .insert({
      title: parsed.data.title,
      subject: parsed.data.subject,
      audience: parsed.data.audience,
      preview_text: parsed.data.previewText || null,
      body_html: parsed.data.bodyHtml,
      status: "draft",
      created_by: admin.id,
    })
    .select("id")
    .single();

  await writeAuditEvent(supabase, {
    actorAdminId: admin.id,
    action: "newsletter.campaign.create",
    entityType: "newsletter_campaign",
    entityId: data?.id,
  });
  revalidatePath("/admin/newsletters");
}
