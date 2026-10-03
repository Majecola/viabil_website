"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type Quote = {
  /** Quote text. Wrap the key phrase in [[double brackets]] to highlight it. */
  text: string;
  name: string;
  role: string;
  initials: string;
};

const QUOTES: Quote[] = [
  {
    text: "O VIABIL é sem sombra de dúvidas [[o principal software de viabilidade]] de empreendimentos imobiliários do Brasil. É um instrumento importante para as empresas que pretendem melhorar a governança.",
    name: "Felipe Cavalcante",
    role: "Presidente · ADIT Brasil",
    initials: "FC",
  },
  {
    text: "O VIABIL é um aliado da empresa, dando agilidade ao processo e fornecendo informações claras e objetivas que permitem aos nossos diretores [[tomar decisões mais seguras]] com relação aos nossos investimentos.",
    name: "Diretoria de Investimentos",
    role: "Rodobens Negócios Imobiliários",
    initials: "RD",
  },
  {
    text: "Com o VIABIL, conseguimos [[parametrizar nossos estudos]], aumentar nossa assertividade e controlar o acesso a múltiplos usuários, sem perder a confiabilidade nos resultados.",
    name: "Novos Negócios",
    role: "Porto Ferraz Construtora",
    initials: "PF",
  },
  {
    text: "O VIABIL acompanhou as mudanças, desenvolveu novas ferramentas e colaborou com o crescimento do Real Estate em todo o Brasil, proporcionando [[respostas rápidas]] sem perder o poder de analisar as diversas variáveis.",
    name: "Greco G. Montagna",
    role: "Gerente Comercial Real Estate · BTG Pactual",
    initials: "GM",
  },
  {
    text: "O VIABIL é uma [[ferramenta indispensável]] no dia a dia de nossa empresa, seja para cadastrar terrenos, padronizar os estudos de viabilidade econômica, tomadas de decisão de investimento e controle dos nossos resultados.",
    name: "Equipe Técnica",
    role: "Cury Construtora",
    initials: "CU",
  },
];

/** Delay (ms) before each card starts revealing, and per-word stagger. */
const CARD_DELAY = 140;
const WORD_STEP = 16;

type Segment = { mark: boolean; parts: string[] };

/** Splits into plain / highlighted segments, each a list of words and the original whitespace. */
function segment(text: string): Segment[] {
  return text
    .split(/(\[\[.*?\]\])/)
    .filter(Boolean)
    .map((part) => {
      const mark = part.startsWith("[[");
      return { mark, parts: (mark ? part.slice(2, -2) : part).split(/(\s+)/).filter(Boolean) };
    });
}

function plain(text: string) {
  return text.replace(/\[\[|\]\]/g, "");
}

/** Words fade in one by one; the highlighted phrase is grouped so its marker sweeps as one stroke. */
function RevealText({ text, startMs }: { text: string; startMs: number }) {
  const segments = segment(text);
  let wordIndex = 0;

  const rendered = segments.map((seg, g) => {
    const words = seg.parts.map((part, i) => {
      if (/^\s+$/.test(part)) return <Fragment key={i}>{part}</Fragment>;
      const delay = startMs + wordIndex++ * WORD_STEP;
      return (
        <span className="v1-voice-word" key={i} style={{ "--d": `${delay}ms` } as CSSProperties}>
          {part}
        </span>
      );
    });
    return seg.mark ? (
      <mark className="v1-voice-mark" key={g}>
        {words}
      </mark>
    ) : (
      <Fragment key={g}>{words}</Fragment>
    );
  });

  // The marker sweeps once every word has landed.
  const markDelay = `${startMs + wordIndex * WORD_STEP + 120}ms`;

  return (
    <>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true" style={{ "--mark-d": markDelay } as CSSProperties}>
        {rendered}
      </span>
    </>
  );
}

function trackPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function DepoimentosPremium() {
  const wallRef = useRef<HTMLDivElement>(null);
  // "armed" hides content for the entrance; never set without JS or with reduced motion.
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("in");
      return;
    }

    const rect = wall.getBoundingClientRect();
    // Already scrolled past (e.g. reload mid-page): show immediately.
    if (rect.bottom < 0) {
      setState("in");
      return;
    }

    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(wall);
    return () => io.disconnect();
  }, []);

  const [featured, ...rest] = QUOTES;

  return (
    <section className="v1-band" id="depoimentos">
      <div className="v1-shell">
        <div className="v1-head is-split v1-rise">
          <div>
            <span className="v1-kicker">Depoimentos</span>
            <h2 className="v1-title">Como o mercado descreve o impacto do VIABIL.</h2>
          </div>
          <p className="v1-lede">
            Incorporadoras, construtoras, bancos e entidades do setor usam a mesma linguagem
            financeira há décadas. Estas são as palavras delas.
          </p>
        </div>

        <div
          className={`v1-voices ${state === "armed" ? "is-armed" : ""} ${state === "in" ? "is-armed is-in" : ""}`}
          ref={wallRef}
        >
          <figure
            className="v1-voice is-featured"
            onPointerMove={trackPointer}
            style={{ "--c": "0ms" } as CSSProperties}
          >
            <svg className="v1-voice-glyph" viewBox="0 0 64 48" aria-hidden="true">
              <path pathLength={1} d="M27 4C13 8 4 18 4 31c0 7.5 5.4 13 12 13s12-5.4 12-12-5.4-12-12-12c-.9 0-1.8.1-2.6.3C15.5 14.6 20 10.6 27 9.5z" />
              <path pathLength={1} d="M59 4C45 8 36 18 36 31c0 7.5 5.4 13 12 13s12-5.4 12-12-5.4-12-12-12c-.9 0-1.8.1-2.6.3C47.5 14.6 52 10.6 59 9.5z" />
            </svg>
            <blockquote className="v1-voice-text">
              <RevealText text={featured.text} startMs={260} />
            </blockquote>
            <figcaption className="v1-voice-foot">
              <span className="v1-voice-initials" aria-hidden="true">
                {featured.initials}
              </span>
              <span className="v1-voice-who">
                <strong>{featured.name}</strong>
                <span>{featured.role}</span>
              </span>
            </figcaption>
          </figure>

          {rest.map((quote, i) => {
            const delay = (i + 1) * CARD_DELAY;
            return (
              <figure
                className="v1-voice"
                key={quote.role}
                onPointerMove={trackPointer}
                style={{ "--c": `${delay}ms` } as CSSProperties}
              >
                <blockquote className="v1-voice-text">
                  <RevealText text={quote.text} startMs={delay + 260} />
                </blockquote>
                <figcaption className="v1-voice-foot">
                  <span className="v1-voice-initials" aria-hidden="true">
                    {quote.initials}
                  </span>
                  <span className="v1-voice-who">
                    <strong>{quote.name}</strong>
                    <span>{quote.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
