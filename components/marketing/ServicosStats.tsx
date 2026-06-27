"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { final: 300, suffix: "+", label: "atendimentos por semana" },
  { final: 120, suffix: "+", label: "treinamentos por ano" },
  { final: 8, suffix: " mil+", label: "profissionais treinados" },
  { final: 80, suffix: "+", label: "customizações entregues" },
];

function Cell({ final, suffix, label, inview }: (typeof STATS)[number] & { inview: boolean }) {
  const value = useCountUp(final, inview);
  return (
    <div className="metric-item">
      <span className="metric-value">
        {value.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="metric-label">{label}</span>
    </div>
  );
}

export function ServicosStats() {
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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="metric-row">
      {STATS.map((stat) => (
        <Cell key={stat.label} {...stat} inview={inview} />
      ))}
    </div>
  );
}
