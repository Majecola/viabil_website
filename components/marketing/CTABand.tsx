import Link from "next/link";
import { getWhatsAppHref } from "@/lib/whatsapp";

interface CTABandProps {
  heading?: string;
  subheading?: string;
}

export function CTABand({
  heading = "Pronto para conhecer o VIABIL?",
  subheading = "Solicite uma demonstração e veja como o VIABIL apoia decisões financeiras críticas, do terreno ao resultado.",
}: CTABandProps) {
  const whatsappHref = getWhatsAppHref(
    "Olá, gostaria de solicitar uma demonstração do VIABIL.",
  );
  const isExternal = whatsappHref.startsWith("https://");

  return (
    <section className="cta-band">
      <div className="cta-band-inner">
        <h2>{heading}</h2>
        <p>{subheading}</p>
        <div className="cta-actions">
          <a
            className="button-whatsapp"
            href={whatsappHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            Solicitar demonstração
          </a>
          <Link className="button-secondary" href="/contato">
            Falar com especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
