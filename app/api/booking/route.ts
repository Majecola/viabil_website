import { NextResponse, type NextRequest } from "next/server";
import { BOOKING_DURATION_MIN, isSlotAvailable } from "@/lib/booking/slots";
import { getFromEmail, getResend, hasResendEnv } from "@/lib/email/resend";
import { matchCustomerByEmail } from "@/lib/leads/customer-match";
import { encryptText } from "@/lib/security/crypto";
import { getClientIp, hashIdentifier, normalizeEmail, normalizePhone } from "@/lib/security/hash";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { bookingRequestSchema } from "@/lib/validation/contact";

/**
 * "Agendar uma apresentação" — a visitor REQUESTS a slot on Eli's agenda.
 *
 * Nothing is booked here: the request is stored as a lead, Eli is notified,
 * and the visitor gets a "recebemos, aguardando confirmação" e-mail. The
 * calendar invite goes out only once Eli confirms (next phase, together with
 * the live free/busy lookup in lib/booking/slots.ts).
 */
export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Revise os campos e tente novamente." }, { status: 400 });
  }

  const input = parsed.data;

  if (!isSlotAvailable(input.date, input.time)) {
    return NextResponse.json(
      { error: "Esse horário acabou de ficar indisponível. Escolha outro, por favor." },
      { status: 409 },
    );
  }

  if (!hasSupabaseAdminEnv()) {
    // Local preview without a database: let the flow be exercised end to end.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, preview: true });
    }
    return NextResponse.json({ error: "Agendamento indisponível no momento." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const ip = getClientIp(request.headers);
  const customerMatch = await matchCustomerByEmail(supabase, email);
  const when = formatSlot(input.date, input.time);

  const message = [
    `Pedido de apresentação: ${when} (${BOOKING_DURATION_MIN} min, horário de Brasília).`,
    input.city ? `Cidade/UF: ${input.city}` : "",
    input.message ? `\n${input.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { data, error } = await supabase
    .from("lead_inquiries")
    .insert({
      name: input.name,
      company: input.company,
      email,
      email_hash: hashIdentifier(email),
      phone_encrypted: encryptText(input.phone),
      phone_hash: phone ? hashIdentifier(phone) : null,
      segment: input.segment,
      source: "Agendar apresentação",
      source_page: input.sourcePage || null,
      message_encrypted: encryptText(message),
      is_customer: customerMatch.isCustomer,
      customer_match_source: customerMatch.source,
      ip_hash: ip ? hashIdentifier(ip) : null,
      user_agent: request.headers.get("user-agent"),
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to store booking request", error);
    return NextResponse.json({ error: "Não foi possível registrar seu pedido agora." }, { status: 500 });
  }

  const hostEmail = process.env.BOOKING_HOST_EMAIL || process.env.CONTACT_NOTIFICATION_EMAIL;

  if (hasResendEnv()) {
    const resend = getResend();
    const sends: Promise<unknown>[] = [
      resend.emails.send({
        from: getFromEmail(),
        to: email,
        subject: "Recebemos seu pedido de apresentação do VIABIL",
        html: `
          <p>Olá, ${escapeHtml(input.name)}.</p>
          <p>Recebemos seu pedido de apresentação do VIABIL para <strong>${escapeHtml(when)}</strong>
          (horário de Brasília, ${BOOKING_DURATION_MIN} minutos).</p>
          <p>O horário ainda está <strong>aguardando confirmação</strong>. Assim que ele for confirmado,
          você recebe o convite com o link da videochamada neste e-mail.</p>
          <p>Equipe VIABIL</p>
        `,
      }),
    ];

    if (hostEmail) {
      sends.push(
        resend.emails.send({
          from: getFromEmail(),
          to: hostEmail,
          replyTo: email,
          subject: `Pedido de apresentação: ${input.company} · ${when}`,
          html: `
            <h2>Novo pedido de apresentação</h2>
            <p><strong>Horário pedido:</strong> ${escapeHtml(when)} (Brasília, ${BOOKING_DURATION_MIN} min)</p>
            <p><strong>Nome:</strong> ${escapeHtml(input.name)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(input.company)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(input.phone)}</p>
            <p><strong>Cidade/UF:</strong> ${escapeHtml(input.city || "-")}</p>
            <p><strong>Segmento:</strong> ${escapeHtml(input.segment)}</p>
            <p><strong>Cliente VIABIL:</strong> ${customerMatch.isCustomer ? "Sim" : "Não"}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${escapeHtml(input.message || "-").replace(/\n/g, "<br />")}</p>
          `,
        }),
      );
    }

    // The request is already stored; a mail failure must not fail it.
    await Promise.allSettled(sends);
  }

  return NextResponse.json({ ok: true, id: data.id });
}

function formatSlot(date: string, time: string) {
  const label = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  return `${label}, às ${time}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
