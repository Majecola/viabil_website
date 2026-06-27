import type { Metadata } from "next";
import Link from "next/link";
import { JornadaExperience } from "@/components/marketing/jornada/JornadaExperience";

export const metadata: Metadata = {
  title: "Jornada",
  robots: { index: false, follow: false },
  description:
    "Percorra o ciclo completo do empreendimento dentro do VIABIL: Gestão de Terrenos, Viabilidade, Acompanhamento, Previsto x Realizado e Consolidação de Resultados.",
};

export default function JornadaPage() {
  return (
    <>
      <JornadaExperience />

      <section className="section-block white">
        <div className="section-inner">
          <h2
            className="section-title"
            style={{ maxWidth: 880, fontSize: "clamp(34px, 5vw, 64px)" }}
          >
            Feito para a operação de hoje — do terreno ao resultado consolidado.
          </h2>
          <p className="section-subtitle">
            Cada estágio que você acabou de percorrer é um módulo do VIABIL. A mesma
            linguagem financeira acompanha a oportunidade desde a originação até a
            visão executiva do portfólio.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/modulos">
              Conhecer os módulos
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link className="button-secondary" href="/contato">
              Agendar demonstração
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
