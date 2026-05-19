import Link from "next/link";

const footerLinks = [
  {
    title: "Produto",
    links: [
      { href: "/plataforma", label: "Plataforma" },
      { href: "/modulos", label: "Módulos" },
      { href: "/versoes", label: "Versões" },
      { href: "/servicos", label: "Serviços" },
    ],
  },
  {
    title: "Mercado",
    links: [
      { href: "/segmentos", label: "Segmentos" },
      { href: "/sobre", label: "BDK Solutions" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="brand-lockup" href="/">
            <img className="brand-logo-img" src="/assets/viabil-logo.webp" alt="VIABIL" />
          </Link>
          <p>
            Software de viabilidade econômico-financeira para empreendimentos
            imobiliários. Conhecimento e tecnologia para decisões com segurança.
          </p>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title}>
            <div className="footer-heading">{col.title}</div>
            <ul className="footer-links">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link className="footer-link" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BDK Solutions. Todos os direitos reservados.</span>
        <span>VIABIL® é uma marca da BDK Solutions.</span>
      </div>
    </footer>
  );
}
