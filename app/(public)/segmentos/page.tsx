import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "Segmentos | VIABIL",
  description: "O VIABIL atende incorporações residenciais, casas, loteamentos, corporativo, logístico e shoppings. Veja como a plataforma se adapta ao seu segmento.",
};

const segments = [
  {
    tag: "Principal",
    name: "Incorporações Residenciais",
    headline: "O padrão da análise financeira para incorporação vertical",
    desc: "O segmento mais completo do VIABIL. Do terreno ao habite-se: VGV, velocidade de vendas, funding bancário, INCC, cronograma de obra, margem por fase e consolidação de múltiplos projetos.",
    kpis: ["VGV por tipologia e fase", "Velocidade de vendas e estoque", "Funding e cronograma de desembolso", "INCC e variação de custos", "Margem e TIR por empreendimento"],
    color: "#0A4B35",
    priority: true,
  },
  {
    tag: "Principal",
    name: "Casas & Condomínios Horizontais",
    headline: "Viabilidade para casas, sobrados e condomínios de lotes",
    desc: "Análise financeira específica para empreendimentos horizontais: loteamento fechado, condomínio de casas e sobrados. Controle de fases, personalização e velocidade de absorção.",
    kpis: ["Análise por fase de lançamento", "Custo de infraestrutura e urbanização", "Velocidade de absorção de unidades", "Personalização e adicionais", "Margem por tipologia"],
    color: "#0A4B35",
    priority: true,
  },
  {
    tag: "Principal",
    name: "Loteamentos e Urbanização",
    headline: "Do terreno bruto à venda de lotes com análise completa",
    desc: "Custo de implantação de infraestrutura, velocidade de vendas de lotes, financiamento direto ao consumidor e análise de retorno do empreendimento loteador.",
    kpis: ["Custo de terraplanagem e infraestrutura", "Velocidade de vendas e estoque de lotes", "Financiamento direto ao consumidor", "TIR e payback do projeto", "Loteamento aberto vs. fechado"],
    color: "#0A4B35",
    priority: true,
  },
  {
    tag: "Corporativo",
    name: "Comercial Corporativo",
    headline: "Escritórios, salas e lajes — análise de renda e valor",
    desc: "Vacância, carência, contratos de locação, custos condominiais, NOI e cap rate para empreendimentos de escritórios, salas comerciais e lajes corporativas.",
    kpis: ["Vacância e velocidade de absorção", "Contratos de locação com revisão", "NOI e cap rate", "Valor de mercado e de liquidação", "Cenários de saída (venda e locação)"],
    color: "#2E6B8A",
    priority: false,
  },
  {
    tag: "Logística",
    name: "Galpões Logísticos",
    headline: "BTS, condomínios logísticos e warehouses",
    desc: "Análise de viabilidade para galpões build-to-suit, condomínios logísticos e warehouses. Cap rate, contratos BTS, renda de locação e ciclo de desenvolvimento.",
    kpis: ["Cap rate e yield-on-cost", "Contratos BTS e de locação", "Custo de construção por m²", "Ciclo de desenvolvimento", "Análise de risco locatário"],
    color: "#5B6B4A",
    priority: false,
  },
  {
    tag: "Varejo & Renda",
    name: "Shoppings & Mixed-Use",
    headline: "Mix de lojas, ABL e receitas de locação",
    desc: "Análise de viabilidade para shopping centers, outlet centers e complexos de uso misto. ABL, mix de lojas, receitas de locação, aluguel mínimo e percentual, CDU e resultados por fase.",
    kpis: ["ABL e distribuição de mix", "Aluguel mínimo e percentual", "Fundo de promoção e condomínio", "CDU e cessão de uso", "Resultados consolidados por fase"],
    color: "#6B4A35",
    priority: false,
  },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function SegmentosPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Segmentos
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            Para quem é o VIABIL?
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 640 }}>
            O VIABIL nasceu para incorporação residencial, casas e loteamentos — e foi expandindo para todos os segmentos do mercado imobiliário. A plataforma se adapta ao modelo do seu negócio.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <SectionHeader
            eyebrow="Residencial — Foco principal"
            heading="Incorporação, Casas e Loteamentos"
            subheading="O VIABIL foi construído com foco no mercado residencial. Estes três segmentos têm os modelos mais maduros e parametrizáveis da plataforma."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 72 }}>
            {segments.filter(s => s.priority).map((seg) => (
              <div key={seg.name} style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", border: "2px solid #0A4B35", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                <div>
                  <span style={{ background: "#E8F4EE", color: "#0A4B35", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: 100, marginBottom: 16, display: "inline-block" }}>
                    {seg.tag}
                  </span>
                  <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, color: "#1A2320", marginBottom: 10, letterSpacing: "-0.3px" }}>{seg.name}</h2>
                  <p style={{ fontSize: 16, fontWeight: 600, color: seg.color, marginBottom: 14 }}>{seg.headline}</p>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{seg.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 14 }}>Indicadores cobertos</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {seg.kpis.map(k => (
                      <li key={k} style={{ fontSize: 14, color: "#374151", display: "flex", gap: 8 }}>
                        <span style={{ color: "#0A4B35", fontWeight: 700, flexShrink: 0 }}>✓</span>{k}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader
            eyebrow="Outros segmentos"
            heading="Corporativo, Logístico e Varejo"
            subheading="O VIABIL suporta os principais segmentos do mercado imobiliário de renda e investimento."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {segments.filter(s => !s.priority).map((seg) => (
              <div key={seg.name} style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", border: "1px solid #E6E8EB" }}>
                <span style={{ background: "#F3F4F6", color: seg.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: 100, marginBottom: 14, display: "inline-block" }}>
                  {seg.tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1A2320", marginBottom: 8 }}>{seg.name}</h3>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{seg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
