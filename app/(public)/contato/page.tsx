import type { Metadata } from "next";
import { ContactWhatsAppForm } from "@/components/marketing/ContactWhatsAppForm";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato | VIABIL",
  description:
    "Fale com o time VIABIL para solicitar demonstração, proposta comercial ou conversar sobre parcerias.",
};

const contactPaths = [
  {
    label: "Agende uma apresentação",
    desc: "Para ver o VIABIL aplicado ao seu segmento, com foco nas decisões que sua equipe precisa sustentar.",
    message: "Olá, gostaria de agendar uma apresentação do VIABIL.",
  },
  {
    label: "Solicite uma proposta",
    desc: "Para discutir versão, implantação, parametrização e serviços adequados ao estágio da empresa.",
    message: "Olá, gostaria de solicitar uma proposta comercial do VIABIL.",
  },
  {
    label: "Converse sobre parcerias",
    desc: "Para consultorias, parceiros, instituições e iniciativas ligadas ao mercado imobiliário.",
    message: "Olá, gostaria de conversar sobre parcerias com o VIABIL.",
  },
];

export default function ContatoPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Contato</span>
            <h1 className="page-title">Fale com um especialista VIABIL.</h1>
            <p className="page-subtitle">
              Solicite uma demonstração, uma proposta ou uma conversa sobre a melhor
              forma de estruturar viabilidade, acompanhamento e governança financeira
              na sua operação imobiliária.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner contact-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Caminhos"
              heading="Escolha o assunto e avance pelo WhatsApp."
              subheading="O WhatsApp é o canal principal de conversão do site. O formulário ao lado monta a mensagem com os dados mínimos para contato."
            />
            <div className="contact-paths">
              {contactPaths.map((path) => {
                const href = getWhatsAppHref(path.message);
                const isExternal = href.startsWith("https://");
                return (
                  <article className="contact-path" key={path.label}>
                    <h2>{path.label}</h2>
                    <p>{path.desc}</p>
                    <a
                      className="button-text"
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      Iniciar conversa
                    </a>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="contact-form-shell ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Formulário"
              heading="Envie os dados principais."
              subheading="Os dados são registrados para que a equipe VIABIL retorne com o contexto correto."
            />
            <ContactWhatsAppForm />
          </div>
        </div>
      </section>
    </>
  );
}
