import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Versões | VIABIL",
  description: "Conheça as versões do VIABIL: Lite, Full, Pro/ACP e Cloud. Compare e escolha a certa para o seu negócio.",
};

const versions = [
  {
    id: "lite",
    name: "VIABIL Lite",
    tag: "Versão acessível",
    price: "Para começar",
    color: "#E67E22",
    bg: "#FEF3E7",
    headline: "A porta de entrada para a cultura VIABIL",
    desc: "O VIABIL Lite é a versão acessível para pequenas incorporadoras, loteadoras e consultorias que querem começar com o padrão do mercado. Sem implantação complexa, sem contrato longo.",
    features: [
      "Análise de viabilidade completa",
      "Cálculo de VGV, TIR e margem",
      "Simulação de cenários",
      "Relatórios em PDF",
      "Acesso individual",
      "Suporte por e-mail",
    ],
    notIncluded: ["Gestão de Terrenos (Landbank)", "Módulo de Acompanhamento", "Consolidação de Portfólio", "Workflow de Tarefas", "Multi-usuário"],
  },
  {
    id: "full",
    name: "VIABIL Full",
    tag: "Mais popular",
    price: "Para empresas em crescimento",
    color: "#0A4B35",
    bg: "#E8F4EE",
    headline: "O ciclo completo para incorporadoras em crescimento",
    desc: "Todos os 5 módulos integrados. Do landbank ao acompanhamento de obra — a plataforma completa para equipes que precisam de padrão e escala.",
    features: [
      "Todos os módulos (Terrenos, Viabilidade, Acompanhamento, Consolidação, Workflow)",
      "Multi-usuário com perfis de acesso",
      "Relatórios executivos personalizados",
      "Consolidação de portfólio",
      "Suporte dedicado",
      "Treinamento de implantação",
    ],
    notIncluded: [],
  },
  {
    id: "pro",
    name: "VIABIL Pro / ACP",
    tag: "Para grandes operações",
    price: "Para empresas de grande porte",
    color: "#1A2320",
    bg: "#F3F4F6",
    headline: "Inteligência financeira para grandes carteiras imobiliárias",
    desc: "O VIABIL Pro é a versão para grandes incorporadoras, fundos imobiliários e empresas com carteiras diversificadas. Customizações, integrações e suporte de assessoria operacional inclusos.",
    features: [
      "Tudo do VIABIL Full",
      "Customizações de modelos e relatórios",
      "Integrações com ERP e sistemas internos",
      "Assessoria Operacional VIABIL",
      "SLA de suporte prioritário",
      "Treinamento avançado para equipes",
    ],
    notIncluded: [],
  },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function VersoesPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Versões
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            Qual versão é certa para você?
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 640 }}>
            Do primeiro projeto ao portfólio de grande escala — o VIABIL tem uma versão para cada estágio do seu negócio.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: 72 }}>
            {versions.map((v) => (
              <div key={v.id} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: `2px solid ${v.id === "full" ? v.color : "#E6E8EB"}`, display: "flex", flexDirection: "column" }}>
                <div style={{ background: v.bg, padding: "28px 28px 24px" }}>
                  <span style={{ background: v.color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, marginBottom: 12, display: "inline-block" }}>
                    {v.tag}
                  </span>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: v.color, marginBottom: 4 }}>{v.name}</h2>
                  <p style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{v.price}</p>
                </div>
                <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, marginBottom: 24 }}>{v.desc}</p>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>Inclui</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {v.features.map(f => (
                      <li key={f} style={{ fontSize: 13, color: "#374151", display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: v.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  {v.notIncluded.length > 0 && (
                    <>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>Não inclui</div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                        {v.notIncluded.map(f => (
                          <li key={f} style={{ fontSize: 13, color: "#9CA3AF", display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <span style={{ flexShrink: 0 }}>—</span>{f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <Link href="/contato" style={{ marginTop: "auto", display: "block", background: v.color, color: "#fff", textDecoration: "none", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textAlign: "center" as const }}>
                    Solicitar demonstração
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader
            eyebrow="VIABIL Cloud"
            heading="Disponível também em nuvem"
            subheading="O VIABIL Cloud é a versão hospedada pela BDK Solutions — sem instalação local, acesso via browser em qualquer dispositivo, com os mesmos modelos e funcionalidades das versões desktop."
          />
        </div>
      </section>

      <CTABand heading="Não sabe qual versão escolher?" subheading="Fale com um especialista VIABIL. Em 30 minutos ajudamos você a identificar qual versão atende melhor ao estágio e ao modelo do seu negócio." />
    </div>
  );
}
