"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const IMG_PADDING = 12;

interface Module {
  id: string;
  name: string;
  tag: string;
  headline: string;
  desc: string;
  facts: string[];
}

// Visual mock patterns per module — purely decorative placeholders
const MODULE_VISUALS = [
  {
    bg: "linear-gradient(145deg, #0A4B35 0%, #13885E 60%, #5FBF9F 100%)",
    accent: "#5FBF9F",
    rows: [5, 4, 4],
    icon: "M3 6h10M3 10h7M3 14h9",
  },
  {
    bg: "linear-gradient(145deg, #083C2B 0%, #0A4B35 40%, #13885E 100%)",
    accent: "#FF7A00",
    rows: [3, 5, 3],
    icon: "M3 14l4-8 4 6 3-4 3 4",
  },
  {
    bg: "linear-gradient(145deg, #1E3A8A 0%, #0A4B35 100%)",
    accent: "#5FBF9F",
    rows: [4, 3, 5],
    icon: "M4 12h8M4 8h12M4 16h6",
  },
  {
    bg: "linear-gradient(145deg, #0A4B35 0%, #1E3A8A 100%)",
    accent: "#FF7A00",
    rows: [5, 5, 3],
    icon: "M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1z",
  },
  {
    bg: "linear-gradient(145deg, #0D0D0D 0%, #0A4B35 100%)",
    accent: "#5FBF9F",
    rows: [4, 4, 4],
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

function StickyImage({ index }: { index: number }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const vis = MODULE_VISUALS[index % MODULE_VISUALS.length];

  return (
    <motion.div
      ref={targetRef}
      style={{
        background: vis.bg,
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Mock UI skeleton */}
      <div
        aria-hidden="true"
        className="absolute inset-8 top-20 rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(2px)" }}
      >
        {/* Fake toolbar */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: vis.accent, opacity: 0.7 }} />
          <div className="h-2.5 rounded" style={{ background: "rgba(255,255,255,0.12)", width: 80 }} />
          <div className="ml-auto h-2.5 rounded" style={{ background: "rgba(255,255,255,0.10)", width: 48 }} />
        </div>
        {/* Fake content rows */}
        <div className="p-4 flex gap-4">
          <div className="flex-1 space-y-3">
            {vis.rows.map((w, i) => (
              <div
                key={i}
                className="h-3 rounded"
                style={{ background: "rgba(255,255,255,0.10)", width: `${w * 18}%` }}
              />
            ))}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[42, 68, 54, 76, 60, 38].map((h, i) => (
                <div
                  key={i}
                  className="rounded"
                  style={{
                    height: h,
                    background: i % 2 === 0 ? vis.accent : "rgba(255,255,255,0.10)",
                    opacity: i % 2 === 0 ? 0.35 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-40 space-y-2">
            {[90, 70, 55, 80].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded"
                style={{ background: "rgba(255,255,255,0.08)", width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity, background: "rgba(10,75,53,0.4)" }}
      />
    </motion.div>
  );
}

function OverlayCopy({ tag, name, index }: { tag: string; name: string; index: number }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  const vis = MODULE_VISUALS[index % MODULE_VISUALS.length];

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white pointer-events-none"
    >
      <p
        className="mb-3 text-center text-xs uppercase tracking-[0.22em] font-semibold"
        style={{ color: vis.accent }}
      >
        Módulo {(index + 1).toString().padStart(2, "0")} — {tag}
      </p>
      <p className="w-full max-w-[calc(100vw-48px)] text-center text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
        {name}
      </p>
    </motion.div>
  );
}

function ModuleContent({ mod, index }: { mod: Module; index: number }) {
  const vis = MODULE_VISUALS[index % MODULE_VISUALS.length];
  const accentColor = vis.accent === "#FF7A00" ? "#FF7A00" : "#13885E";

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <div className="col-span-1 md:col-span-4">
        <span
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: accentColor }}
        >
          {mod.id} — {mod.tag}
        </span>
        <h2
          className="mt-3 text-2xl font-bold md:text-3xl leading-snug"
          style={{ color: "var(--green-primary)" }}
        >
          {mod.headline}
        </h2>
      </div>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--gray-dark)" }}>
          {mod.desc}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {mod.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ background: "#13885E" }}
              />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ModulosParallax({ modules }: { modules: Module[] }) {
  return (
    <div>
      {modules.map((mod, index) => (
        <div
          key={mod.id}
          style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
        >
          <div className="relative h-[150vh]">
            <StickyImage index={index} />
            <OverlayCopy tag={mod.tag} name={mod.name} index={index} />
          </div>
          <ModuleContent mod={mod} index={index} />
        </div>
      ))}
    </div>
  );
}
