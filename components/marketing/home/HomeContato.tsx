"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, CalendarCheck, Handshake, MessageCircle, Receipt } from "lucide-react";
import { getWhatsAppHref } from "@/lib/whatsapp";

const SEGMENTS = [
  "Incorporação/Construção",
  "Loteamentos",
  "Casas e condomínios",
  "Logística",
  "Shopping",
  "Corporativo / BTS",
  "Desenvolvimento Imobiliário / Originação",
  "Consultoria",
  "Proprietário de área",
  "Participações / Investimentos",
];

const PATHS = [
  {
    Icon: CalendarCheck,
    label: "Agendar uma apresentação",
    desc: "Veja O VIABIL aplicado ao seu segmento.",
    message: "Olá, gostaria de agendar uma apresentação do VIABIL.",
  },
  {
    Icon: Receipt,
    label: "Solicitar uma proposta",
    desc: "Versão, implantação, parametrização e serviços.",
    message: "Olá, gostaria de solicitar uma proposta comercial do VIABIL.",
  },
  {
    Icon: Handshake,
    label: "Conversar sobre parcerias",
    desc: "Consultorias, parceiros e instituições do setor.",
    message: "Olá, gostaria de conversar sobre parcerias com o VIABIL.",
  },
];

export function HomeContato() {
  const [status, setStatus] = useState<{ tone: "ok" | "error" | "idle"; text: string }>({
    tone: "idle",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const segment = String(data.get("segment") || "");
    const wantsNewsletter = data.get("newsletter") === "on";

    if (!name || !email || !phone) {
      setStatus({ tone: "error", text: "Preencha nome, e-mail e telefone para continuar." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ tone: "idle", text: "Enviando seus dados..." });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        role: data.get("role") || "",
        segment,
        source: "Landing page",
        message: data.get("message") || "",
        sourcePage: window.location.pathname,
      }),
    }).catch(() => null);

    setIsSubmitting(false);

    if (!response?.ok) {
      const payload = await response?.json().catch(() => null);
      setStatus({
        tone: "error",
        text: payload?.error || "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
      });
      return;
    }

    if (wantsNewsletter) {
      // Best-effort: a newsletter failure must not invalidate the lead.
      void fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          segment,
          sourcePage: `${window.location.pathname}#contato`,
        }),
      }).catch(() => null);
    }

    track("contact_submit", { source_page: window.location.pathname, segment });
    setStatus({
      tone: "ok",
      text: "Recebemos seus dados. Um especialista VIABIL entrará em contato.",
    });
    form.reset();
  }

  return (
    <section className="v1-band is-dark" id="contato">
      <div className="v1-shell">
        <div className="v1-contact-grid">
          <div className="v1-rise">
            <span className="v1-kicker">Fale com a gente</span>
            <h2 className="v1-title">Transforme dados em decisões.</h2>
            <p className="v1-lede">
              Fale com um especialista VIABIL e descubra como a plataforma sustenta as decisões
              financeiras da sua operação — do terreno ao resultado.
            </p>

            <div className="v1-contact-paths">
              {PATHS.map((path) => (
                <a
                  className="v1-contact-path"
                  href={getWhatsAppHref(path.message)}
                  key={path.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <path.Icon aria-hidden="true" />
                  <span>
                    <strong>{path.label}</strong>
                    <span>{path.desc}</span>
                  </span>
                  <MessageCircle aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="v1-form-card v1-rise v1-rise-1">
            <form className="v1-form" onSubmit={handleSubmit}>
              <div className="v1-field">
                <label htmlFor="c-name">Nome</label>
                <input autoComplete="name" id="c-name" name="name" required />
              </div>
              <div className="v1-field">
                <label htmlFor="c-company">Empresa</label>
                <input autoComplete="organization" id="c-company" name="company" />
              </div>
              <div className="v1-field">
                <label htmlFor="c-email">E-mail profissional</label>
                <input autoComplete="email" id="c-email" name="email" required type="email" />
              </div>
              <div className="v1-field">
                <label htmlFor="c-phone">Telefone / WhatsApp</label>
                <input autoComplete="tel" id="c-phone" name="phone" required type="tel" />
              </div>
              <div className="v1-field">
                <label htmlFor="c-role">Cargo</label>
                <input autoComplete="organization-title" id="c-role" name="role" />
              </div>
              <div className="v1-field">
                <label htmlFor="c-segment">Segmento</label>
                <select defaultValue="" id="c-segment" name="segment">
                  <option disabled value="">
                    Selecione
                  </option>
                  {SEGMENTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="v1-field is-full">
                <label htmlFor="c-message">Como podemos ajudar?</label>
                <textarea
                  id="c-message"
                  name="message"
                  placeholder="Conte rapidamente o que sua equipe precisa analisar."
                />
              </div>

              <div className="v1-field is-full">
                <label className="v1-check" htmlFor="c-newsletter">
                  <input id="c-newsletter" name="newsletter" type="checkbox" />
                  <span>
                    Quero receber as atualizações do VIABIL — conteúdos sobre viabilidade, mercado
                    imobiliário e novidades da plataforma.
                  </span>
                </label>
              </div>

              <div className="v1-field is-full">
                <button className="vbtn vbtn-primary vbtn-lg" disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Enviando..." : "Solicitar demonstração"}
                  {isSubmitting ? null : <ArrowRight aria-hidden="true" />}
                </button>
                {status.text ? (
                  <p
                    className={`v1-form-note ${
                      status.tone === "error" ? "is-error" : status.tone === "ok" ? "is-ok" : ""
                    }`}
                    role="status"
                    style={{ marginTop: 12 }}
                  >
                    {status.text}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
