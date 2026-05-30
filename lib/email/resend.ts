import { Resend } from "resend";

let resendClient: Resend | null = null;

export function hasResendEnv() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "VIABIL <no-reply@viabil.com.br>";
}
