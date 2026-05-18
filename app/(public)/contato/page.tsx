import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Contato | VIABIL",
  description: "Entre em contato com o time VIABIL. Solicite uma demonstração, envie uma proposta ou fale com um especialista.",
};

const contactOptions = [
  {
    icon: "💬",
    label: "Solicitar demonstração",
    desc: "Veja o VIABIL funcionando com dados reais do seu segmento. 30 minutos que valem a decisão.",
    cta: "Agendar pelo WhatsApp",
    href: "https://wa.me/PLACEHOLDER?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+demonstra%C3%A7%C3%A3o+do+VIABIL.",
  },
  {
    icon: "📋",
    label: "Solicitar proposta",
    desc: "Quer um orçamento detalhado com a versão e os serviços certos para o seu negócio?",
    cta: "Enviar pelo WhatsApp",
    href: "https://wa.me/PLACEHOLDER?text=Ol%C3%A1%2C+gostaria+de+solicitar+uma+proposta+comercial+do+VIABIL.",
  },
  {
    icon: "🤝",
    label: "Parceria e revenda",
    desc: "Consultoras, assessoras e distribuidores — fale conosco sobre o programa de parceiros VIABIL.",
    cta: "Falar sobre parceria",
    href: "https://wa.me/PLACEHOLDER?text=Ol%C3%A1%2C+tenho+interesse+em+conhecer+o+programa+de+parceiros+do+VIABIL.",
  },
];

const S = {
  page: { background: "#F8F9FA" } as React.CSSProperties,
  hero: { background: "#0A4B35", color: "#fff", padding: "80px 24px 72px" } as React.CSSProperties,
  container: { maxWidth: 1100, margin: "0 auto" } as React.CSSProperties,
  section: { padding: "80px 24px" } as React.CSSProperties,
};

export default function ContatoPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 100, marginBottom: 20 }}>
            Contato
          </span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
            Fale com o time VIABIL
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 580 }}>
            Seja para uma demonstração, uma proposta ou uma dúvida sobre a plataforma — estamos aqui.
          </p>
        </div>
      </section>

      <section style={S.section}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 72 }}>
            {contactOptions.map((opt) => (
              <div key={opt.label} style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1px solid #E6E8EB", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 32, marginBottom: 16 }}>{opt.icon}</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1A2320", marginBottom: 10 }}>{opt.label}</h2>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, flex: 1, marginBottom: 24 }}>{opt.desc}</p>
                <a
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", textDecoration: "none", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}
                >
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 2C8.27 2 2 8.27 2 16c0 2.45.67 4.75 1.83 6.73L2 30l7.5-1.8A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2Z" />
                  </svg>
                  {opt.cta}
                </a>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", border: "1px solid #E6E8EB", maxWidth: 640, margin: "0 auto" }}>
            <SectionHeader eyebrow="Formulário" heading="Envie uma mensagem" align="left" />
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { id: "nome", label: "Nome", type: "text", placeholder: "Seu nome" },
                  { id: "empresa", label: "Empresa", type: "text", placeholder: "Nome da empresa" },
                ].map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{field.label}</label>
                    <input id={field.id} type={field.type} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                ))}
              </div>
              {[
                { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                { id: "telefone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(11) 99999-9999" },
              ].map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{field.label}</label>
                  <input id={field.id} type={field.type} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                </div>
              ))}
              <div>
                <label htmlFor="mensagem" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Mensagem</label>
                <textarea id="mensagem" rows={4} placeholder="Como podemos ajudar?" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const }} />
              </div>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
                Formulário de contato — implementação com backend em breve. Por enquanto, use o WhatsApp acima para contato imediato.
              </p>
              <button disabled style={{ background: "#D1D5DB", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "not-allowed" }}>
                Enviar mensagem (em breve)
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
