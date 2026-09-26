"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { CircleCheckBig, Download, FileSpreadsheet, X } from "lucide-react";

const STORAGE_KEY = "viabil:prototipo-modal";
const DELAY_MS = 35_000;
const SCROLL_TRIGGER = 0.45;
const SNOOZE_DAYS = 45;
/** Nothing may interrupt the visitor before this much time on the page. */
const MIN_DWELL_MS = 15_000;
/** Scroll must be the visitor's own, not a position the browser restored. */
const MIN_SCROLLED_PX = 800;

const HIGHLIGHTS = [
  "Estrutura de premissas: VGV, custos, prazos e permutas.",
  "Fluxo de caixa mensal com margem, VPL e TIR calculados.",
  "Campos editáveis para testar o seu próprio empreendimento.",
];

function alreadySeen() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const until = Number(raw);
    if (!Number.isFinite(until)) return true;
    return Date.now() < until;
  } catch {
    return false;
  }
}

function remember() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      String(Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000),
    );
  } catch {
    /* private mode — the modal simply reappears next visit */
  }
}

export function PrototipoModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ downloadUrl: string | null } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    remember();
    if (restoreFocusRef.current instanceof HTMLElement) {
      restoreFocusRef.current.focus();
    }
  }, []);

  // Trigger: dwell time, scroll depth, or exit intent — whichever comes first.
  useEffect(() => {
    // QA escape hatch: /?nopopup=1 keeps the modal out of the way.
    if (new URLSearchParams(window.location.search).has("nopopup")) return;
    if (alreadySeen()) return;

    let fired = false;
    const openedAt = Date.now();
    // Reloads and back-navigation restore a scroll position; measuring from
    // wherever the page actually starts keeps that from counting as intent.
    const startScrollY = window.scrollY;
    let pointerSeen = false;

    const dwelled = () => Date.now() - openedAt >= MIN_DWELL_MS;

    const fire = () => {
      if (fired) return;
      fired = true;
      restoreFocusRef.current = document.activeElement;
      setOpen(true);
      track("prototype_modal_open", { path: window.location.pathname });
      cleanup();
    };

    const timer = window.setTimeout(fire, DELAY_MS);

    const onScroll = () => {
      if (!dwelled()) return;
      if (Math.abs(window.scrollY - startScrollY) < MIN_SCROLLED_PX) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) fire();
    };

    // Only count a real pointer that was inside the page and then left over the
    // top edge — `mouseout` also fires when crossing between child elements.
    const onPointerIn = () => {
      pointerSeen = true;
    };

    const onExitIntent = (event: MouseEvent) => {
      if (!pointerSeen || !dwelled()) return;
      if (event.relatedTarget || (event as MouseEvent & { toElement?: unknown }).toElement) return;
      if (event.clientY > 0) return;
      fire();
    };

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onPointerIn);
      document.removeEventListener("mouseout", onExitIntent);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousemove", onPointerIn, { passive: true, once: true });
    document.addEventListener("mouseout", onExitIntent);

    return cleanup;
  }, []);

  // Escape to close, focus into the dialog, lock background scroll.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const focusTarget = dialogRef.current?.querySelector<HTMLElement>(
      "input, button, [href]",
    );
    focusTarget?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();

    if (!email) {
      setError("Informe seu e-mail profissional.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/prototype", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: data.get("name") || "",
        company: data.get("company") || "",
        newsletter: data.get("newsletter") === "on",
        sourcePage: window.location.pathname,
      }),
    }).catch(() => null);

    setIsSubmitting(false);

    if (!response?.ok) {
      const payload = await response?.json().catch(() => null);
      setError(payload?.error || "Não foi possível registrar agora. Tente novamente.");
      return;
    }

    const payload = await response.json().catch(() => ({ downloadUrl: null }));
    track("prototype_request", {
      newsletter: data.get("newsletter") === "on" ? "yes" : "no",
    });
    remember();
    setDone({ downloadUrl: payload?.downloadUrl ?? null });
  }

  if (!open) return null;

  return (
    <div className="v1-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        aria-labelledby="prototipo-title"
        aria-modal="true"
        className="v1-modal"
        ref={dialogRef}
        role="dialog"
      >
        <button aria-label="Fechar" className="v1-modal-close" onClick={close} type="button">
          <X aria-hidden="true" />
        </button>

        <aside className="v1-modal-aside">
          <div>
            <FileSpreadsheet aria-hidden="true" style={{ width: 28, height: 28, color: "var(--green-light)" }} />
            <h2 id="prototipo-title">Protótipo de viabilidade em Excel, gratuito.</h2>
            <p>
              Um modelo enxuto para você preencher as premissas do seu empreendimento e ver os
              números se comportarem — antes de conhecer O VIABIL por completo.
            </p>
          </div>

          <ul className="v1-modal-list">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <CircleCheckBig aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="v1-modal-body">
          {done ? (
            <div className="v1-modal-success">
              <i aria-hidden="true">
                <CircleCheckBig />
              </i>
              <h3 style={{ margin: 0, color: "var(--green-primary)", fontSize: 20 }}>
                Pedido registrado.
              </h3>
              <p className="v1-form-note">
                {done.downloadUrl
                  ? "O download começa pelo botão abaixo — e também enviamos o modelo para o seu e-mail."
                  : "Enviaremos o protótipo para o seu e-mail em instantes."}
              </p>
              {done.downloadUrl ? (
                <a className="vbtn vbtn-primary" download href={done.downloadUrl}>
                  <Download aria-hidden="true" />
                  Baixar o protótipo
                </a>
              ) : null}
              <button className="vlink" onClick={close} type="button" style={{ border: 0, background: "none", cursor: "pointer" }}>
                Voltar para o site
              </button>
            </div>
          ) : (
            <form className="v1-form" onSubmit={handleSubmit} style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
              <div className="v1-field">
                <label htmlFor="p-email">E-mail profissional</label>
                <input autoComplete="email" id="p-email" name="email" required type="email" />
              </div>
              <div className="v1-field">
                <label htmlFor="p-name">Nome</label>
                <input autoComplete="name" id="p-name" name="name" />
              </div>
              <div className="v1-field">
                <label htmlFor="p-company">Empresa</label>
                <input autoComplete="organization" id="p-company" name="company" />
              </div>

              <label className="v1-check" htmlFor="p-newsletter">
                <input id="p-newsletter" name="newsletter" type="checkbox" />
                <span>
                  Quero receber as atualizações do VIABIL — conteúdos sobre viabilidade, mercado
                  imobiliário e novidades da plataforma.
                </span>
              </label>

              <button className="vbtn vbtn-primary vbtn-lg" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Enviando..." : "Quero o protótipo"}
                {isSubmitting ? null : <Download aria-hidden="true" />}
              </button>

              {error ? (
                <p className="v1-form-note is-error" role="alert">
                  {error}
                </p>
              ) : (
                <p className="v1-form-note">
                  Usamos seu e-mail apenas para enviar o modelo e retornar o contato comercial.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
