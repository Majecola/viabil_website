import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "Módulos | VIABIL",
  description: "Conheça os 5 módulos do VIABIL: Terrenos, Viabilidade, Acompanhamento, Consolidação e Workflow.",
};

const modules = [
  {
    id: "01",
    name: "Gestão de Terrenos",
    tag: "Landbank",
    color: "#0A4B35",
    headline: "Todo o seu landbank num único mapa",
    desc: "Gerencie o pipeline de aquisições, histórico de negociações, potencial construtivo e viabilidade preliminar de cada oportunidade. Do primeiro contato até a compra — tudo rastreado.",
    features: [
      "Cadastro e georeferenciamento de terrenos",
      "Pipeline de negociação por estágio",
      "Viabilidade preliminar rápida",
      "Indicadores de potencial construtivo",
      "Histórico de precificações e propostas",
      "Integração com o módulo de Viabilidade",
    ],
  },
  {
    id: "02",
    name: "Viabilidade",
    tag: "Análise Financeira",
    color: "#1A6B4A",
    headline: "A análise financeira mais completa do mercado",
    desc: "Modelo financeiro parametrizável para qualquer tipo de empreendimento imobiliário. VGV, funding, cronograma de vendas e obras, fluxo de caixa, TIR, VPL, margem e sensibilidade — num único ambiente.",
    features: [
      "Premissas parametrizáveis por empreendimento",
      "Cronograma de vendas com velocidade ajustável",
      "Financiamento, permuta e aporte de capital",
      "Fluxo de caixa completo com INCC e variações",
      "TIR, VPL, Payback, Margem e ROE",
      "Análise de sensibilidade com cenários múltiplos",
    ],
  },
  {
    id: "03",
    name: "Acompanhamento",
    tag: "Previsto × Realizado",
    color: "#2E6B8A",
    headline: "O empreendimento precisa entregar o que a viabilidade prometeu",
    desc: "Monitore o empreendimento em andamento com dashboards de previsto × realizado. Desvios de obra, velocidade de vendas, receitas e custos — tudo comparado com o plano original.",
    features: [
      "Dashboard de previsto × realizado",
      "Monitoramento de velocidade de vendas",
      "Controle de custos de obra por fase",
      "Alertas de desvio financeiro",
      "Relatórios para sócios e investidores",
      "Histórico versionado de revisões",
    ],
  },
  {
    id: "04",
    name: "Consolidação",
    tag: "Portfólio",
    color: "#5B6B4A",
    headline: "A visão do portfólio que nenhuma planilha consegue dar",
    desc: "Consolide múltiplos empreendimentos num único painel. Rentabilidade total, exposição de caixa, cronograma integrado e comparativos entre projetos — para decisões de portfólio com dados reais.",
    features: [
      "Dashboard consolidado de portfólio",
      "Comparativo entre empreendimentos",
      "Exposição total de caixa da empresa",
      "Ranking de rentabilidade por projeto",
      "Fluxo de caixa agregado",
      "Relatório executivo de portfólio",
    ],
  },
  {
    id: "05",
    name: "Workflow de Tarefas",
    tag: "Operação",
    color: "#6B4A35",
    headline: "As tarefas certas para as pessoas certas no momento certo",
    desc: "Gerencie o fluxo de trabalho da equipe dentro do ciclo do empreendimento. Atribuições, prazos, aprovações e acompanhamento de progresso — integrado à análise financeira.",
    features: [
      "Criação e atribuição de tarefas",
      "Fluxos de aprovação configuráveis",
      "Notificações e lembretes automáticos",
      "Histórico de atividades por projeto",
      "Integração com os demais módulos",
      "Visão de painel por usuário e por projeto",
    ],
  },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function ModulosPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Módulos
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            5 módulos para o ciclo completo
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 600 }}>
            Cada módulo cobre uma etapa crítica do ciclo do empreendimento. Juntos, formam um ambiente único — sem exportação, sem retrabalho, sem ruído de informação.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {modules.map((mod, i) => (
              <div key={mod.id} style={{
                background: "#fff",
                borderRadius: 20,
                padding: "40px 36px",
                border: "1px solid #E6E8EB",
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 48,
                alignItems: "start",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ background: mod.color, color: "#fff", fontWeight: 900, fontSize: 13, padding: "4px 12px", borderRadius: 8 }}>
                      {mod.id}
                    </span>
                    <span style={{ background: "#E8F4EE", color: "#0A4B35", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>
                      {mod.tag}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "#1A2320", marginBottom: 12, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                    {mod.name}
                  </h2>
                  <p style={{ fontSize: 17, fontWeight: 600, color: mod.color, marginBottom: 16 }}>{mod.headline}</p>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{mod.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16 }}>
                    Funcionalidades
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {mod.features.map((f) => (
                      <li key={f} style={{ fontSize: 14, color: "#374151", display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: mod.color, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
