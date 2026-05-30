"use client";

import { FormEvent, useState } from "react";

export function ReplyForm({ inquiryId, recipientName }: { inquiryId: string; recipientName: string }) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setIsSubmitting(true);
    setStatus("Enviando resposta...");

    const response = await fetch(`/api/admin/inquiries/${inquiryId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: data.get("subject"),
        body: data.get("body"),
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus(payload?.error || "Não foi possível enviar a resposta.");
      return;
    }

    setStatus("Resposta registrada e enviada.");
    form.reset();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Assunto
        <input name="subject" defaultValue={`Retorno VIABIL - ${recipientName}`} required />
      </label>
      <label>
        Mensagem
        <textarea name="body" rows={8} required />
      </label>
      <button className="button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar resposta"}
      </button>
      {status ? <p className="field-note" role="status">{status}</p> : null}
    </form>
  );
}
