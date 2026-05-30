import { NextResponse, type NextRequest } from "next/server";
import { getFromEmail, getResend, hasResendEnv } from "@/lib/email/resend";
import { matchCustomerByEmail } from "@/lib/leads/customer-match";
import { encryptText } from "@/lib/security/crypto";
import { getClientIp, hashIdentifier, normalizeEmail, normalizePhone } from "@/lib/security/hash";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Lead storage is not configured." }, { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Revise os campos e tente novamente." }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = getSupabaseAdmin();
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const ip = getClientIp(request.headers);
  const customerMatch = await matchCustomerByEmail(supabase, email);

  const { data, error } = await supabase
    .from("lead_inquiries")
    .insert({
      name: input.name,
      company: input.company || null,
      role: input.role || null,
      email,
      email_hash: hashIdentifier(email),
      phone_encrypted: encryptText(input.phone),
      phone_hash: phone ? hashIdentifier(phone) : null,
      segment: input.segment || null,
      source: input.source || null,
      source_page: input.sourcePage || null,
      message_encrypted: encryptText(input.message),
      is_customer: customerMatch.isCustomer,
      customer_match_source: customerMatch.source,
      ip_hash: ip ? hashIdentifier(ip) : null,
      user_agent: request.headers.get("user-agent"),
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to store lead inquiry", error);
    return NextResponse.json({ error: "Não foi possível registrar sua mensagem agora." }, { status: 500 });
  }

  if (hasResendEnv() && process.env.CONTACT_NOTIFICATION_EMAIL) {
    const resend = getResend();
    await resend.emails.send({
      from: getFromEmail(),
      to: process.env.CONTACT_NOTIFICATION_EMAIL,
      subject: `Novo contato pelo site VIABIL: ${input.name}`,
      html: `
        <h2>Novo contato pelo site VIABIL</h2>
        <p><strong>Nome:</strong> ${input.name}</p>
        <p><strong>Empresa:</strong> ${input.company || "-"}</p>
        <p><strong>Cargo:</strong> ${input.role || "-"}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${input.phone}</p>
        <p><strong>Segmento:</strong> ${input.segment || "-"}</p>
        <p><strong>Como conheceu:</strong> ${input.source || "-"}</p>
        <p><strong>Cliente VIABIL:</strong> ${customerMatch.isCustomer ? "Sim" : "Não"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${(input.message || "-").replace(/\n/g, "<br />")}</p>
      `,
    });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
