import Link from "next/link";

const footerLinks = [
  {
    title: "Produto",
    links: [
      { href: "/plataforma", label: "A Plataforma" },
      { href: "/modulos", label: "Módulos" },
      { href: "/versoes", label: "Versões" },
      { href: "/servicos", label: "Serviços" },
    ],
  },
  {
    title: "Mercado",
    links: [
      { href: "/segmentos", label: "Segmentos" },
      { href: "/sobre", label: "Sobre a BDK" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "#0A4B35", color: "#fff", marginTop: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: "-0.5px", marginBottom: 8 }}>VIABIL</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>by BDK Solutions — desde 1995</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 320 }}>
              A referência em inteligência financeira para o mercado imobiliário brasileiro. Do terreno ao resultado.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} BDK Solutions. Todos os direitos reservados.
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            VIABIL® — Marca registrada
          </span>
        </div>
      </div>
    </footer>
  );
}
