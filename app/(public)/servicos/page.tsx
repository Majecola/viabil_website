import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { CTABand } from "@/components/marketing/CTABand";

export const metadata: Metadata = {
  title: "Serviços | VIABIL",
  description: "Suporte, Assessoria Operacional, Implantação, Customizações e Integrações — os serviços do VIABIL para maximizar o resultado da plataforma.",
};

const services = [
  {
    id: "01",
    name: "Suporte ao Usuário",
    tag: "Incluso em todos os planos",
    headline: "Suporte especializado para quem trabalha com mercado imobiliário",
    desc: "Nossa equipe de suporte é formada por especialistas em viabilidade financeira imobiliária — não apenas técnicos de TI. Eles entendem o que você está tentando analisar e ajudam a chegar no resultado certo.",
    items: [
      "Suporte por e-mail e chat",
      "Base de conhecimento com tutoriais",
      "Suporte técnico para acesso e funcionamento",
      "Atendimento por especialistas de produto",
    ],
  },
  {
    id: "02",
    name: "Assessoria Operacional",
    tag: "VIABIL Pro e contratação avulsa",
    headline: "Um especialista ao lado da sua equipe nas análises mais complexas",
    desc: "A Assessoria Operacional é quando o time VIABIL atua junto com sua equipe — revisando premissas, orientando modelos, validando cenários e garantindo que a análise está correta antes de uma decisão importante.",
    items: [
      "Revisão de premissas e modelos financeiros",
      "Validação de análises de viabilidade críticas",
      "Orientação em casos de uso específicos",
      "Consultoria de processo para equipes técnicas",
    ],
  },
  {
    id: "03",
    name: "Implantação",
    tag: "VIABIL Full e Pro",
    headline: "Uma implantação que garante adoção real da plataforma",
    desc: "A implantação VIABIL vai além de instalar o software. É um processo estruturado para que sua equipe adote o padrão VIABIL na rotina — com configuração das premissas padrão, criação de modelos da empresa e treinamento da equipe.",
    items: [
      "Configuração inicial e parametrização padrão",
      "Criação dos modelos base da empresa",
      "Treinamento presencial ou remoto da equipe",
      "Migração de projetos existentes",
      "Acompanhamento pós-implantação",
    ],
  },
  {
    id: "04",
    name: "Customizações",
    tag: "VIABIL Pro — sob contrato",
    headline: "A plataforma adaptada ao modelo de negócio da sua empresa",
    desc: "Para empresas com modelos financeiros específicos, estruturas de capital diferenciadas ou fluxos de trabalho proprietários, o VIABIL oferece customizações de modelos, relatórios e campos.",
    items: [
      "Modelos financeiros customizados",
      "Relatórios executivos sob medida",
      "Campos e premissas adicionais",
      "Dashboards personalizados",
    ],
  },
  {
    id: "05",
    name: "Integrações",
    tag: "VIABIL Pro — sob contrato",
    headline: "O VIABIL conectado ao seu ecossistema de dados",
    desc: "Para empresas com ERP, sistemas de gestão de obra, CRM ou plataformas de dados, o VIABIL oferece integrações via API para eliminar retrabalho e garantir consistência de dados.",
    items: [
      "Integração com ERP (SAP, TOTVS, outros)",
      "Conexão com sistemas de gestão de obra",
      "API REST para dados de vendas e estoque",
      "Exportação estruturada para BI",
    ],
  },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function ServicosPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Serviços
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            Mais do que software
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 640 }}>
            O VIABIL entrega não apenas a plataforma — mas também o suporte, a assessoria e a customização para que sua equipe use a ferramenta com máximo resultado.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {services.map((svc, i) => (
              <div key={svc.id} style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", border: "1px solid #E6E8EB", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ background: "#0A4B35", color: "#fff", fontWeight: 900, fontSize: 13, padding: "4px 12px", borderRadius: 8 }}>{svc.id}</span>
                    <span style={{ background: "#E8F4EE", color: "#0A4B35", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>{svc.tag}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(19px, 2.5vw, 24px)", fontWeight: 800, color: "#1A2320", marginBottom: 10, letterSpacing: "-0.3px" }}>{svc.name}</h2>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#0A4B35", marginBottom: 14 }}>{svc.headline}</p>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{svc.desc}</p>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 14 }}>O que inclui</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {svc.items.map(item => (
                      <li key={item} style={{ fontSize: 14, color: "#374151", display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "#0A4B35", fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Precisa de um serviço específico?" subheading="Fale com nossa equipe e descubra como o VIABIL pode suportar o crescimento da sua operação." />
    </div>
  );
}
