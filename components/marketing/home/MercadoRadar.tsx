"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { House, LayoutTemplate, Palette, Scale, Sparkles } from "lucide-react";

const FRONTS = [
  {
    tag: "Regulatório",
    title: "Reforma tributária",
    desc: "Premissas fiscais, regimes e impactos da nova estrutura de tributos já refletidos nos estudos — para que a margem projetada continue verdadeira depois da mudança de regra.",
    Icon: Scale,
  },
  {
    tag: "Programa habitacional",
    title: "MCMV e habitação popular",
    desc: "Faixas, subsídios, condições de financiamento e modelos de venda do Minha Casa Minha Vida tratados dentro do mesmo motor de viabilidade dos demais produtos.",
    Icon: House,
  },
  {
    tag: "Experiência digital",
    title: "Nova plataforma e novo site",
    desc: "Uma camada de produto mais moderna e um site reconstruído do zero, pensados para que a informação certa chegue mais rápido a quem decide.",
    Icon: LayoutTemplate,
  },
  {
    tag: "Marca",
    title: "Nova identidade visual",
    desc: "A identidade do VIABIL foi atualizada para refletir o que a plataforma é hoje: madura, técnica e conectada ao mercado que ela ajuda a construir.",
    Icon: Palette,
  },
];

export function MercadoRadar() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section className="v1-band is-dark" id="evolucao" ref={sectionRef}>
      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-20% -10%",
            y: glowY,
            background:
              "radial-gradient(45% 45% at 82% 30%, rgba(95,191,159,.16) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
      ) : null}

      <div className="v1-shell">
        <div className="v1-head v1-rise">
          <span className="v1-kicker">Sempre em movimento</span>
          <h2 className="v1-title is-long">
            O VIABIL está sempre em busca de acompanhar os desafios do mercado.
          </h2>
          <p className="v1-lede">
            Regras mudam, programas mudam, o jeito de decidir muda. Acompanhar esses movimentos é o
            que permite apoiar nossos clientes com decisões mais seguras — e é por isso que estas
            frentes já estão em curso.
          </p>
        </div>

        <div className="v1-radar-grid">
          {FRONTS.map((front, index) => (
            <article
              className={`v1-radar-item v1-rise v1-rise-${index + 1}`}
              key={front.title}
            >
              <span className="v1-radar-icon" aria-hidden="true">
                <front.Icon />
              </span>
              <div>
                <span className="v1-radar-tag">{front.tag}</span>
                <h3>{front.title}</h3>
                <p>{front.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="v1-radar-note v1-rise v1-rise-5">
          <Sparkles aria-hidden="true" style={{ width: 16, height: 16, color: "var(--green-light)" }} />
          Evoluir junto com o mercado é parte do produto, não um projeto paralelo.
        </p>
      </div>
    </section>
  );
}
