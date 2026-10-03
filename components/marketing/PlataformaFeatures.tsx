"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

/** Regions of the real "Estudo de viabilidade" screen (step-07, 1280×824), in % of the image. */
const SPOTS = [
  {
    title: "Estrutura completa do estudo",
    text: "Terreno e unidades, obra, financeiro, lançamentos, perfil de venda e participações: cada premissa tem sua aba, no mesmo estudo.",
    box: { left: 0.8, top: 12.2, width: 98.4, height: 4.6 },
    pin: { left: 2.2, top: 14.5 },
  },
  {
    title: "Identificação e marcos",
    text: "Segmento, classificação do estudo e as datas que movem o caixa: compra do terreno, início das vendas, obras e entrega das chaves.",
    box: { left: 0.8, top: 17.2, width: 98.4, height: 22.3 },
    pin: { left: 2.2, top: 21.5 },
  },
  {
    title: "Resumo das contas",
    text: "Receitas, financiamento, terreno e custos em visão analítica, indexada e a valor presente, sempre com o peso de cada linha sobre o VGV.",
    box: { left: 0.8, top: 41, width: 57.8, height: 56.6 },
    pin: { left: 2.2, top: 46.5 },
  },
  {
    title: "Indicadores e resultados",
    text: "VGV, EBITDA, VPL, exposição máxima e o mês em que ela ocorre, TIR — com sinalizadores de corte que mostram se o estudo atende ao critério da empresa.",
    box: { left: 58.8, top: 41, width: 39.8, height: 56.6 },
    pin: { left: 60.2, top: 46.5 },
  },
];

const PILLARS = [
  { title: "Valor agregado", text: "Premissas, fluxo e indicadores viram base objetiva para aprovar, ajustar ou recusar uma oportunidade." },
  { title: "Flexibilidade", text: "Incorporação residencial, casas e loteamentos — e também corporativo, logístico e fundos — no mesmo motor." },
  { title: "Parametrização", text: "Premissas, curvas, indicadores e relatórios seguem a forma de trabalhar de cada empresa." },
  { title: "Confiança", text: "Metodologia testada no mercado, cálculos protegidos e a mesma linguagem entre sócios e investidores." },
];

const CYCLE_MS = 5200;

export function PlataformaFeatures() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The window starts tilted back and flattens as it scrolls into place.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  // Walk through the regions on its own until the visitor takes over.
  useEffect(() => {
    if (!inView || interacted || hovering || reduceMotion) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % SPOTS.length), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [active, inView, interacted, hovering, reduceMotion]);

  const choose = (i: number) => {
    setActive(i);
    setInteracted(true);
  };

  const spot = SPOTS[active].box;
  const auto = inView && !interacted && !hovering && !reduceMotion;

  return (
    <div className="v1-shell">
      <div className="v1-head is-split v1-rise">
        <div>
          <span className="v1-kicker">A plataforma</span>
          <h2 className="v1-title is-long">Inteligência financeira para decidir, acompanhar e corrigir a rota.</h2>
        </div>
        <div>
          <p className="v1-lede">
            O VIABIL organiza o ciclo imobiliário em um ambiente único: terrenos, estudos de
            viabilidade, cenários, indicadores, relatórios e o planejado versus realizado. Esta é a
            tela de um estudo real.
          </p>
          <a className="v1-pf-link" href="#ciclo">
            Entender o ciclo completo
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        className="v1-pf-stage"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        ref={stageRef}
      >
        <motion.figure
          className={`v1-pf-window ${inView ? "is-in" : ""}`}
          style={reduceMotion ? undefined : { rotateX: tilt, y: lift }}
        >
          <div className="v1-pf-screen">
            <Image
              alt="Tela real do VIABIL: estudo de viabilidade de um empreendimento MCMV com identificação, datas do estudo, resumo das contas e indicadores e resultados"
              height={824}
              sizes="(max-width: 1240px) 100vw, 1180px"
              src="/assets/produto/tour/step-07.webp"
              width={1280}
            />
            <span
              aria-hidden="true"
              className="v1-pf-spot"
              style={{
                left: `${spot.left}%`,
                top: `${spot.top}%`,
                width: `${spot.width}%`,
                height: `${spot.height}%`,
              }}
            />
            {SPOTS.map((s, i) => (
              <button
                aria-label={`Destacar: ${s.title}`}
                aria-pressed={i === active}
                className={`v1-pf-pin ${i === active ? "is-active" : ""}`}
                key={s.title}
                onClick={() => choose(i)}
                onFocus={() => choose(i)}
                style={{ left: `${s.pin.left}%`, top: `${s.pin.top}%` }}
                type="button"
              >
                {i + 1}
              </button>
            ))}
          </div>
          <figcaption className="v1-pf-caption">
            <span className="v1-pf-live" aria-hidden="true" />
            Tela real do VIABIL · estudo de viabilidade MCMV
          </figcaption>
        </motion.figure>

        <ol className={`v1-pf-notes ${auto ? "is-auto" : ""}`}>
          {SPOTS.map((s, i) => (
            <li key={s.title}>
              <button
                aria-pressed={i === active}
                className={`v1-pf-note ${i === active ? "is-active" : ""}`}
                onClick={() => choose(i)}
                onMouseEnter={() => choose(i)}
                type="button"
              >
                <span className="v1-pf-num">{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.title}</strong>
                <span className="v1-pf-text">
                  <span>{s.text}</span>
                </span>
                <i aria-hidden="true" className="v1-pf-bar" style={{ animationDuration: `${CYCLE_MS}ms` }} />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="v1-pf-pillars v1-rise">
        {PILLARS.map((p) => (
          <article key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
