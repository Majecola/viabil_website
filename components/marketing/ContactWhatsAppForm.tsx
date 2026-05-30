"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";

const segmentOptions = [
  "Incorporação/Construção",
  "Loteamentos",
  "Condomínios",
  "Logísticos",
  "Shopping",
  "Corporativo / BTS",
  "Desenvolvimento Imobiliário / Originação",
  "Consultoria",
  "Proprietário de Área",
  "Participações / Investimentos",
];

const sourceOptions = [
  "Indicação",
  "Eventos",
  "Email marketing",
  "Redes sociais",
  "Internet",
  "Já usei VIABIL",
];

export function ContactWhatsAppForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!name || !email || !phone) {
      setStatus("Preencha nome, e-mail e telefone para continuar.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Enviando seus dados...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        company: data.get("company") || "",
        role: data.get("role") || "",
        segment: data.get("segment") || "",
        source: data.get("source") || "",
        message: data.get("message") || "",
        sourcePage: window.location.pathname,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus(payload?.error || "Não foi possível enviar agora. Tente novamente.");
      return;
    }

    track("contact_submit", {
      source_page: window.location.pathname,
      segment: String(data.get("segment") || ""),
    });
    setStatus("Recebemos seus dados. Um especialista VIABIL entrará em contato.");
    form.reset();
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="company">Empresa</label>
        <input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="role">Cargo</label>
        <input id="role" name="role" autoComplete="organization-title" />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Telefone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required />
      </div>
      <div className="field">
        <label htmlFor="segment">Segmento</label>
        <select id="segment" name="segment" defaultValue="">
          <option value="" disabled>Selecione</option>
          {segmentOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="source">Como conheceu o VIABIL</label>
        <select id="source" name="source" defaultValue="">
          <option value="" disabled>Selecione</option>
          {sourceOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          placeholder="Conte rapidamente o que sua equipe precisa analisar."
        />
      </div>
      <div className="field full">
        <button className="button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar dados"}
        </button>
        {status ? <p className="field-note" role="status">{status}</p> : null}
      </div>
    </form>
  );
}
