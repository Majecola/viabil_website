import { NextResponse, type NextRequest } from "next/server";
import { getFromEmail, getResend, hasResendEnv } from "@/lib/email/resend";

function isAuthorized(request: NextRequest) {
  const expected = process.env.SENTRY_ALERT_WEBHOOK_SECRET;

  if (!expected) {
    return false;
  }

  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return provided === expected;
}

async function sendSms(message: string) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_SMS_TO } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !ALERT_SMS_TO) {
    return false;
  }

  const body = new URLSearchParams({
    From: TWILIO_FROM_NUMBER,
    To: ALERT_SMS_TO,
    Body: message.slice(0, 1400),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  return response.ok;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const title = String(payload.title || payload.event?.title || payload.message || "VIABIL production alert");
  const url = String(payload.url || payload.event?.web_url || "");
  const message = `[VIABIL] ${title}${url ? ` ${url}` : ""}`;
  const smsSent = await sendSms(message);

  if (hasResendEnv() && process.env.ERROR_ALERT_EMAIL) {
    await getResend().emails.send({
      from: getFromEmail(),
      to: process.env.ERROR_ALERT_EMAIL,
      subject: `Alerta VIABIL: ${title}`,
      html: `<p>${message}</p><pre>${JSON.stringify(payload, null, 2)}</pre>`,
    });
  }

  return NextResponse.json({ ok: true, smsSent });
}
