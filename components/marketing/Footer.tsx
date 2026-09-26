import Link from "next/link";
import { LEGACY_ROUTES_ENABLED } from "@/lib/legacy-routes";

const sectionLinks = [
  { href: "/#plataforma", label: "Plataforma" },
  { href: "/#ciclo", label: "Ciclo VIABIL" },
  { href: "/#modulos", label: "Módulos" },
  { href: "/#segmentos", label: "Segmentos" },
  { href: "/#implantacao", label: "Implantação" },
  { href: "/#contato", label: "Contato" },
];

// The v0 multi-page site. Rendered only when those routes are switched back
// on in lib/legacy-routes.ts — otherwise these would be six dead links.
const detailLinks = [
  { href: "/plataforma", label: "A plataforma" },
  { href: "/modulos", label: "Módulos em detalhe" },
  { href: "/versoes", label: "Versões" },
  { href: "/servicos", label: "Serviços" },
  { href: "/segmentos", label: "Segmentos" },
  { href: "/sobre", label: "BDK Solutions" },
];

const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/cookies", label: "Cookies" },
  { href: "/termos", label: "Termos de Uso" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="brand-lockup" href="/">
            <img
              className="brand-logo-img"
              src="/assets/logos/viabil-footer-logo.png"
              alt="VIABIL"
            />
          </Link>
          <p>
            Software de viabilidade econômico-financeira para empreendimentos
            imobiliários. Conhecimento e tecnologia para decisões com segurança.
          </p>
        </div>

        <div>
          <div className="footer-heading">Navegue</div>
          <ul className="footer-links">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a className="footer-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {LEGACY_ROUTES_ENABLED ? (
          <div>
            <div className="footer-heading">Mais detalhes</div>
            <ul className="footer-links">
              {detailLinks.map((link) => (
                <li key={link.href}>
                  <Link className="footer-link" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BDK Solutions. Todos os direitos reservados.</span>
        <ul className="footer-legal">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link className="footer-link" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <span>VIABIL® é uma marca da BDK Solutions.</span>
      </div>
    </footer>
  );
}
