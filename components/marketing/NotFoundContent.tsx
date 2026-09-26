import Link from "next/link";
import { LEGACY_ROUTES_ENABLED } from "@/lib/legacy-routes";

/**
 * The 404 body — no navbar, no footer, no <main>.
 *
 * Page chrome is supplied by whichever layout is in scope, so this renders
 * exactly once either way:
 *   - `app/not-found.tsx` wraps it in the shell for URLs that match no
 *     route segment at all.
 *   - `app/(public)/not-found.tsx` renders it bare, because PublicLayout
 *     has already drawn the navbar, main and footer.
 *
 * Keeping the chrome out of here is the whole point: when this component
 * carried its own Navbar, a notFound() raised inside the (public) group
 * rendered one navbar from the layout and a second from the 404 itself.
 */
export function NotFoundContent() {
  return (
    <>
      <section className="page-hero dark">
        <div className="page-hero-inner" style={{ minHeight: "520px", alignItems: "center" }}>
          <div className="hero-copy-block" style={{ maxWidth: "600px" }}>
            <span
              className="eyebrow"
              style={{ letterSpacing: "0.14em", fontSize: "13px" }}
            >
              Erro 404
            </span>
            <h1 className="page-title" style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1, marginBottom: "8px" }}>
              Página não encontrada.
            </h1>
            <p className="page-subtitle" style={{ maxWidth: "480px", marginTop: "20px" }}>
              O endereço acessado não existe ou foi movido. Verifique o URL ou
              use os links abaixo para encontrar o que você precisa.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "36px",
              }}
            >
              <Link className="button-primary" href="/">
                Ir para a página inicial
              </Link>
              <Link
                className="button-secondary"
                href={LEGACY_ROUTES_ENABLED ? "/contato" : "/#contato"}
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner">
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--green-primary)",
              marginBottom: "28px",
            }}
          >
            Páginas mais acessadas
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {(LEGACY_ROUTES_ENABLED
              ? [
                  { href: "/plataforma", label: "Plataforma", desc: "Recursos e diferenciais do VIABIL." },
                  { href: "/modulos", label: "Módulos", desc: "Todos os módulos disponíveis na plataforma." },
                  { href: "/segmentos", label: "Segmentos", desc: "Incorporação, loteamento, FII e mais." },
                  { href: "/servicos", label: "Serviços", desc: "Implantação, treinamento e suporte." },
                  { href: "/versoes", label: "Versões", desc: "VIABIL Standard e VIABIL Lite." },
                  { href: "/contato", label: "Contato", desc: "Solicite uma demonstração ou fale com a equipe." },
                ]
              : // While the site is the one-pager, these are sections of it.
                [
                  { href: "/#plataforma", label: "Plataforma", desc: "Recursos e diferenciais do VIABIL." },
                  { href: "/#ciclo", label: "Ciclo VIABIL", desc: "Do terreno ao resultado, em um só ambiente." },
                  { href: "/#modulos", label: "Módulos", desc: "Todos os módulos disponíveis na plataforma." },
                  { href: "/#segmentos", label: "Segmentos", desc: "Incorporação, loteamento, corporativo e mais." },
                  { href: "/#implantacao", label: "Implantação", desc: "Treinamento, suporte e parametrização." },
                  { href: "/#contato", label: "Contato", desc: "Solicite uma demonstração ou fale com a equipe." },
                ]
            ).map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="error-nav-card"
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--green-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {label}
                </strong>
                <span style={{ fontSize: "13px", color: "var(--gray-dark)" }}>{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
