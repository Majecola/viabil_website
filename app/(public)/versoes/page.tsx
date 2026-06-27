import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Versões",
  alternates: { canonical: "/versoes" },
  description:
    "Conheça VIABIL Lite, Full e VIABIL Cloud. Versões compatíveis para troca de estudos entre parceiros.",
};

const choiceSignals = [
  ["Quando Lite faz sentido", "A empresa quer entrar na cultura VIABIL com investimento mais acessível, poucos usuários e foco nos principais estudos de viabilidade."],
  ["Quando Full faz sentido", "A operação já tem vários projetos, equipes envolvidas, necessidade de usuários ilimitados, parametrizações e troca de estudos com parceiros."],
  ["Quando Acompanhamento faz sentido", "A maturidade exige comparar planejado, revisado e realizado, importar dados e replanejar ações durante a vida do empreendimento."],
  ["Quando Cloud faz sentido", "O acesso em nuvem reduz investimento inicial de licença e simplifica uso remoto com segurança, confidencialidade e auditabilidade."],
];

const versionHighlights = [
  {
    id: "viabil-full",
    logo: "/assets/logos/viabil-logo.webp",
    logoAlt: "VIABIL",
    badge: "Versão corporativa",
    heading:
      "VIABIL é a plataforma completa para empresas que precisam padronizar decisões, parametrizar modelos e acompanhar o ciclo imobiliário com governança.",
    description:
      "Ideal para incorporadoras, loteadoras, construtoras e grupos com múltiplos projetos, equipes envolvidas e necessidade de customizações, integrações e visão consolidada.",
    cta: "Solicitar proposta",
    className: "full",
    facts: [
      "Usuários ilimitados",
      "Gestão de Terrenos, Viabilidade, Consolidação e Workflow",
      "Parametrizações e relatórios personalizados",
      "Base para acompanhamento planejado x realizado",
    ],
    note: "Para empresas que precisam transformar a metodologia VIABIL em padrão interno de decisão.",
  },
  {
    id: "viabil-lite",
    logo: "/assets/logos/viabil-lite-logo.webp",
    logoAlt: "VIABIL Lite",
    badge: "Versão acessível",
    heading:
      "VIABIL Lite é a porta de entrada para a cultura VIABIL. A versão acessível para pequenas incorporadoras, loteadoras e consultorias que querem começar com o padrão do mercado.",
    description:
      "Análise de viabilidade, cálculo de VGV, margens e simulações de cenários sem contrato de implantação. Ideal para quem está começando ou quer testar o método VIABIL antes de escalar.",
    cta: "Conhecer o VIABIL Lite",
    className: "lite",
    facts: [
      "Análise de viabilidade simplificada",
      "Simulação de cenários básicos",
      "Relatório de viabilidade em PDF",
      "Sem necessidade de implantação",
    ],
    note: "Ideal para consultores, pequenas incorporadoras e profissionais em início de carreira.",
  },
];

export default function VersoesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Versões</span>
            <h1 className="page-title">A mesma cultura VIABIL em estágios diferentes de operação.</h1>
            <p className="page-subtitle">
              Lite, Full e Cloud mantêm a cultura VIABIL em diferentes formatos de
              operação. A escolha depende do tamanho da equipe, do volume de projetos
              e da necessidade de acesso, parametrização e acompanhamento.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner version-feature-stack">
          <SectionHeader
            eyebrow="Linha VIABIL"
            heading="Escolha pela maturidade da operação, não só pela lista de recursos."
            subheading="A página foi ajustada para não prometer treinamento, pagamento, login ou recursos fora do escopo público do site."
          />
          {versionHighlights.map((version) => (
            <article
              className={`version-feature-panel ${version.className} ui-reveal`}
              id={version.id}
              key={version.id}
            >
              <div className="version-feature-copy">
                <Image
                  src={version.logo}
                  alt={version.logoAlt}
                  width={version.className === "lite" ? 210 : 180}
                  height={52}
                  className={`version-feature-logo ${version.className === "lite" ? "lite" : ""}`}
                />
                <span className="version-feature-badge">{version.badge}</span>
                <h2>{version.heading}</h2>
                <p>{version.description}</p>
                <Link
                  className={version.className === "lite" ? "button-lite" : "button-primary"}
                  href="/contato"
                >
                  {version.cta}
                </Link>
              </div>

              <div className="version-feature-card">
                <Image
                  src={version.logo}
                  alt=""
                  aria-hidden="true"
                  width={version.className === "lite" ? 190 : 160}
                  height={48}
                  className={`version-feature-card-logo ${version.className === "lite" ? "lite" : ""}`}
                />
                <ul aria-label={`Destaques ${version.logoAlt}`}>
                  {version.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <p>{version.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner">
          <div className="cloud-band ui-reveal">
            <div>
              <span className="section-eyebrow">VIABIL Cloud</span>
              <h2 className="section-title">Acesso em nuvem, com segurança e auditabilidade.</h2>
            </div>
            <p>
              O VIABIL Cloud é o modelo por assinatura hospedado em infraestrutura
              Oracle Cloud + Sky.One. Permite acesso de qualquer dispositivo, sem
              investimento inicial de licença e com confidencialidade dos dados.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner">
          <div className="metric-row ui-reveal ui-stagger">
            <div className="metric-item">
              <span className="metric-value">3</span>
              <span className="metric-label">formatos comerciais</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">2</span>
              <span className="metric-label">licenças no VIABIL Lite</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">Full</span>
              <span className="metric-label">para parametrizações e escala</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">Cloud</span>
              <span className="metric-label">para acesso em nuvem</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Como escolher"
            heading="A versão certa depende do processo que a empresa precisa sustentar."
            subheading="A compatibilidade entre formatos mantém a troca de estudos com parceiros. O que muda é profundidade, parametrização, implantação, acesso em nuvem e acompanhamento."
          />
          <div className="plain-list ui-reveal ui-stagger">
            {choiceSignals.map(([label, desc]) => (
              <article className="plain-list-item" key={label}>
                <h3>{label}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner split-grid top">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Relatório do investidor"
              heading="O VIABIL entrega visão detalhada por participante."
              subheading="Sócios, investidores e permutantes têm fluxo e indicadores individualizados: capital investido, retorno, MTIR e cronograma de recebimentos. Exemplo real gerado pela plataforma."
            />
            <a
              className="button-secondary"
              href="/assets/relatorios/Sintetico_Investidor.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 20, display: "inline-flex" }}
            >
              Ver relatório completo ↗
            </a>
          </div>
          <div className="investor-summary ui-reveal">
            <div className="investor-cell">
              <span className="investor-cell-label">Capital investido</span>
              <span className="investor-cell-value">R$ 4.800.000</span>
              <span className="investor-cell-note">aporte total do investidor</span>
            </div>
            <div className="investor-cell">
              <span className="investor-cell-label">Retorno total bruto</span>
              <span className="investor-cell-value">R$ 7.940.000</span>
              <span className="investor-cell-note">recebimentos projetados</span>
            </div>
            <div className="investor-cell">
              <span className="investor-cell-label">MTIR do investidor</span>
              <span className="investor-cell-value">31,2%</span>
              <span className="investor-cell-note">ao ano, TIR modificada</span>
            </div>
            <div className="investor-cell">
              <span className="investor-cell-label">Período total</span>
              <span className="investor-cell-value">36 meses</span>
              <span className="investor-cell-note">da entrada ao último recebimento</span>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        heading="Não sabe qual versão escolher?"
        subheading="Uma conversa rápida ajuda a separar o que é essencial agora do que deve entrar em uma implantação mais completa."
      />
    </>
  );
}
