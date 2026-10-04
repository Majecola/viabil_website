"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const TOTAL_WEEKS = 28;
const TYPICAL_FROM = 19;

/** The four implementation phases (AGENTS.md); week spans are illustrative. */
const PHASES = [
  {
    title: "Modelo de importação",
    short: "Importação",
    from: 0,
    to: 6,
    text: "Definimos como os dados entram no VIABIL: layouts, plano de contas e o de-para com o ERP ou as planilhas da empresa, para que o realizado chegue consistente.",
    deliverables: ["Plano de contas", "De-para", "Layouts de importação"],
  },
  {
    title: "Geração de conteúdo",
    short: "Conteúdo",
    from: 3,
    to: 16,
    text: "Traduzimos a forma de trabalhar da empresa em parâmetros: premissas padrão, benchmarks de indicadores por segmento, curvas de obra e de vendas e estudos-modelo.",
    deliverables: ["Premissas padrão", "Benchmarks de indicadores", "Curvas de obra e vendas", "Estudos-modelo"],
  },
  {
    title: "Testes",
    short: "Testes",
    from: 12,
    to: 22,
    text: "Rodamos estudos reais da empresa no VIABIL e comparamos com os números que ela já conhece, ajustando parâmetros até o resultado ser confiável.",
    deliverables: ["Estudos reais rodados", "Ajuste de parâmetros", "Treinamento da equipe"],
  },
  {
    title: "Homologação",
    short: "Homologação",
    from: 18,
    to: 28,
    text: "A equipe do cliente valida o ambiente e passa a decidir com ele. A partir daí, suporte e assessoria acompanham o uso no dia a dia.",
    deliverables: ["Aceite do cliente", "Uso em produção", "Suporte contínuo"],
  },
];

const AFTER = [
  { value: "300+", label: "atendimentos por semana", title: "Suporte ao usuário", text: "Equipe com formação em finanças imobiliárias para dúvidas operacionais, técnicas e conceituais." },
  { value: "120+", label: "treinamentos por ano", title: "Treinamentos", text: "Turmas abertas pelo Brasil e treinamentos in-company com os casos reais da empresa." },
  { value: "80+", label: "projetos de customização", title: "Assessoria e customizações", text: "Relatórios, indicadores e extensões sob medida, com equipe dedicada ao VIABIL." },
];

const RULER = [0, 4, 8, 12, 16, 20, 24, 28];
const pct = (w: number) => `${(w / TOTAL_WEEKS) * 100}%`;
/** Sweep duration: bars start growing as the cursor reaches their first week. */
const SWEEP_MS = 2800;

export function ImplantacaoSection() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const phase = PHASES[active];

  return (
    <div className="v1-shell">
      <div className="v1-head is-split v1-rise">
        <div>
          <span className="v1-kicker">Implantação</span>
          <h2 className="v1-title">Da contratação ao uso seguro em estudos reais.</h2>
        </div>
        <p className="v1-lede">
          Parametrizar é traduzir a forma de trabalho da empresa para O VIABIL. O caminho é
          estruturado em quatro fases acompanhadas pela nossa equipe — tecnologia sem conteúdo é
          pouco eficaz.
        </p>
      </div>

      <div
        className={`v1-im ${inView ? "is-in" : ""}`}
        ref={chartRef}
        style={{ "--sweep": `${SWEEP_MS}ms` } as CSSProperties}
      >
        <div className="v1-im-ruler" aria-hidden="true">
          <span className="v1-im-ruler-label">Semanas</span>
          <div className="v1-im-ruler-track">
            {RULER.map((w) => (
              <span key={w} style={{ left: pct(w) }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="v1-im-rows">
          {/* Overlay aligned with the tracks (right of the labels). */}
          <div className="v1-im-plot" aria-hidden="true">
            <div className="v1-im-band" style={{ left: pct(TYPICAL_FROM) }}>
              <span>
                Conclusão típica · {TYPICAL_FROM}–{TOTAL_WEEKS} semanas
              </span>
            </div>
            <span className="v1-im-cursor" />
          </div>

          {PHASES.map((p, i) => (
            <button
              aria-pressed={i === active}
              className={`v1-im-row ${i === active ? "is-active" : ""}`}
              key={p.title}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              type="button"
            >
              <span className="v1-im-label">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span className="v1-im-name">{p.title}</span>
                <span className="v1-im-short">{p.short}</span>
              </span>
              <span className="v1-im-track">
                <span
                  className="v1-im-bar"
                  style={
                    {
                      left: pct(p.from),
                      width: pct(p.to - p.from),
                      "--delay": `${Math.round((p.from / TOTAL_WEEKS) * SWEEP_MS)}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="v1-im-weeks">
                    sem. {p.from + 1}–{p.to}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="v1-im-note">Cronograma ilustrativo: as fases se sobrepõem e a duração varia com a complexidade da operação.</p>

        <div className="v1-im-detail" aria-live="polite" key={active}>
          <div>
            <span className="v1-im-detail-num">Fase {active + 1} de {PHASES.length}</span>
            <h3>{phase.title}</h3>
            <p>{phase.text}</p>
          </div>
          <div>
            <span className="v1-im-detail-label">Entregas</span>
            <ul>
              {phase.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="v1-im-after v1-rise">
        <span className="v1-im-after-kicker">Depois da implantação</span>
        <div className="v1-im-after-grid">
          {AFTER.map((a) => (
            <article key={a.title}>
              <strong>
                {a.value}
                <small>{a.label}</small>
              </strong>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
