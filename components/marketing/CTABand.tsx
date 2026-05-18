import Link from "next/link";

interface CTABandProps {
  heading?: string;
  subheading?: string;
}

export function CTABand({
  heading = "Pronto para conhecer o VIABIL?",
  subheading = "Solicite uma demonstração e veja como o VIABIL pode transformar a inteligência financeira da sua incorporadora.",
}: CTABandProps) {
  return (
    <section style={{ background: "#0A4B35", color: "#fff", padding: "72px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.5px" }}>
          {heading}
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 40 }}>
          {subheading}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/PLACEHOLDER?text=Ol%C3%A1%2C+gostaria+de+solicitar+uma+demonstra%C3%A7%C3%A3o+do+VIABIL."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.27 2 2 8.27 2 16c0 2.45.67 4.75 1.83 6.73L2 30l7.5-1.8A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2Z" />
            </svg>
            Solicitar demonstração
          </a>
          <Link
            href="/contato"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Falar com especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
