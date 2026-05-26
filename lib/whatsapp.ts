const DEFAULT_MESSAGE =
  "Olá, gostaria de falar com um especialista VIABIL sobre uma demonstração.";
const DEFAULT_WHATSAPP_NUMBER = "551130401088";

export function getWhatsAppHref(message = DEFAULT_MESSAGE) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;
  const configuredMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE;
  const text = configuredMessage || message;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
