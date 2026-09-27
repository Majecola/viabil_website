"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BarChart3, Layers3, LineChart, MapPinned, Workflow } from "lucide-react";

type ModuleShot = { src: string; width: number; height: number; alt: string };

// `shot` = real screen from the owner's demo recording; Acompanhamento has none yet.
const MODULES: {
  id: string;
  tag: string;
  name: string;
  headline: string;
  desc: string;
  facts: string[];
  Icon: typeof MapPinned;
  accent: string;
  rows: number[];
  shot?: ModuleShot;
}[] = [
  {
    id: "01",
    tag: "Originação e landbank",
    name: "Gestão de Terrenos",
    headline: "A oportunidade entra organizada antes de virar estudo.",
    desc: "Terrenos oferecidos e prospectados, documentos, imagens, dados urbanísticos, histórico de negociação e tarefas da equipe de Novos Negócios em um só lugar.",
    facts: ["40+ filtros combinados", "Mapas e documentos", "Histórico de negociação", "Link direto para Viabilidade"],
    Icon: MapPinned,
    accent: "#13885E",
    rows: [64, 42, 78, 51],
    shot: { src: "/assets/produto/mod-terrenos.webp", width: 1178, height: 758, alt: "Cadastro de terrenos do VIABIL com croqui de localização e mapa do terreno" },
  },
  {
    id: "02",
    tag: "Simulação financeira",
    name: "Viabilidade",
    headline: "O motor principal para decisões de Go/No-Go.",
    desc: "Projeta fluxo de caixa, indicadores e premissas para incorporação residencial, casas, loteamentos, MCMV, corporativo, logística, shopping e projetos mistos.",
    facts: ["VGV, margem, VPL, TIR e ROI", "Stress-cenários nas variáveis críticas", "Premissas parametrizáveis", "Relatórios exportáveis"],
    Icon: BarChart3,
    accent: "#5FBF9F",
    rows: [48, 72, 58, 88],
    shot: { src: "/assets/produto/mod-viabilidade.webp", width: 578, height: 630, alt: "Indicadores e resultados de um estudo simulado no VIABIL: VGV, VPL, exposição máxima e TIR" },
  },
  {
    id: "03",
    tag: "Previsto x realizado",
    name: "Acompanhamento",
    headline: "Não basta acompanhar. Precisa agir.",
    desc: "Compara planejado, revisado e realizado, importa dados de ERPs ou planilhas e permite replanejar ações para buscar as metas definidas no estudo.",
    facts: ["Previsto x revisado x realizado", "Alertas de divergência", "Wizard de reprojeção", "Visão para sócios e investidores"],
    Icon: LineChart,
    accent: "#1E3A8A",
    rows: [55, 61, 44, 69],
  },
  {
    id: "04",
    tag: "Portfólio",
    name: "Consolidação de Resultados",
    headline: "A visão executiva entre projetos, oportunidades e capital.",
    desc: "Consolida fluxos e indicadores de projetos em prospecção, desenvolvimento e modelos futuros para apoiar planejamento estratégico e alocação de capital.",
    facts: ["Fluxo consolidado", "Comparativo entre cenários", "Necessidade de aporte no tempo", "Ranking de oportunidades"],
    Icon: Layers3,
    accent: "#13885E",
    rows: [70, 46, 82, 58],
    shot: { src: "/assets/produto/mod-consolidacao.webp", width: 560, height: 305, alt: "Fluxo consolidado de vários estudos com indicadores do portfólio: VPL, exposição máxima e TIR" },
  },
  {
    id: "05",
    tag: "Processo e governança",
    name: "Workflow de Tarefas",
    headline: "Cada etapa com responsável, prazo e histórico.",
    desc: "Gerencia atividades desde a captação do terreno até chaves e recebíveis, com checklists, pendências por usuário e acompanhamento gerencial.",
    facts: ["Etapas e responsáveis", "Pendências por usuário", "Lembretes por e-mail", "Histórico por terreno ou projeto"],
    Icon: Workflow,
    accent: "#5FBF9F",
    rows: [52, 66, 47, 75],
    shot: { src: "/assets/produto/mod-workflow.webp", width: 888, height: 663, alt: "Follow-up de tarefas de um terreno no VIABIL com responsáveis, status, eventos e prazos" },
  },
];

export function ModulosSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(MODULES.length - 1, Math.max(0, Math.floor(value * MODULES.length)));
    setActive(index);
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  // The pinned stage needs height and a side visual: on phones, or with
  // reduced motion, a plain stack says the same thing in far less scrolling.
  const [pinned, setPinned] = useState(true);
  useEffect(() => {
    const evaluate = () =>
      setPinned(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          window.innerWidth >= 760,
      );
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  const current = MODULES[active];

  return (
    <section className="v1-band is-white" id="modulos">
      <div className="v1-shell">
        <div className="v1-head is-split v1-rise">
          <div>
            <span className="v1-kicker">Módulos</span>
            <h2 className="v1-title">Cinco módulos para uma visão contínua do negócio.</h2>
          </div>
          <p className="v1-lede">
            O VIABIL conecta originação, viabilidade, decisão, acompanhamento, consolidação e
            processo. A empresa deixa de analisar eventos isolados e passa a gerir o ciclo
            financeiro completo.
          </p>
        </div>
      </div>

      {pinned ? (
        <div className="v1-mod-scroll" ref={scrollRef}>
          <div className="v1-mod-sticky">
            <div className="v1-shell v1-mod-grid">
              <ol className="v1-mod-rail" aria-hidden="true">
                {MODULES.map((mod, index) => (
                  <li className={index === active ? "is-active" : ""} key={mod.id}>
                    <span>{mod.id}</span>
                    {mod.name}
                  </li>
                ))}
              </ol>

              <div className="v1-mod-copy" aria-live="polite">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="v1-mod-tag" style={{ color: current.accent }}>
                    Módulo {current.id} — {current.tag}
                  </span>
                  <h3 className="v1-mod-name">{current.name}</h3>
                  <p className="v1-mod-headline">{current.headline}</p>
                  <p className="v1-mod-desc">{current.desc}</p>
                  <ul className="v1-mod-facts">
                    {current.facts.map((fact) => (
                      <li key={fact}>
                        <i style={{ background: current.accent }} aria-hidden="true" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                className="v1-mod-visual"
                style={reduceMotion ? undefined : { y: visualY }}
                aria-hidden={current.shot ? undefined : true}
              >
                {current.shot ? (
                  <div className="v1-mod-window is-shot">
                    <div className="v1-mod-window-bar">
                      <span style={{ background: current.accent }} />
                      <em />
                      <b />
                    </div>
                    <motion.div
                      className="v1-mod-shot"
                      key={`${current.id}-shot`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        alt={current.shot.alt}
                        height={current.shot.height}
                        sizes="(min-width: 1200px) 540px, 42vw"
                        src={current.shot.src}
                        width={current.shot.width}
                      />
                    </motion.div>
                  </div>
                ) : (
                <div className="v1-mod-window">
                  <div className="v1-mod-window-bar">
                    <span style={{ background: current.accent }} />
                    <em />
                    <b />
                  </div>
                  <div className="v1-mod-window-body">
                    <motion.div
                      className="v1-mod-window-icon"
                      key={`${current.id}-icon`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ color: current.accent }}
                    >
                      <current.Icon />
                    </motion.div>
                    <div className="v1-mod-lines">
                      {[86, 62, 74, 48].map((width, index) => (
                        <motion.span
                          key={`${current.id}-l${index}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ))}
                    </div>
                    <div className="v1-mod-bars">
                      {current.rows.map((height, index) => (
                        <motion.span
                          key={`${current.id}-b${index}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            background:
                              index % 2 === 0 ? current.accent : "rgba(255,255,255,.14)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="v1-shell v1-mod-stack">
          {MODULES.map((mod, index) => (
            <article className={`v1-card is-interactive v1-rise v1-rise-${index + 1}`} key={mod.id}>
              <span className="v1-mod-tag" style={{ color: mod.accent }}>
                Módulo {mod.id} — {mod.tag}
              </span>
              <h3>{mod.name}</h3>
              <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--green-primary)" }}>
                {mod.headline}
              </p>
              <p>{mod.desc}</p>
              <ul className="v1-mod-facts" style={{ marginTop: 16 }}>
                {mod.facts.map((fact) => (
                  <li key={fact}>
                    <i style={{ background: mod.accent }} aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
              {mod.shot ? (
                <Image
                  alt={mod.shot.alt}
                  className="v1-mod-stack-shot"
                  height={mod.shot.height}
                  loading="lazy"
                  sizes="(min-width: 760px) 640px, 92vw"
                  src={mod.shot.src}
                  width={mod.shot.width}
                />
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
