import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { writeAuditEvent } from "@/lib/admin/audit";
import { getFromEmail, getResend, hasResendEnv } from "@/lib/email/resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { replySchema } from "@/lib/validation/contact";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  const { id } = await context.params;
  const payload = await request.json().catch(() => null);
  const parsed = replySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Revise o assunto e a mensagem." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: inquiry } = await supabase
    .from("lead_inquiries")
    .select("id, email, name")
    .eq("id", id)
    .single();

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
  }

  let resendId: string | null = null;
  let deliveryStatus = "stored";

  if (hasResendEnv()) {
    const { data, error } = await getResend().emails.send({
      from: getFromEmail(),
      to: inquiry.email,
      subject: parsed.data.subject,
      html: parsed.data.body.replace(/\n/g, "<br />"),
    });

    if (error) {
      console.error("Failed to send inquiry reply", error);
      return NextResponse.json({ error: "Não foi possível enviar o e-mail." }, { status: 500 });
    }

    resendId = data?.id || null;
    deliveryStatus = "sent";
  }

  const { error } = await supabase.from("inquiry_replies").insert({
    inquiry_id: id,
    admin_id: admin.id,
    subject: parsed.data.subject,
    body: parsed.data.body,
    recipient_email: inquiry.email,
    resend_id: resendId,
    delivery_status: deliveryStatus,
  });

  if (error) {
    console.error("Failed to store inquiry reply", error);
    return NextResponse.json({ error: "Resposta enviada, mas não registrada." }, { status: 500 });
  }

  await supabase.from("lead_inquiries").update({ status: "replied" }).eq("id", id);
  await writeAuditEvent(supabase, {
    actorAdminId: admin.id,
    action: "inquiry.reply",
    entityType: "lead_inquiry",
    entityId: id,
    metadata: { deliveryStatus },
  });

  return NextResponse.json({ ok: true, deliveryStatus });
}
