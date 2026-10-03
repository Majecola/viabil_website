"use client";

import { useEffect, useRef, type CSSProperties, type MutableRefObject, type PointerEvent } from "react";

/**
 * Liquid-glass "estudo de viabilidade" card that sits over the hero film.
 * The hero drives it with paint(p), p = film progress 0–1; every value is illustrative.
 */

const STAGES = [
  { label: "Terreno", from: 0 },
  { label: "Viabilidade", from: 0.2 },
  { label: "Aprovação", from: 0.45 },
  { label: "Acompanhamento", from: 0.7 },
];

/** Monthly cash flow (R$ mi) of an illustrative 24-month residential project. */
const MONTHLY = [-6, -1.5, -1.2, -1.8, -2.2, -2.6, -2.4, -2, -1.2, -0.4, 0.6, 1.4, 2.2, 2.8, 3.2, 3.4, 3.6, 3.5, 3.2, 2.8, 2.4, 2, 1.6, 1.4];
/** Planned cumulative cash flow from the approved study, for the previsto × realizado read. */
const PLANNED = [-6, -7.3, -8.4, -10, -12, -14.4, -16.6, -18.4, -19.5, -19.8, -19, -17.4, -15, -12, -8.6, -5, -1.4, 2, 5.1, 7.8, 10, 11.9, 13.4, 14.6];

const KPIS = [
  { label: "TIR", value: 24.1, unit: "% a.a." },
  { label: "Margem", value: 18.6, unit: "%" },
  { label: "Exposição", value: 21.3, unit: "R$ mi" },
];

// Chart geometry (viewBox units match the rendered px at the card's width).
const W = 304;
const H = 136;
const X0 = 8;
const X1 = W - 8;
const TOP = 14;
const BOTTOM = H - 10;
const V_MAX = 16;
const V_MIN = -24;
const BAR_SCALE = 4.2;

const r2 = (n: number) => Math.round(n * 100) / 100;
const xAt = (i: number) => r2(X0 + (i / (MONTHLY.length - 1)) * (X1 - X0));
const yAt = (v: number) => r2(TOP + ((V_MAX - v) / (V_MAX - V_MIN)) * (BOTTOM - TOP));
const ZERO = yAt(0);

const ACTUAL = MONTHLY.reduce<number[]>((acc, m) => [...acc, r2((acc[acc.length - 1] ?? 0) + m)], []);
const TROUGH = ACTUAL.indexOf(Math.min(...ACTUAL));
const PAY_I = ACTUAL.findIndex((v) => v >= 0);
const PAY_X = r2(xAt(PAY_I - 1) + ((0 - ACTUAL[PAY_I - 1]) / (ACTUAL[PAY_I] - ACTUAL[PAY_I - 1])) * (xAt(PAY_I) - xAt(PAY_I - 1)));

/** Smooth path through the points (Catmull-Rom → cubic Bézier). */
function smooth(values: number[]) {
  const pts = values.map((v, i) => [xAt(i), yAt(v)] as const);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [r2(p1[0] + (p2[0] - p0[0]) / 6), r2(p1[1] + (p2[1] - p0[1]) / 6)];
    const c2 = [r2(p2[0] - (p3[0] - p1[0]) / 6), r2(p2[1] - (p3[1] - p1[1]) / 6)];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const ACTUAL_D = smooth(ACTUAL);
const PLANNED_D = smooth(PLANNED);
const AREA_D = `${ACTUAL_D} L${xAt(ACTUAL.length - 1)} ${ZERO} L${X0} ${ZERO} Z`;
const BAR_W = 6;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const fmt = (n: number) => n.toFixed(1).replace(".", ",");

export type PaintFn = (progress: number) => void;

export function HeroStudyPanel({ paintRef, style }: { paintRef: MutableRefObject<PaintFn | null>; style?: CSSProperties }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => root.querySelector<T>(s);
    const bars = Array.from(root.querySelectorAll<SVGRectElement>(".v1-hp-bar"));
    const steps = Array.from(root.querySelectorAll<HTMLLIElement>(".v1-hp-steps li"));
    const kpis = Array.from(root.querySelectorAll<HTMLElement>(".v1-hp-kpi strong"));
    const head = q<SVGGElement>(".v1-hp-head-dot");

    paintRef.current = (p) => {
      // Realized line sweeps the 24 months over most of the film.
      const lp = span(p, 0.1, 0.92);
      const x = X0 + lp * (X1 - X0);
      q(".v1-hp-clip-real")?.setAttribute("width", String(r2(x)));
      q(".v1-hp-clip-plan")?.setAttribute("width", String(r2(X0 + span(p, 0, 0.22) * (X1 - X0))));

      bars.forEach((bar, i) => bar.classList.toggle("is-on", xAt(i) <= x + 0.5));
      root.classList.toggle("has-trough", x >= xAt(TROUGH));
      root.classList.toggle("has-payback", x >= PAY_X);

      // Live point riding the head of the realized line.
      const f = lp * (ACTUAL.length - 1);
      const i0 = Math.floor(f);
      const i1 = Math.min(ACTUAL.length - 1, i0 + 1);
      const v = ACTUAL[i0] + (ACTUAL[i1] - ACTUAL[i0]) * (f - i0);
      head?.setAttribute("transform", `translate(${r2(x)} ${yAt(v)})`);
      root.classList.toggle("is-live", lp > 0 && lp < 1);

      const stage = STAGES.reduce((acc, s, i) => (p >= s.from ? i : acc), 0);
      steps.forEach((el, i) => {
        el.classList.toggle("is-done", i < stage);
        el.classList.toggle("is-current", i === stage);
      });
      const num = q(".v1-hp-stage-num");
      const label = q(".v1-hp-stage-label");
      if (num) num.textContent = `0${stage + 1}`;
      if (label) label.textContent = STAGES[stage].label;

      const k = easeOut(span(p, 0.3, 0.9));
      kpis.forEach((el, i) => {
        el.textContent = fmt(KPIS[i].value * k);
      });
    };

    return () => {
      paintRef.current = null;
    };
  }, [paintRef]);

  // Specular highlight and a slight tilt follow the pointer, like light on glass.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${r2(px * 100)}%`);
    el.style.setProperty("--gy", `${r2(py * 100)}%`);
    el.style.setProperty("--rx", `${r2((0.5 - py) * 6)}deg`);
    el.style.setProperty("--ry", `${r2((px - 0.5) * 8)}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.style.removeProperty("--gx");
    el.style.removeProperty("--gy");
  };

  return (
    <div
      aria-hidden="true"
      className="v1-hp v1-hero-in has-trough has-payback"
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      ref={rootRef}
      style={style}
    >
      <div className="v1-hp-glass" />

      <div className="v1-hp-top">
        <div>
          <strong className="v1-hp-title">Estudo de viabilidade</strong>
          <span className="v1-hp-sub">Loteamento residencial · cenário base</span>
        </div>
        <span className="v1-hp-pill">Simulação</span>
      </div>

      <div className="v1-hp-stage">
        <ol className="v1-hp-steps">
          {STAGES.map((s, i) => (
            <li className={i < STAGES.length - 1 ? "is-done" : "is-current"} key={s.label} />
          ))}
        </ol>
        <p>
          <span className="v1-hp-stage-num">04</span>
          <span className="v1-hp-stage-label">{STAGES[STAGES.length - 1].label}</span>
        </p>
      </div>

      <div className="v1-hp-chart-head">
        <span>Fluxo de caixa acumulado</span>
        <span>24 meses</span>
      </div>

      <svg className="v1-hp-chart" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <clipPath id="v1-hp-real">
            <rect className="v1-hp-clip-real" height={H} width={W} x="0" y="0" />
          </clipPath>
          <clipPath id="v1-hp-plan">
            <rect className="v1-hp-clip-plan" height={H} width={W} x="0" y="0" />
          </clipPath>
          <linearGradient gradientUnits="userSpaceOnUse" id="v1-hp-area" x1="0" x2="0" y1={TOP} y2={BOTTOM}>
            <stop offset="0" stopColor="rgba(95,191,159,0.42)" />
            <stop offset={r2((ZERO - TOP) / (BOTTOM - TOP))} stopColor="rgba(95,191,159,0.06)" />
            <stop offset={r2((ZERO - TOP) / (BOTTOM - TOP))} stopColor="rgba(255,255,255,0.03)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.16)" />
          </linearGradient>
        </defs>

        {[V_MAX, 8, -8, -16, V_MIN].map((v) => (
          <line className="v1-hp-grid" key={v} x1={X0} x2={X1} y1={yAt(v)} y2={yAt(v)} />
        ))}

        {MONTHLY.map((m, i) => {
          const h = r2(Math.abs(m) * BAR_SCALE);
          return (
            <rect
              className={`v1-hp-bar ${m < 0 ? "is-neg" : ""}`}
              height={h}
              key={i}
              rx="1.5"
              width={BAR_W}
              x={r2(xAt(i) - BAR_W / 2)}
              y={m < 0 ? ZERO : r2(ZERO - h)}
            />
          );
        })}

        <line className="v1-hp-zero" x1={X0} x2={X1} y1={ZERO} y2={ZERO} />

        <path className="v1-hp-plan" clipPath="url(#v1-hp-plan)" d={PLANNED_D} />
        <g clipPath="url(#v1-hp-real)">
          <path className="v1-hp-area" d={AREA_D} />
          <path className="v1-hp-real" d={ACTUAL_D} />
        </g>

        <g className="v1-hp-mark is-trough" transform={`translate(${xAt(TROUGH)} ${yAt(ACTUAL[TROUGH])})`}>
          <circle r="3.5" />
          <text x="7" y="13">Exposição máx.</text>
        </g>

        <g className="v1-hp-mark is-payback">
          <line x1={PAY_X} x2={PAY_X} y1={TOP - 4} y2={BOTTOM} />
          <text textAnchor="end" x={r2(PAY_X - 5)} y={TOP + 4}>
            Payback
          </text>
        </g>

        <g className="v1-hp-head-dot" transform={`translate(${xAt(ACTUAL.length - 1)} ${yAt(ACTUAL[ACTUAL.length - 1])})`}>
          <circle className="v1-hp-head-ring" r="7" />
          <circle r="3.2" />
        </g>
      </svg>

      <div className="v1-hp-legend">
        <span className="is-real">Realizado</span>
        <span className="is-plan">Previsto</span>
        <span className="is-bar">Mensal</span>
      </div>

      <dl className="v1-hp-kpis">
        {KPIS.map((k) => (
          <div className="v1-hp-kpi" key={k.label}>
            <dt>{k.label}</dt>
            <dd>
              {k.unit.startsWith("R$") ? <small className="is-pre">R$</small> : null}
              <strong>{fmt(k.value)}</strong>
              <small>{k.unit.startsWith("R$") ? "mi" : k.unit}</small>
            </dd>
          </div>
        ))}
      </dl>

      <p className="v1-hp-note">Valores ilustrativos · não representam um projeto real</p>
    </div>
  );
}
