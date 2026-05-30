import crypto from "node:crypto";
import { getRequiredServerEnv } from "@/lib/env";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function hashIdentifier(value: string) {
  const secret = process.env.PII_HASH_SECRET || getRequiredServerEnv("PII_ENCRYPTION_KEY");

  return crypto
    .createHmac("sha256", secret)
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }

  return headers.get("x-real-ip") || "";
}
