const DEFAULT_MESSAGE =
  "Olá, gostaria de falar com um especialista VIABIL sobre uma demonstração.";

export function getWhatsAppHref(message = DEFAULT_MESSAGE) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const configuredMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE;
  const text = configuredMessage || message;

  if (!number) {
    return "/contato";
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
