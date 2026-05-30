"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";

export function NewsletterSignup() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();

    if (!email) {
      setStatus("Informe seu e-mail profissional.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Registrando inscrição...");

    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: data.get("name") || "",
        company: data.get("company") || "",
        sourcePage: window.location.pathname,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus(payload?.error || "Não foi possível registrar sua inscrição agora.");
      return;
    }

    track("newsletter_subscribe", { source_page: window.location.pathname });
    setStatus("Inscrição registrada. Obrigado por acompanhar o VIABIL.");
    form.reset();
  }

  return (
    <section className="newsletter-band" aria-labelledby="newsletter-title">
      <div className="newsletter-inner">
        <div>
          <span className="eyebrow">Viabilidade em Pauta</span>
          <h2 id="newsletter-title">Receba conteúdos e atualizações do VIABIL.</h2>
          <p>
            Informações sobre viabilidade, mercado imobiliário, produto e temas que impactam decisões
            financeiras de incorporação.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">E-mail profissional</label>
          <div className="newsletter-row">
            <input id="newsletter-email" name="email" type="email" autoComplete="email" required />
            <button className="button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Assinar"}
            </button>
          </div>
          <div className="newsletter-extra">
            <input name="name" placeholder="Nome" autoComplete="name" />
            <input name="company" placeholder="Empresa" autoComplete="organization" />
          </div>
          {status ? <p className="field-note" role="status">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
