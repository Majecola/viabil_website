import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "Sobre | VIABIL — BDK Solutions",
  description: "Conheça a BDK Solutions e a história do VIABIL. 25+ anos de experiência no mercado imobiliário brasileiro.",
};

const values = [
  { label: "Especialização", desc: "O VIABIL foi construído por quem vive o mercado imobiliário — não por desenvolvedores genéricos de software de gestão." },
  { label: "Confiabilidade", desc: "600+ empresas confiam no VIABIL para decisões que envolvem centenas de milhões de reais. Precisão não é opcional." },
  { label: "Evolução contínua", desc: "O mercado imobiliário muda — reforma tributária, novos instrumentos financeiros, novos modelos de negócio. O VIABIL acompanha." },
  { label: "Parceria de longo prazo", desc: "Nossos clientes não são usuários — são parceiros. A maioria está conosco há mais de 10 anos." },
];

const timeline = [
  { year: "1995", event: "Fundação da BDK Solutions por Eli Wolf, com foco em soluções financeiras para o mercado imobiliário." },
  { year: "2000s", event: "Desenvolvimento do modelo proprietário de análise de viabilidade financeira para incorporação. Início dos primeiros clientes-parceiros." },
  { year: "2010s", event: "Consolidação do VIABIL como o padrão de referência no mercado. Expansão para múltiplos segmentos imobiliários." },
  { year: "2020s", event: "Lançamento do VIABIL Cloud. Expansão da base para 600+ empresas. Início da migração para plataforma moderna." },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function SobrePage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Sobre
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            BDK Solutions e O VIABIL
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 640 }}>
            Nascemos dentro do universo da incorporação imobiliária. Não criamos o VIABIL porque entendemos de software — criamos porque entendemos de empreendimentos.
          </p>
        </div>
      </section>

      <section style={{ ...S.section, background: "#fff" }}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", background: "#E8F4EE", color: "#0A4B35", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
                Manifesto
              </span>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#1A2320", marginBottom: 24, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                Nascemos dentro do universo da incorporação imobiliária
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "O mercado imobiliário transforma territórios, cria patrimônio e define como as cidades crescem. É um mercado que exige decisões rápidas sobre informações complexas.",
                  "Planilhas não foram feitas para o ciclo do empreendimento. O VIABIL foi.",
                  "Somos a ferramenta que permite ao incorporador, ao analista e ao CEO tomarem decisões com a mesma qualidade de análise — independentemente do estágio do projeto ou do tamanho da empresa.",
                ].map((p) => (
                  <p key={p} style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>{p}</p>
                ))}
              </div>
            </div>
            <div style={{ background: "#0A4B35", borderRadius: 20, padding: "40px 36px", color: "#fff" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 8 }}>Diretor Executivo & Idealizador</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Eli Wolf</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>BDK Solutions — desde 1995</div>
              <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.2)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontStyle: "italic" }}>
                &ldquo;O VIABIL não é um software financeiro com um módulo imobiliário. É um sistema construído de dentro para fora do mercado — para quem toma decisões que transformam cidades.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <SectionHeader eyebrow="Nossa história" heading="25+ anos de mercado" />
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "#E6E8EB" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {timeline.map((item) => (
                <div key={item.year} style={{ position: "relative", paddingLeft: 24 }}>
                  <div style={{ position: "absolute", left: -28, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#0A4B35", border: "2px solid #fff", boxShadow: "0 0 0 2px #0A4B35" }} />
                  <span style={{ display: "inline-block", background: "#0A4B35", color: "#fff", fontSize: 12, fontWeight: 800, padding: "2px 10px", borderRadius: 6, marginBottom: 8 }}>{item.year}</span>
                  <p style={{ margin: 0, fontSize: 15, color: "#374151", lineHeight: 1.65 }}>{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...S.section, background: "#fff" }}>
        <div style={S.container}>
          <SectionHeader eyebrow="Valores" heading="O que nos guia" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {values.map((v) => (
              <div key={v.label} style={{ background: "#F8F9FA", borderRadius: 16, padding: "28px 24px", border: "1px solid #E6E8EB" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A4B35", marginBottom: 10 }}>{v.label}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Faça parte dos 600+ que escolheram o VIABIL" />
    </div>
  );
}
