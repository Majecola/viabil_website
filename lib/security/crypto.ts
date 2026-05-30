import crypto from "node:crypto";
import { getRequiredServerEnv } from "@/lib/env";

type EncryptedPayload = {
  alg: "aes-256-gcm";
  iv: string;
  tag: string;
  value: string;
};

function getEncryptionKey() {
  const raw = getRequiredServerEnv("PII_ENCRYPTION_KEY");
  const key = raw.length === 64 ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");

  if (key.length !== 32) {
    throw new Error("PII_ENCRYPTION_KEY must be a 32-byte key encoded as base64 or hex.");
  }

  return key;
}

export function encryptText(value: string | null | undefined): EncryptedPayload | null {
  const text = value?.trim();

  if (!text) {
    return null;
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    alg: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    value: encrypted.toString("base64"),
  };
}

export function decryptText(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const encrypted = payload as Partial<EncryptedPayload>;

  if (encrypted.alg !== "aes-256-gcm" || !encrypted.iv || !encrypted.tag || !encrypted.value) {
    return "";
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(encrypted.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(encrypted.tag, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted.value, "base64")),
    decipher.final(),
  ]).toString("utf8");
}
