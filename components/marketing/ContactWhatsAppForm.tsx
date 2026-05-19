"use client";

import { FormEvent, useState } from "react";

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
    const message = [
      "Olá, gostaria de falar com um especialista VIABIL.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      `Empresa: ${data.get("company") || ""}`,
      `Segmento: ${data.get("segment") || ""}`,
      `Como conheceu: ${data.get("source") || ""}`,
      "",
      String(data.get("message") || "").trim(),
    ].join("\n");

    if (!number) {
      window.location.href = `mailto:comercial@viabil.com.br?subject=${encodeURIComponent(
        "Contato pelo site VIABIL",
      )}&body=${encodeURIComponent(message)}`;
      return;
    }

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus("Mensagem pronta no WhatsApp. Confira os dados antes de enviar.");
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
        <button className="button-primary" type="submit">
          Enviar pelo WhatsApp
        </button>
        {status ? <p className="field-note" role="status">{status}</p> : null}
      </div>
    </form>
  );
}
