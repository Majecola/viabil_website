import Link from "next/link";

interface CTABandProps {
  heading?: string;
  subheading?: string;
}

export function CTABand({
  heading = "Pronto para conhecer o VIABIL?",
  subheading = "Solicite uma demonstração e veja como o VIABIL apoia decisões financeiras críticas, do terreno ao resultado.",
}: CTABandProps) {
  return (
    <section className="cta-band">
      <div className="cta-band-inner ui-reveal">
        <h2>{heading}</h2>
        <p>{subheading}</p>
        <div className="cta-actions">
          <Link className="button-whatsapp" href="/contato">
            Solicitar demonstração
          </Link>
          <Link className="button-secondary" href="/#contato">
            Falar com especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
