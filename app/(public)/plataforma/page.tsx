import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "A Plataforma | VIABIL",
  description: "Conheça o VIABIL: a plataforma de referência em inteligência financeira para incorporação imobiliária. Do terreno ao resultado.",
};

const cycle = [
  { step: "01", label: "Captação", desc: "Inteligência geográfica e análise de mercado para identificar terrenos com potencial antes da concorrência." },
  { step: "02", label: "Terrenos", desc: "Gestão de landbank, histórico de negociações, indicadores de potencial construtivo e viabilidade preliminar." },
  { step: "03", label: "Viabilidade", desc: "Análise financeira completa: VGV, funding, cronograma de obras, premissas de vendas e margem por cenário." },
  { step: "04", label: "Decisão", desc: "Relatórios executivos e dashboards que transformam dados em argumentos para parceiros, sócios e investidores." },
  { step: "05", label: "Acompanhamento", desc: "Previsto × realizado em tempo real para que o empreendimento entregue o que a viabilidade prometeu." },
];

const pillars = [
  { label: "Valor Agregado", desc: "Decisões mais seguras em todas as etapas do empreendimento, do terreno ao resultado." },
  { label: "Flexibilidade", desc: "Premissas, indicadores e relatórios parametrizáveis para cada realidade de negócio." },
  { label: "Parametrização", desc: "Adapte o VIABIL ao seu modelo de trabalho, segmento e equipe — não o contrário." },
  { label: "Confiança", desc: "Padrão adotado por 600+ empresas. Análises que geram credibilidade com sócios, parceiros e investidores." },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
  card: { background: "#fff", borderRadius: 16, padding: "32px 28px", border: "1px solid #E6E8EB" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 } as React.CSSProperties,
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 } as React.CSSProperties,
};

export default function PlataformaPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            A Plataforma
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            O que é o VIABIL?
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 600 }}>
            O VIABIL é o sistema integrado de inteligência financeira para o ciclo completo do empreendimento imobiliário. Da captação do terreno ao acompanhamento da obra — todas as decisões num único ambiente parametrizável.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <SectionHeader
            eyebrow="O Ciclo VIABIL"
            heading="Do terreno ao resultado"
            subheading="O VIABIL organiza a inteligência financeira em cinco momentos do ciclo do empreendimento, do primeiro mapa até o previsto × realizado."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cycle.map((item) => (
              <div key={item.step} style={{ ...S.card, display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span style={{ background: "#E8F4EE", color: "#0A4B35", fontWeight: 900, fontSize: 13, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                  {item.step} — {item.label}
                </span>
                <p style={{ margin: 0, fontSize: 15, color: "#374151", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...S.section, background: "#fff" }}>
        <div style={S.container}>
          <SectionHeader
            eyebrow="Por que o VIABIL"
            heading="Planilhas vs. VIABIL"
            subheading="A planilha nunca foi feita para o ciclo do empreendimento. O VIABIL foi."
          />
          <div style={S.grid2}>
            {[
              ["Com planilhas", ["Dados dispersos em dezenas de arquivos", "Sem controle de versão ou auditoria", "Erros de fórmula invisíveis", "Análises isoladas por projeto", "Sem padronização entre equipes"]],
              ["Com o VIABIL", ["Tudo num único ambiente integrado", "Histórico completo e rastreável", "Premissas auditáveis e versionadas", "Consolidação automática de portfólio", "Padrão único para toda a empresa"]],
            ].map(([title, items]) => (
              <div key={title as string} style={{ ...S.card, borderLeft: title === "Com o VIABIL" ? "4px solid #0A4B35" : "4px solid #E6E8EB" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: title === "Com o VIABIL" ? "#0A4B35" : "#374151", marginBottom: 20 }}>
                  {title as string}
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {(items as string[]).map((item) => (
                    <li key={item} style={{ fontSize: 14, color: "#374151", display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: title === "Com o VIABIL" ? "#0A4B35" : "#9CA3AF", fontWeight: 700, flexShrink: 0 }}>
                        {title === "Com o VIABIL" ? "✓" : "✗"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <SectionHeader eyebrow="Diferenciais" heading="Os 4 pilares do VIABIL" />
          <div style={S.grid2}>
            {pillars.map((p) => (
              <div key={p.label} style={S.card}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0A4B35", marginBottom: 10 }}>{p.label}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
