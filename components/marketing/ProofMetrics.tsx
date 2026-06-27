"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

type VisualKind = "bars" | "calendar" | "people" | "ring";

const STATS: Array<{ final: number; suffix: string; label: string; visual: VisualKind }> = [
  { final: 600, suffix: "+", label: "empresas implementadas no Brasil", visual: "bars" },
  { final: 120, suffix: "+", label: "treinamentos por ano", visual: "calendar" },
  { final: 8, suffix: " mil+", label: "profissionais treinados", visual: "people" },
  { final: 30, suffix: "+", label: "anos de mercado imobiliário", visual: "ring" },
];

function Visual({ kind }: { kind: VisualKind }) {
  if (kind === "bars") {
    return (
      <svg className="pm-visual" viewBox="0 0 48 48" aria-hidden="true">
        {[10, 17, 24, 31, 38].map((x, i) => (
          <rect
            key={x}
            className="pm-bar"
            x={x - 2.6}
            y={40 - (12 + i * 5.5)}
            width="5.2"
            height={12 + i * 5.5}
            rx="1.6"
            style={{ ["--i" as string]: i }}
          />
        ))}
        <line x1="5" y1="41.5" x2="43" y2="41.5" className="pm-base" />
      </svg>
    );
  }
  if (kind === "calendar") {
    return (
      <svg className="pm-visual" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="9" width="34" height="32" rx="5" className="pm-frame" />
        <line x1="7" y1="17.5" x2="41" y2="17.5" className="pm-base" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            className="pm-dot"
            cx={14 + (i % 4) * 6.8}
            cy={24 + Math.floor(i / 4) * 6.4}
            r="2.1"
            style={{ ["--i" as string]: i }}
          />
        ))}
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <svg className="pm-visual" viewBox="0 0 48 48" aria-hidden="true">
        {[
          { cx: 13, d: 0 },
          { cx: 24, d: 1 },
          { cx: 35, d: 2 },
        ].map(({ cx, d }) => (
          <g key={cx} className="pm-person" style={{ ["--i" as string]: d }}>
            <circle cx={cx} cy={17} r="4.4" />
            <path d={`M${cx - 7} 38c0-6 2.8-9.6 7-9.6s7 3.6 7 9.6`} />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg className="pm-visual" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="18" className="pm-ring-track" />
      <circle cx="24" cy="24" r="18" className="pm-ring" />
      <text x="24" y="22.5" textAnchor="middle" className="pm-ring-text">
        1995
      </text>
      <text x="24" y="31" textAnchor="middle" className="pm-ring-sub">
        hoje
      </text>
    </svg>
  );
}

function StatCell({
  final,
  suffix,
  label,
  visual,
  inview,
}: (typeof STATS)[number] & { inview: boolean }) {
  const value = useCountUp(final, inview);
  return (
    <div className="pm-cell">
      <Visual kind={visual} />
      <div className="pm-copy">
        <span className="pm-value">
          {value.toLocaleString("pt-BR")}
          <span className="pm-suffix">{suffix}</span>
        </span>
        <span className="pm-label">{label}</span>
      </div>
    </div>
  );
}

export function ProofMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInview(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={inview ? "pm-grid is-inview" : "pm-grid"}>
      {STATS.map((stat) => (
        <StatCell key={stat.label} {...stat} inview={inview} />
      ))}
    </div>
  );
}
