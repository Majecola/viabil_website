import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Módulos | VIABIL",
  description:
    "Conheça os módulos do VIABIL: Gestão de Terrenos, Viabilidade, Acompanhamento, Consolidação e Workflow de Tarefas.",
};

const modules = [
  {
    id: "01",
    name: "Gestão de Terrenos",
    tag: "Originação e landbank",
    headline: "A oportunidade entra organizada antes de virar estudo.",
    desc: "Centraliza terrenos oferecidos e prospectados, documentos, imagens, dados urbanísticos, histórico de negociação, filtros e tarefas da equipe de Novos Negócios.",
    facts: ["40+ filtros combinados", "Google Maps e documentos", "Histórico de negociação", "Link direto para Viabilidade"],
  },
  {
    id: "02",
    name: "Viabilidade",
    tag: "Simulação financeira",
    headline: "O motor principal para decisões de Go/No-Go.",
    desc: "Projeta fluxo de caixa, indicadores e premissas para incorporação residencial, casas, loteamentos, MCMV, corporativo, logística, shopping e projetos mistos.",
    facts: ["VGV, margem, VPL, TIR, MTIR e ROI", "Stress-cenários em variáveis críticas", "Premissas e modelos parametrizáveis", "Relatórios exportáveis para Excel"],
  },
  {
    id: "03",
    name: "Acompanhamento",
    tag: "Pro / ACP",
    headline: "Não basta acompanhar. Precisa agir.",
    desc: "Compara planejado, revisado e realizado, importa dados de ERPs ou planilhas e permite replanejar ações para buscar as metas definidas no estudo.",
    facts: ["Previsto x revisado x realizado", "Alertas de divergência", "Wizard de reprojeção", "Visão para sócios e investidores"],
  },
  {
    id: "04",
    name: "Consolidação de Resultados",
    tag: "Portfólio",
    headline: "A visão executiva entre projetos, oportunidades e capital.",
    desc: "Consolida fluxos e indicadores de projetos em prospecção, desenvolvimento e modelos futuros para apoiar planejamento estratégico e decisões de alocação.",
    facts: ["Fluxo consolidado", "Comparativo entre cenários", "Necessidade de aporte no tempo", "Ranking de oportunidades"],
  },
  {
    id: "05",
    name: "Workflow de Tarefas",
    tag: "Processo e governança",
    headline: "Cada etapa com responsável, prazo e histórico.",
    desc: "Gerencia atividades desde captação do terreno até chaves e recebíveis, com checklists, pendências por usuário e acompanhamento gerencial.",
    facts: ["Etapas e responsáveis", "Pendências por usuário", "Lembretes por e-mail", "Histórico por terreno ou projeto"],
  },
];

const reportExamples = [
  {
    label: "Premissas e cenários",
    desc: "Registra condições comerciais, obra, financiamento, permutas e parâmetros que sustentam cada versão do estudo.",
  },
  {
    label: "Fluxos de caixa",
    desc: "Permite leitura sintética ou analítica, nominal, indexada ou a valor presente, com visão do projeto e dos participantes.",
  },
  {
    label: "Sensibilidade e indicadores",
    desc: "Mostra como TIR, VPL, margem, ROI, exposição de caixa e payback reagem a mudanças nas variáveis críticas.",
  },
];

export default function ModulosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Módulos</span>
            <h1 className="page-title">Cinco módulos para uma visão contínua do negócio.</h1>
            <p className="page-subtitle">
              O VIABIL conecta originação, viabilidade, decisão, acompanhamento,
              consolidação e processo. A empresa deixa de analisar eventos isolados e
              passa a gerir o ciclo financeiro completo.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Arquitetura"
            heading="Cada módulo cobre uma decisão crítica."
            subheading="A composição muda conforme a versão contratada, mas o objetivo é sempre manter a mesma linguagem financeira em todos os estágios."
          />
          <div className="module-stack ui-reveal">
            {modules.map((mod) => (
              <article className="module-panel" key={mod.id}>
                <div className="module-number">{mod.id}</div>
                <div>
                  <span className="module-tag">{mod.tag}</span>
                  <h2>{mod.name}</h2>
                  <p><strong>{mod.headline}</strong></p>
                  <p>{mod.desc}</p>
                </div>
                <ul className="module-facts" aria-label={`Destaques de ${mod.name}`}>
                  {mod.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Integração"
              heading="O ganho aparece quando os módulos conversam."
              subheading="Uma oportunidade cadastrada em Terrenos vira estudo em Viabilidade. O estudo aprovado vira referência para Acompanhamento. Os resultados alimentam a Consolidação e o processo ganha rastreabilidade no Workflow."
            />
            <div className="pill-row">
              <span className="info-pill">Menos retrabalho</span>
              <span className="info-pill">Menos ruído de versão</span>
              <span className="info-pill">Mais governança</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Relatórios"
            heading="O módulo de viabilidade entrega material para análise, não só telas de sistema."
            subheading="Os exemplos de relatórios da pasta de conteúdo reforçam que a decisão depende de premissas, fluxos, comparativos, tabelas e indicadores exportáveis."
          />
          <div className="report-showcase ui-reveal">
            <div className="report-visual" aria-label="Visual inspirado em relatórios VIABIL">
              <div className="report-visual-header">
                <span>Fluxo consolidado</span>
                <strong>VPL · TIR · Margem</strong>
              </div>
              <div className="report-bars" aria-hidden="true">
                <span style={{ "--bar": "42%" } as CSSProperties} />
                <span style={{ "--bar": "62%" } as CSSProperties} />
                <span style={{ "--bar": "54%" } as CSSProperties} />
                <span style={{ "--bar": "76%" } as CSSProperties} />
                <span style={{ "--bar": "68%" } as CSSProperties} />
              </div>
              <div className="report-kpis" aria-hidden="true">
                <span>VGV</span>
                <span>TIR</span>
                <span>Exposição</span>
              </div>
            </div>
            <div className="plain-list">
              {reportExamples.map((item) => (
                <article className="plain-list-item" key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner">
          <div className="ui-reveal">
            <SectionHeader
              eyebrow="Exemplos de relatório"
              heading="O VIABIL entrega documentos para análise, não só telas de sistema."
              subheading="Os relatórios saem do módulo de Viabilidade e do Acompanhamento prontos para comitê, sócios, investidores e parceiros. Os exemplos abaixo são amostras reais geradas pela plataforma."
            />
          </div>
          <div className="report-sample-grid ui-reveal">
            <article className="report-sample">
              <div className="report-sample-header">
                <span className="report-sample-name">Fluxo Consolidado</span>
                <span className="report-sample-tag">Viabilidade</span>
              </div>
              <div className="report-kpi-list">
                <div className="report-kpi-row">
                  <span className="report-kpi-label">VGV Total</span>
                  <span className="report-kpi-value">R$ 24.800.000</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Custo Total</span>
                  <span className="report-kpi-value neutral">R$ 16.200.000</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Margem Bruta</span>
                  <span className="report-kpi-value">34,7%</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">TIR do empreendimento</span>
                  <span className="report-kpi-value">28,4% a.a.</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">VPL</span>
                  <span className="report-kpi-value">R$ 3.140.000</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Exposição de caixa máx.</span>
                  <span className="report-kpi-value neutral">R$ 4.800.000</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Payback</span>
                  <span className="report-kpi-value neutral">28 meses</span>
                </div>
              </div>
              <a
                className="report-sample-link"
                href="/assets/relatorios/fluxo consolidado.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M8 1v9M4 6l4 4 4-4M2 12v2h12v-2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ver exemplo real
              </a>
            </article>

            <article className="report-sample">
              <div className="report-sample-header">
                <span className="report-sample-name">Premissas Comerciais</span>
                <span className="report-sample-tag">Viabilidade</span>
              </div>
              <div className="report-kpi-list">
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Preço médio de venda</span>
                  <span className="report-kpi-value neutral">R$ 6.200/m²</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Velocidade de vendas</span>
                  <span className="report-kpi-value neutral">4 und/mês</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Prazo de obra</span>
                  <span className="report-kpi-value neutral">24 meses</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">INCC na obra</span>
                  <span className="report-kpi-value neutral">100%</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Tabela de vendas</span>
                  <span className="report-kpi-value neutral">30% ato + 70% chaves</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">% Permuta financeira</span>
                  <span className="report-kpi-value neutral">18% do VGV</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Distrato estimado</span>
                  <span className="report-kpi-value neutral">5%</span>
                </div>
              </div>
              <a
                className="report-sample-link"
                href="/assets/relatorios/Premissas Comerciais.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M8 1v9M4 6l4 4 4-4M2 12v2h12v-2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ver exemplo real
              </a>
            </article>

            <article className="report-sample">
              <div className="report-sample-header">
                <span className="report-sample-name">Comparativo de Indicadores</span>
                <span className="report-sample-tag">Acompanhamento</span>
              </div>
              <div className="report-kpi-list">
                <div className="report-kpi-row">
                  <span className="report-kpi-label">TIR — Cenário base</span>
                  <span className="report-kpi-value">28,4% a.a.</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">TIR — Cenário otimista</span>
                  <span className="report-kpi-value">34,1% a.a.</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">TIR — Cenário conservador</span>
                  <span className="report-kpi-value down">21,8% a.a.</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">VPL — Cenário base</span>
                  <span className="report-kpi-value">R$ 3.140.000</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Margem — Base</span>
                  <span className="report-kpi-value">34,7%</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Margem — Otimista</span>
                  <span className="report-kpi-value">39,2%</span>
                </div>
                <div className="report-kpi-row">
                  <span className="report-kpi-label">Margem — Conservador</span>
                  <span className="report-kpi-value down">28,4%</span>
                </div>
              </div>
              <a
                className="report-sample-link"
                href="/assets/relatorios/comparativo indic.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M8 1v9M4 6l4 4 4-4M2 12v2h12v-2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ver exemplo real
              </a>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        heading="Quer entender quais módulos fazem sentido para sua operação?"
        subheading="A demonstração pode focar no estágio da sua empresa: originação, aprovação de novos projetos, acompanhamento ou visão consolidada."
      />
    </>
  );
}
