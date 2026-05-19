import { getWhatsAppHref } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const href = getWhatsAppHref();
  const isExternal = href.startsWith("https://");

  return (
    <a
      className="whatsapp-float"
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label="Falar com a equipe VIABIL pelo WhatsApp"
      title="Falar pelo WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 2C8.27 2 2 8.27 2 16c0 2.45.67 4.75 1.83 6.73L2 30l7.5-1.8A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2Zm7.06 19.38c-.3.84-1.76 1.6-2.42 1.7-.63.1-1.42.14-2.29-.14a21.18 21.18 0 0 1-2.07-.77C12.82 21 10.3 18.3 10.1 18.06c-.2-.24-1.63-2.17-1.63-4.14s1.03-2.94 1.4-3.34c.37-.4.8-.5 1.07-.5.27 0 .54 0 .77.01.25.01.58-.1.9.69.33.8 1.13 2.77 1.23 2.97.1.2.17.43.03.7-.13.26-.2.43-.4.66-.2.23-.4.51-.57.69-.2.2-.4.41-.17.8.23.4 1.02 1.68 2.18 2.72 1.5 1.34 2.77 1.75 3.17 1.95.4.2.63.17.87-.1.23-.27.98-1.15 1.24-1.55.26-.4.52-.33.87-.2.35.13 2.22 1.05 2.6 1.24.39.19.65.29.74.45.1.16.1.93-.2 1.77Z" />
      </svg>
    </a>
  );
}
