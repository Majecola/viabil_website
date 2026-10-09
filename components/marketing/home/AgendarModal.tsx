"use client";

import {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { track } from "@vercel/analytics";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe2,
  Video,
  X,
} from "lucide-react";
import {
  BOOKING_DURATION_MIN,
  addDays,
  getAvailability,
  todayInBrasilia,
  weekdayOf,
  type BookingDay,
} from "@/lib/booking/slots";

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

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEKDAYS_LONG = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const STEPS = ["Escolha o horário", "Seus dados", "Confirmação do Eli"];

type Step = 0 | 1 | 2;

function monthKey(date: string) {
  return date.slice(0, 7);
}

function shiftMonth(key: string, delta: number) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

function monthLabel(key: string) {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${key}-01T12:00:00Z`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function dayLabel(date: string) {
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );
  return `${WEEKDAYS_LONG[weekdayOf(date)]}, ${Number(date.slice(8))} de ${month}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AgendarModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [availability, setAvailability] = useState<BookingDay[]>([]);
  const [today, setToday] = useState("");
  const [step, setStep] = useState<Step>(0);
  const [viewMonth, setViewMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ email: string; preview: boolean } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  // Fresh agenda every time the modal opens.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement;
    const days = getAvailability();
    const firstOpen = days.find((day) => day.slots.length > 0);
    setAvailability(days);
    setToday(todayInBrasilia());
    setViewMonth(monthKey(firstOpen?.date ?? todayInBrasilia()));
    setStep(0);
    setSelectedDate(null);
    setSelectedTime(null);
    setError("");
    setResult(null);
    track("booking_modal_open", { path: window.location.pathname });
  }, [open]);

  const close = useCallback(() => {
    onClose();
    if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus();
  }, [onClose]);

  // Escape, focus trap, background scroll lock.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Move focus to the start of each step.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const root = dialogRef.current;
      if (!root) return;
      const target =
        step === 0
          ? root.querySelector<HTMLElement>('.v1-cal-day[tabindex="0"]')
          : step === 1
            ? root.querySelector<HTMLElement>("#b-name")
            : root.querySelector<HTMLElement>(".v1-book-done h3");
      target?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, step, availability]);

  const byDate = useMemo(() => {
    const map = new Map<string, BookingDay>();
    for (const day of availability) map.set(day.date, day);
    return map;
  }, [availability]);

  const minMonth = today ? monthKey(today) : "";
  const maxMonth = availability.length ? monthKey(availability[availability.length - 1].date) : "";

  const cells = useMemo(() => {
    if (!viewMonth) return [];
    const first = `${viewMonth}-01`;
    const lead = weekdayOf(first);
    const out: (string | null)[] = Array.from({ length: lead }, () => null);
    for (let date = first; monthKey(date) === viewMonth; date = addDays(date, 1)) out.push(date);
    return out;
  }, [viewMonth]);

  const selectedSlots = selectedDate ? (byDate.get(selectedDate)?.slots ?? []) : [];

  // Roving tab stop: one day in the grid is tabbable, arrows move between days.
  const tabStop =
    selectedDate && monthKey(selectedDate) === viewMonth
      ? selectedDate
      : availability.find((d) => d.slots.length > 0 && monthKey(d.date) === viewMonth)?.date;

  function pickDate(date: string) {
    setSelectedDate(date);
    setSelectedTime(null);
    // Stacked layout: bring the times into view once a day is chosen.
    if (window.matchMedia("(max-width: 860px)").matches) {
      window.requestAnimationFrame(() =>
        slotsRef.current?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        }),
      );
    }
  }

  function onGridKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const delta = deltas[event.key];
    const current = (event.target as HTMLElement).dataset.date;
    if (!delta || !current) return;
    event.preventDefault();

    // Walk in that direction to the next open day, crossing months if needed.
    let next = current;
    for (let i = 0; i < 30; i += 1) {
      next = addDays(next, delta);
      if (!byDate.get(next)?.slots.length) continue;
      if (monthKey(next) !== viewMonth) setViewMonth(monthKey(next));
      window.requestAnimationFrame(() =>
        dialogRef.current?.querySelector<HTMLElement>(`[data-date="${next}"]`)?.focus(),
      );
      return;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDate || !selectedTime) return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();

    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        name: data.get("name") || "",
        email,
        phone: data.get("phone") || "",
        company: data.get("company") || "",
        city: data.get("city") || "",
        segment: data.get("segment") || "",
        message: data.get("message") || "",
        sourcePage: window.location.pathname,
      }),
    }).catch(() => null);

    setIsSubmitting(false);

    if (!response?.ok) {
      const payload = await response?.json().catch(() => null);
      setError(
        payload?.error || "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
      );
      return;
    }

    const payload = await response.json().catch(() => ({}));
    track("booking_request", { weekday: weekdayOf(selectedDate), time: selectedTime });
    setResult({ email, preview: Boolean(payload?.preview) });
    setStep(2);
  }

  if (!open) return null;

  const whenLabel =
    selectedDate && selectedTime ? `${capitalize(dayLabel(selectedDate))}, às ${selectedTime}` : "";

  // Portaled to <body>: the trigger lives in a dark band whose text colour and
  // reveal transforms must not reach the dialog.
  return createPortal(
    <div className="v1-modal-backdrop"onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        aria-labelledby="agendar-title"
        aria-modal="true"
        className="v1-modal v1-book"
        ref={dialogRef}
        role="dialog"
      >
        <button aria-label="Fechar" className="v1-modal-close" onClick={close} type="button">
          <X aria-hidden="true" />
        </button>

        <aside className="v1-modal-aside v1-book-aside">
          <div>
            <span className="v1-book-kicker">Agendar uma apresentação</span>
            <div className="v1-book-host">
              <Image
                alt=""
                className="v1-book-avatar"
                height={112}
                src="/assets/people/eli_wolf.png"
                width={112}
              />
              <div>
                <strong>Eli Wolf</strong>
                <span>Diretor Executivo · idealizador do VIABIL</span>
              </div>
            </div>
            <h2 id="agendar-title">O VIABIL aplicado ao seu segmento.</h2>
            <p>
              Uma conversa direta sobre as decisões que sua equipe precisa sustentar — do terreno ao
              resultado.
            </p>
          </div>

          <ul className="v1-book-meta">
            <li>
              <Clock aria-hidden="true" />
              {BOOKING_DURATION_MIN} minutos
            </li>
            <li>
              <Video aria-hidden="true" />
              Videochamada · link enviado na confirmação
            </li>
            <li>
              <Globe2 aria-hidden="true" />
              Horário de Brasília (GMT-3)
            </li>
          </ul>

          <ol className="v1-book-steps" aria-label="Etapas do agendamento">
            {STEPS.map((label, index) => (
              <li
                aria-current={index === step ? "step" : undefined}
                className={index < step ? "is-done" : index === step ? "is-current" : ""}
                key={label}
              >
                <i aria-hidden="true">{index < step ? <Check /> : index + 1}</i>
                {label}
              </li>
            ))}
          </ol>
        </aside>

        <div className="v1-modal-body v1-book-body">
          {step === 0 ? (
            <div className="v1-book-pick" key="pick">
              <section className="v1-cal" aria-label="Calendário de disponibilidade">
                <header className="v1-cal-head">
                  <h3 aria-live="polite">{viewMonth ? monthLabel(viewMonth) : ""}</h3>
                  <div>
                    <button
                      aria-label="Mês anterior"
                      className="v1-cal-nav"
                      disabled={!viewMonth || viewMonth <= minMonth}
                      onClick={() => setViewMonth((m) => shiftMonth(m, -1))}
                      type="button"
                    >
                      <ChevronLeft aria-hidden="true" />
                    </button>
                    <button
                      aria-label="Próximo mês"
                      className="v1-cal-nav"
                      disabled={!viewMonth || viewMonth >= maxMonth}
                      onClick={() => setViewMonth((m) => shiftMonth(m, 1))}
                      type="button"
                    >
                      <ChevronRight aria-hidden="true" />
                    </button>
                  </div>
                </header>

                <div className="v1-cal-week" aria-hidden="true">
                  {WEEKDAYS.map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                  ))}
                </div>

                <div className="v1-cal-grid" key={viewMonth} onKeyDown={onGridKeyDown} role="group">
                  {cells.map((date, index) => {
                    if (!date) return <span aria-hidden="true" key={`blank-${index}`} />;
                    const day = byDate.get(date);
                    const count = day?.slots.length ?? 0;
                    const isOpen = count > 0;
                    const isFull = Boolean(day) && count === 0;
                    const isSelected = date === selectedDate;
                    const classes = [
                      "v1-cal-day",
                      isOpen ? "is-open" : "",
                      isFull ? "is-full" : "",
                      isSelected ? "is-selected" : "",
                      date === today ? "is-today" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <button
                        aria-label={`${capitalize(dayLabel(date))}${
                          isOpen
                            ? ` — ${count} ${count === 1 ? "horário livre" : "horários livres"}`
                            : isFull
                              ? " — agenda completa"
                              : " — indisponível"
                        }`}
                        aria-pressed={isSelected}
                        className={classes}
                        data-date={date}
                        disabled={!isOpen}
                        key={date}
                        onClick={() => pickDate(date)}
                        style={{ ["--i" as string]: index }}
                        tabIndex={date === tabStop ? 0 : -1}
                        type="button"
                      >
                        <span>{Number(date.slice(8))}</span>
                        {isOpen ? (
                          <i aria-hidden="true" className="v1-cal-load">
                            {Array.from({ length: Math.min(count, 4) }, (_, k) => (
                              <b key={k} />
                            ))}
                          </i>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <p className="v1-cal-legend">
                  <span>
                    <i className="is-open" aria-hidden="true" /> Horários livres
                  </span>
                  <span>
                    <i className="is-full" aria-hidden="true" /> Agenda completa
                  </span>
                </p>
              </section>

              <section className="v1-slots" aria-live="polite" ref={slotsRef}>
                {selectedDate ? (
                  <>
                    <header>
                      <h3>{capitalize(dayLabel(selectedDate))}</h3>
                      <span>
                        {selectedSlots.length}{" "}
                        {selectedSlots.length === 1 ? "horário livre" : "horários livres"}
                      </span>
                    </header>
                    <ul className="v1-slot-list" key={selectedDate}>
                      {selectedSlots.map((time, index) => {
                        const isPicked = time === selectedTime;
                        return (
                          <li
                            className={isPicked ? "is-picked" : ""}
                            key={time}
                            style={{ ["--i" as string]: index }}
                          >
                            <button
                              aria-pressed={isPicked}
                              className="v1-slot"
                              onClick={() => setSelectedTime(isPicked ? null : time)}
                              type="button"
                            >
                              {time}
                            </button>
                            <button
                              aria-hidden={!isPicked}
                              className="v1-slot-go"
                              onClick={() => setStep(1)}
                              tabIndex={isPicked ? 0 : -1}
                              type="button"
                            >
                              Continuar
                              <ArrowRight aria-hidden="true" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="v1-slots-empty">
                    <CalendarDays aria-hidden="true" />
                    <p>
                      Escolha um dia no calendário para ver os horários livres na agenda do Eli.
                    </p>
                  </div>
                )}
              </section>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="v1-book-details" key="details">
              <div className="v1-book-summary">
                <CalendarDays aria-hidden="true" />
                <div>
                  <strong>{whenLabel}</strong>
                  <span>
                    {BOOKING_DURATION_MIN} min · Videochamada · Horário de Brasília
                  </span>
                </div>
                <button className="v1-book-change" onClick={() => setStep(0)} type="button">
                  <ArrowLeft aria-hidden="true" />
                  Alterar
                </button>
              </div>

              <form className="v1-form" onSubmit={handleSubmit}>
                <div className="v1-field">
                  <label htmlFor="b-name">Nome</label>
                  <input autoComplete="name" id="b-name" minLength={2} name="name" required />
                </div>
                <div className="v1-field">
                  <label htmlFor="b-email">E-mail profissional</label>
                  <input autoComplete="email" id="b-email" name="email" required type="email" />
                </div>
                <div className="v1-field">
                  <label htmlFor="b-company">Empresa</label>
                  <input
                    autoComplete="organization"
                    id="b-company"
                    minLength={2}
                    name="company"
                    required
                  />
                </div>
                <div className="v1-field">
                  <label htmlFor="b-phone">Telefone / WhatsApp</label>
                  <input
                    autoComplete="tel"
                    id="b-phone"
                    minLength={8}
                    name="phone"
                    required
                    type="tel"
                  />
                </div>
                <div className="v1-field">
                  <label htmlFor="b-city">Cidade / UF</label>
                  <input autoComplete="address-level2" id="b-city" name="city" />
                </div>
                <div className="v1-field">
                  <label htmlFor="b-segment">Segmento</label>
                  <select defaultValue="" id="b-segment" name="segment" required>
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
                  <label htmlFor="b-message">O que você quer ver na apresentação? (opcional)</label>
                  <textarea
                    id="b-message"
                    name="message"
                    placeholder="Ex.: estudos de loteamento, acompanhamento previsto x realizado, consolidação de carteira."
                  />
                </div>
                <div className="v1-field is-full">
                  <button
                    className="vbtn vbtn-primary vbtn-lg"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar este horário"}
                    {isSubmitting ? null : <ArrowRight aria-hidden="true" />}
                  </button>
                  {error ? (
                    <p className="v1-form-note is-error" role="alert" style={{ marginTop: 12 }}>
                      {error}
                    </p>
                  ) : (
                    <p className="v1-form-note" style={{ marginTop: 12 }}>
                      O horário é confirmado pelo Eli. Você recebe um e-mail agora e o convite assim
                      que ele confirmar.
                    </p>
                  )}
                </div>
              </form>
            </div>
          ) : null}

          {step === 2 && result ? (
            <div className="v1-book-done" key="done">
              <i aria-hidden="true" className="v1-book-check">
                <Check />
              </i>
              <h3 tabIndex={-1}>Pedido enviado.</h3>
              <p>
                Seu pedido para <strong>{whenLabel}</strong> está com o Eli. Enviamos um e-mail para{" "}
                <strong>{result.email}</strong> com os detalhes.
              </p>

              <ol className="v1-book-timeline">
                <li className="is-done">
                  <i aria-hidden="true">
                    <Check />
                  </i>
                  <div>
                    <strong>Pedido registrado</strong>
                    <span>Você e o Eli receberam o resumo por e-mail.</span>
                  </div>
                </li>
                <li className="is-active">
                  <i aria-hidden="true" />
                  <div>
                    <strong>Eli confirma o horário</strong>
                    <span>Você recebe a confirmação neste e-mail.</span>
                  </div>
                </li>
                <li>
                  <i aria-hidden="true" />
                  <div>
                    <strong>Convite na sua agenda</strong>
                    <span>Com o link da videochamada.</span>
                  </div>
                </li>
              </ol>

              {result.preview ? (
                <p className="v1-form-note">
                  Pré-visualização local: o pedido não foi gravado e nenhum e-mail foi enviado.
                </p>
              ) : null}

              <button className="vbtn vbtn-outline" onClick={close} type="button">
                Voltar para o site
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
