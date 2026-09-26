"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Quote = {
  text: string;
  name: string;
  role: string;
  initials: string;
};

const QUOTES: Quote[] = [
  {
    text: "O VIABIL é sem sombra de dúvidas o principal software de viabilidade de empreendimentos imobiliários do Brasil. É um instrumento importante para as empresas que pretendem melhorar a governança.",
    name: "Felipe Cavalcante",
    role: "Presidente · ADIT Brasil",
    initials: "FC",
  },
  {
    text: "O VIABIL é um aliado da empresa, dando agilidade ao processo e fornecendo informações claras e objetivas que permitem aos nossos diretores tomar decisões mais seguras com relação aos nossos investimentos.",
    name: "Diretoria de Investimentos",
    role: "Rodobens Negócios Imobiliários",
    initials: "RD",
  },
  {
    text: "Com o VIABIL, conseguimos parametrizar nossos estudos, aumentar nossa assertividade e controlar o acesso a múltiplos usuários, sem perder a confiabilidade nos resultados.",
    name: "Novos Negócios",
    role: "Porto Ferraz Construtora",
    initials: "PF",
  },
  {
    text: "O VIABIL acompanhou as mudanças, desenvolveu novas ferramentas e colaborou com o crescimento do Real Estate em todo o Brasil, proporcionando respostas rápidas sem perder o poder de analisar as diversas variáveis.",
    name: "Greco G. Montagna",
    role: "Gerente Comercial Real Estate · BTG Pactual",
    initials: "GM",
  },
  {
    text: "O VIABIL é uma ferramenta indispensável no dia a dia de nossa empresa, seja para cadastrar terrenos, padronizar os estudos de viabilidade econômica, tomadas de decisão de investimento e controle dos nossos resultados.",
    name: "Equipe Técnica",
    role: "Cury Construtora",
    initials: "CU",
  },
];

const INTERVAL = 7000;

export function DepoimentosPremium() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % QUOTES.length),
      INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reduceMotion]);

  // Pause the rotation while the section is off-screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  const current = QUOTES[active];

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
          className="v1-quote-stage v1-rise v1-rise-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          ref={stageRef}
        >
          <div className="v1-quote-panel">
            <span className="v1-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="v1-quote-text">{current.text}</blockquote>
                <div className="v1-quote-foot">
                  <span className="v1-quote-initials" aria-hidden="true">
                    {current.initials}
                  </span>
                  <div className="v1-quote-who">
                    <strong>{current.name}</strong>
                    <span>{current.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="v1-quote-picker" role="tablist" aria-label="Depoimentos de clientes">
              {QUOTES.map((quote, index) => (
                <button
                  aria-selected={index === active}
                  className={`v1-quote-chip ${index === active ? "is-active" : ""}`}
                  key={quote.name}
                  onClick={() => select(index)}
                  role="tab"
                  type="button"
                >
                  <i aria-hidden="true">{quote.initials}</i>
                  <span style={{ minWidth: 0 }}>
                    <b>{quote.name}</b>
                    <span>{quote.role}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="v1-quote-progress" aria-hidden="true">
              <motion.i
                key={`${active}-${paused}`}
                initial={{ width: "0%" }}
                animate={{ width: paused || reduceMotion ? "0%" : "100%" }}
                transition={{ duration: paused || reduceMotion ? 0 : INTERVAL / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
