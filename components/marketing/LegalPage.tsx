import type { ReactNode } from "react";
import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  kicker: string;
  title: string;
  lede: string;
  updatedAt: string;
  sections: LegalSection[];
  /** Shown above the first section when the text still needs legal sign-off. */
  notice?: ReactNode;
};

export function LegalPage({
  kicker,
  title,
  lede,
  updatedAt,
  sections,
  notice,
}: LegalPageProps) {
  return (
    <article className="v1-legal">
      <header className="v1-legal-head">
        <div className="v1-shell">
          <span className="v1-kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>{lede}</p>
          <p className="v1-legal-date">Vigente desde {updatedAt}</p>
        </div>
      </header>

      <div className="v1-shell v1-legal-grid">
        <nav aria-label="Nesta página" className="v1-legal-toc">
          <p>Nesta página</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="v1-legal-body">
          {notice ? <div className="v1-legal-notice">{notice}</div> : null}

          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}

          <footer className="v1-legal-foot">
            <p>
              Dúvidas sobre este documento? Escreva para{" "}
              <a href="mailto:privacidade@viabil.com.br">privacidade@viabil.com.br</a> ou fale com
              a gente pelo <Link href="/#contato">formulário de contato</Link>.
            </p>
            <p className="v1-legal-crosslinks">
              <Link href="/privacidade">Política de Privacidade</Link>
              <Link href="/cookies">Política de Cookies</Link>
              <Link href="/termos">Termos de Uso</Link>
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
