"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

/** Polar position on the radar: angle clockwise from 12 o'clock, radius as a share of the scope. */
type Blip = { angle: number; r: number };

const FRONTS: { tag: string; title: string; desc: string; blip: Blip }[] = [
  {
    tag: "Regulatório",
    title: "Reforma tributária",
    desc: "Premissas fiscais, regimes e impactos da nova estrutura de tributos já refletidos nos estudos — para que a margem projetada continue verdadeira depois da mudança de regra.",
    blip: { angle: 40, r: 0.64 },
  },
  {
    tag: "Programa habitacional",
    title: "MCMV e habitação popular",
    desc: "Faixas, subsídios, condições de financiamento e modelos de venda do Minha Casa Minha Vida tratados dentro do mesmo motor de viabilidade dos demais produtos.",
    blip: { angle: 132, r: 0.44 },
  },
  {
    tag: "Experiência digital",
    title: "Nova plataforma e novo site",
    desc: "Uma camada de produto mais moderna e um site reconstruído do zero, pensados para que a informação certa chegue mais rápido a quem decide.",
    blip: { angle: 218, r: 0.76 },
  },
  {
    tag: "Marca",
    title: "Nova identidade visual",
    desc: "A identidade do VIABIL foi atualizada para refletir o que a plataforma é hoje: madura, técnica e conectada ao mercado que ela ajuda a construir.",
    blip: { angle: 304, r: 0.52 },
  },
];

/** One full turn of the sweep, in seconds. Blip pings are timed against it. */
const SWEEP = 9;
const C = 200;
const R = 178;

/** Rounded so server and client render identical SVG attributes. */
const round = (n: number) => Math.round(n * 100) / 100;

function polar({ angle, r }: Blip) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: round(C + Math.cos(rad) * R * r), y: round(C + Math.sin(rad) * R * r) };
}

export function MercadoRadar() {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Only run the sweep while the radar is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  return (
    <section className="v1-band is-dark is-graphite" id="evolucao">
      <div className="v1-radar-grid-bg" aria-hidden="true" />

      <div className="v1-shell">
        <div className="v1-head is-split v1-rise">
          <div>
            <span className="v1-kicker">Sempre em movimento</span>
            <h2 className="v1-title is-long">
              O VIABIL está sempre em busca de acompanhar os desafios do mercado.
            </h2>
          </div>
          <p className="v1-lede">
            Regras mudam, programas mudam, o jeito de decidir muda. Acompanhar esses movimentos é o
            que permite apoiar nossos clientes com decisões mais seguras — e é por isso que estas
            frentes já estão em curso.
          </p>
        </div>

        <div className={`v1-radar-stage ${live ? "is-live" : ""}`} ref={stageRef}>
          <div className="v1-radar-list v1-rise v1-rise-1">
            {FRONTS.map((front, index) => {
              const open = index === active;
              const panelId = `${baseId}-p${index}`;
              return (
                <div className={`v1-radar-row ${open ? "is-open" : ""}`} key={front.title}>
                  <h3>
                    <button
                      aria-controls={panelId}
                      aria-expanded={open}
                      className="v1-radar-trigger"
                      onClick={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      type="button"
                    >
                      <span className="v1-radar-num">{String(index + 1).padStart(2, "0")}</span>
                      <span className="v1-radar-heading">
                        <span className="v1-radar-tag">{front.tag}</span>
                        <span className="v1-radar-title">{front.title}</span>
                      </span>
                      <span className="v1-radar-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="v1-radar-panel" id={panelId} role="region" aria-label={front.title}>
                    <div>
                      <p>{front.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="v1-radar-scope v1-rise v1-rise-2" aria-hidden="true">
            <div className="v1-radar-cone" style={{ "--sweep": `${SWEEP}s` } as CSSProperties} />
            <svg viewBox="0 0 400 400" className="v1-radar-svg">
              <defs>
                <radialGradient id={`${baseId}-floor`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(95,191,159,0.10)" />
                  <stop offset="70%" stopColor="rgba(95,191,159,0.03)" />
                  <stop offset="100%" stopColor="rgba(95,191,159,0)" />
                </radialGradient>
              </defs>

              <circle cx={C} cy={C} r={R} fill={`url(#${baseId}-floor)`} />
              {[1, 0.75, 0.5, 0.25].map((k) => (
                <circle className="v1-radar-ring" cx={C} cy={C} key={k} r={R * k} />
              ))}
              <line className="v1-radar-axis" x1={C} x2={C} y1={C - R} y2={C + R} />
              <line className="v1-radar-axis" x1={C - R} x2={C + R} y1={C} y2={C} />
              {Array.from({ length: 72 }, (_, i) => {
                const a = (i * 5 * Math.PI) / 180;
                const long = i % 6 === 0;
                const r1 = R + 6;
                const r2 = R + (long ? 14 : 10);
                return (
                  <line
                    className={`v1-radar-tick ${long ? "is-long" : ""}`}
                    key={i}
                    x1={round(C + Math.cos(a) * r1)}
                    x2={round(C + Math.cos(a) * r2)}
                    y1={round(C + Math.sin(a) * r1)}
                    y2={round(C + Math.sin(a) * r2)}
                  />
                );
              })}

              {/* Leading edge of the sweep; the fading wedge behind it is .v1-radar-cone. */}
              <g className="v1-radar-sweep" style={{ "--sweep": `${SWEEP}s` } as CSSProperties}>
                <line className="v1-radar-beam" x1={C} x2={C} y1={C} y2={C - R} />
              </g>

              {FRONTS.map((front, index) => {
                const { x, y } = polar(front.blip);
                const isActive = index === active;
                const labelLeft = x > C;
                return (
                  <g
                    className={`v1-radar-blip ${isActive ? "is-active" : ""}`}
                    key={front.title}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    style={
                      {
                        "--ping-delay": `${round((front.blip.angle / 360) * SWEEP)}s`,
                        "--sweep": `${SWEEP}s`,
                      } as CSSProperties
                    }
                  >
                    <circle className="v1-radar-hit" cx={x} cy={y} r={20} />
                    <circle className="v1-radar-ping" cx={x} cy={y} r={6} />
                    <circle className="v1-radar-halo" cx={x} cy={y} r={13} />
                    <circle className="v1-radar-dot" cx={x} cy={y} r={5} />
                    <text
                      className="v1-radar-label"
                      textAnchor={labelLeft ? "end" : "start"}
                      x={round(labelLeft ? x - 18 : x + 18)}
                      y={round(y + 4)}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}

              <circle className="v1-radar-core-ring" cx={C} cy={C} r={16} />
              <circle className="v1-radar-core" cx={C} cy={C} r={4.5} />
            </svg>

            <div className="v1-radar-readout">
              <span>Em monitoramento</span>
              <strong>{FRONTS[active].title}</strong>
            </div>
          </div>
        </div>

        <p className="v1-radar-note v1-rise v1-rise-3">
          <span className="v1-radar-note-dot" aria-hidden="true" />
          Evoluir junto com o mercado é parte do produto, não um projeto paralelo.
        </p>
      </div>
    </section>
  );
}
