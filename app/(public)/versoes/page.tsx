import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Versões | VIABIL",
  description:
    "Conheça VIABIL Lite, Full e VIABIL Cloud. Versões compatíveis para troca de estudos entre parceiros.",
};

const versions = [
  {
    id: "lite",
    name: "VIABIL Lite",
    logo: "/assets/viabil-lite-logo.webp",
    logoAlt: "VIABIL Lite",
    tag: "Porta de entrada",
    profile: "Pequenas empresas, consultores e desenvolvedores em início de estruturação.",
    desc: "Versão acessível para iniciar a cultura VIABIL com os principais recursos de viabilidade, até 2 licenças e sem customizações.",
    facts: ["Estudos compatíveis com Full", "Principais recursos de viabilidade", "Relatórios pré-formatados", "Investimento inicial mais leve"],
  },
  {
    id: "full",
    name: "VIABIL Full",
    logo: "/assets/viabil-logo.webp",
    logoAlt: "VIABIL",
    tag: "Padrão corporativo",
    profile: "Empresas com múltiplos projetos simultâneos e equipes envolvidas no processo.",
    desc: "Versão padrão para empresas em desenvolvimento, com usuários ilimitados, parametrizações, integrações e módulos de gestão do ciclo.",
    facts: ["Gestão de Terrenos", "Viabilidade", "Consolidação", "Workflow de Tarefas"],
  },
];

const choiceSignals = [
  ["Quando Lite faz sentido", "A empresa quer entrar na cultura VIABIL com investimento mais acessível, poucos usuários e foco nos principais estudos de viabilidade."],
  ["Quando Full faz sentido", "A operação já tem vários projetos, equipes envolvidas, necessidade de usuários ilimitados, parametrizações e troca de estudos com parceiros."],
  ["Quando Acompanhamento faz sentido", "A maturidade exige comparar planejado, revisado e realizado, importar dados e replanejar ações durante a vida do empreendimento."],
  ["Quando Cloud faz sentido", "O acesso em nuvem reduz investimento inicial de licença e simplifica uso remoto com segurança, confidencialidade e auditabilidade."],
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

      <section className="section-block">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Linha VIABIL"
            heading="Escolha pela maturidade da operação, não só pela lista de recursos."
            subheading="A página foi ajustada para não prometer treinamento, pagamento, login ou recursos fora do escopo público do site."
          />
          <div className="versions-layout ui-reveal">
            {versions.map((version) => (
              <article
                className={`version-panel ${version.id === "lite" ? "lite" : ""} ${version.id === "full" ? "featured" : ""}`}
                key={version.id}
              >
                <span className="version-tag">{version.tag}</span>
                <h2 className="version-name">
                  <Image
                    src={version.logo}
                    alt={version.logoAlt}
                    width={version.id === "lite" ? 210 : 176}
                    height={52}
                    className={`version-card-logo ${version.id === "lite" ? "lite" : ""}`}
                  />
                </h2>
                <p className="version-meta">{version.profile}</p>
                <p>{version.desc}</p>
                <ul className="version-facts" aria-label={`Resumo ${version.name}`}>
                  {version.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <Link
                  className={version.id === "lite" ? "button-secondary" : "button-primary"}
                  href="/contato"
                >
                  Solicitar proposta
                </Link>
              </article>
            ))}
          </div>
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
          <div className="metric-row ui-reveal">
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
          <div className="plain-list ui-reveal">
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
