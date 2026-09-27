"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

// Real screens from Eli's walkthrough of VIABIL (module window only), in the
// order a study actually flows: terreno → premissas → resultados.
const STEPS = [
  { group: "Terrenos", label: "Cadastro do terreno", desc: "Localização, dimensões, zoneamento, negociação e histórico de oferta em uma única ficha." },
  { group: "Terrenos", label: "Croqui e mapa", desc: "Integração com Google Maps, croqui de localização e fotos do terreno." },
  { group: "Terrenos", label: "Análise técnica", desc: "Checklist de visita: infraestrutura, topografia e os pontos que podem inviabilizar o negócio." },
  { group: "Terrenos", label: "Follow-up de tarefas", desc: "Cada terreno dispara um processo com etapas, responsáveis, prazos e pendências." },
  { group: "Terrenos", label: "Anexos e documentos", desc: "Estudos de massa, matrículas, projetos e imagens amarrados ao respectivo terreno." },
  { group: "Terrenos", label: "Pesquisa com filtros", desc: "Cruze praticamente todos os campos do cadastro para encontrar a oportunidade certa." },
  { group: "Viabilidade", label: "Estudo de viabilidade", desc: "Identificação, datas do estudo, resumo das contas e indicadores lado a lado." },
  { group: "Viabilidade", label: "Terreno e unidades", desc: "Negociação do terreno, permutas física e financeira e quadro de unidades com VGV." },
  { group: "Viabilidade", label: "Obra e curvas", desc: "Custo de obra e curvas de desembolso: o cronograma financeiro mês a mês." },
  { group: "Viabilidade", label: "Premissas financeiras", desc: "Valor presente, juros, despesas comerciais, impostos e projeção inflacionária." },
  { group: "Viabilidade", label: "Financiamento", desc: "Plano empresário, crédito associativo e MCMV, com gatilhos de liberação." },
  { group: "Viabilidade", label: "Perfil de venda", desc: "Velocidade de vendas e tabelas por fase e tipologia, com inadimplência e distrato." },
  { group: "Resultados", label: "Indicadores simulados", desc: "VGV, VPL, TIR e exposição máxima, com sinalizadores de corte por segmento." },
  { group: "Resultados", label: "Relatórios", desc: "Premissas, fluxos de caixa, previsão de resultados e sensibilidade em Excel." },
].map((step, index) => ({ ...step, image: `/assets/produto/tour/step-${String(index + 1).padStart(2, "0")}.webp` }));

const GROUPS = ["Terrenos", "Viabilidade", "Resultados"];

export function ProdutoTour() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);

  // Pinned stage only where there is room and motion is welcome; otherwise a
  // plain stack of screens tells the same story.
  useEffect(() => {
    const evaluate = () =>
      setPinned(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerWidth >= 900,
      );
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(value * STEPS.length))));
  });

  const current = STEPS[active];

  return (
    <section aria-label="O VIABIL por dentro" className="v1-band is-white" id="por-dentro">
      <div className="v1-shell">
        <div className="v1-head is-split">
          <div>
            <span className="v1-kicker">O VIABIL por dentro</span>
            <h2 className="v1-title">Do terreno ao relatório, na tela real do sistema.</h2>
          </div>
          <p className="v1-lede">
            Estas são telas da demonstração conduzida por Eli Wolf, idealizador do VIABIL. Role para
            acompanhar o caminho de um estudo: o terreno entra organizado, as premissas viram fluxo
            de caixa e os indicadores sustentam a decisão.
          </p>
        </div>
      </div>

      {pinned ? (
        <div className="v1-tour-scroll" ref={scrollRef} style={{ height: `${STEPS.length * 55}vh` }}>
          <div className="v1-tour-sticky">
            <div className="v1-shell is-wide v1-tour-grid">
              <div className="v1-tour-copy">
                <ol className="v1-tour-groups" aria-hidden="true">
                  {GROUPS.map((group) => (
                    <li className={group === current.group ? "is-active" : ""} key={group}>
                      {group}
                    </li>
                  ))}
                </ol>
                <div aria-live="polite">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 14 }}
                    key={current.label}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="v1-tour-count">
                      {String(active + 1).padStart(2, "0")} / {STEPS.length}
                    </span>
                    <h3 className="v1-tour-label">{current.label}</h3>
                    <p className="v1-tour-desc">{current.desc}</p>
                  </motion.div>
                </div>
                <div className="v1-tour-progress" aria-hidden="true">
                  <span style={{ transform: `scaleX(${(active + 1) / STEPS.length})` }} />
                </div>
              </div>

              <div className="v1-tour-window">
                <div className="v1-tour-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>VIABIL · {current.group}</span>
                </div>
                <div className="v1-tour-screen">
                  <AnimatePresence initial={false}>
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className="v1-tour-frame"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0, scale: 1.015 }}
                      key={current.image}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        alt={`Tela do VIABIL: ${current.label}`}
                        fill
                        priority={active === 0}
                        sizes="(min-width: 1200px) 760px, 60vw"
                        src={current.image}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="v1-shell">
          <ol className="v1-tour-stack">
            {STEPS.map((step) => (
              <li key={step.label}>
                <span className="v1-tour-count">{step.group}</span>
                <h3 className="v1-tour-label">{step.label}</h3>
                <p className="v1-tour-desc">{step.desc}</p>
                <Image
                  alt={`Tela do VIABIL: ${step.label}`}
                  className="v1-tour-stack-img"
                  height={824}
                  loading="lazy"
                  sizes="(min-width: 760px) 700px, 92vw"
                  src={step.image}
                  width={1280}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
