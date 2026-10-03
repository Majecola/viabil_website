"use client";

import type { ElementType } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: ElementType;
  /** Neighbouring steps in the cycle — they pulse when this one is open. */
  relatedIds?: number[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

/** One slow revolution per minute — present, never distracting. */
const SPIN_DEG_PER_SEC = 6;
/** How long it takes to swing a clicked node up to the top of the ring. */
const SETTLE_MS = 620;
/** Angle where the selected node comes to rest: 3 o'clock, facing the detail
    panel, so the spoke from the hub points straight at the card. */
const REST_ANGLE = 0;
/** Below this width the panel no longer fits beside the ring: the detail drops below it. */
const SIDE_BY_SIDE_MIN = 820;
/** Room the side layout keeps for the panel, the gap, the nodes overhanging the ring
    and the stage padding, before sizing the ring. */
const PANEL_MIN = 340;
const SIDE_CHROME = 72 + 2 * 60 + 2 * 48;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Shortest signed rotation from `from` to `to`, so nodes never take the long way. */
function shortestDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  // The card only appears once the node has finished swinging to the top,
  // so it never renders away from the step it belongs to.
  const [settled, setSettled] = useState(false);
  const [metrics, setMetrics] = useState({ radius: 210, compact: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Rotation lives in refs and is written straight to a CSS variable. Keeping it
  // out of React state is what makes the ring smooth: driving it through
  // setState while each node also carries a long CSS transition leaves every
  // node easing toward an angle that is already several frames stale.
  const rotationRef = useRef(0);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const activeRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  const total = timelineData.length;
  const active = timelineData.find((item) => item.id === activeId) ?? null;

  const relatedIds = useMemo(() => new Set(active?.relatedIds ?? []), [active]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Size the ring to the space it actually got.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.getBoundingClientRect().width || 900;
      const compact = width < SIDE_BY_SIDE_MIN;
      setMetrics({
        compact,
        radius: compact
          ? Math.max(88, Math.min(150, (width - 128) / 2))
          : Math.min(230, Math.max(150, (width - PANEL_MIN - SIDE_CHROME) / 2)),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Single rAF loop: free spin when idle, eased tween when a node is selected.
  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const delta = Math.min(now - last, 64);
      last = now;

      const tween = tweenRef.current;
      if (tween) {
        const progress = Math.min(1, (now - tween.start) / SETTLE_MS);
        rotationRef.current = tween.from + (tween.to - tween.from) * easeOutCubic(progress);
        if (progress >= 1) tweenRef.current = null;
      } else if (activeRef.current === null && !reduceMotionRef.current) {
        rotationRef.current += (SPIN_DEG_PER_SEC * delta) / 1000;
      }

      ringRef.current?.style.setProperty(
        "--orbit-rot",
        `${(rotationRef.current % 360).toFixed(2)}deg`,
      );
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const select = useCallback(
    (id: number) => {
      if (activeRef.current === id) {
        activeRef.current = null;
        setActiveId(null);
        return;
      }

      activeRef.current = id;
      setActiveId(id);

      const index = timelineData.findIndex((item) => item.id === id);
      if (index < 0) return;

      const target = REST_ANGLE - (index / total) * 360;
      const from = rotationRef.current;
      const to = from + shortestDelta(from, target);

      if (reduceMotionRef.current) {
        rotationRef.current = to;
        tweenRef.current = null;
        return;
      }

      tweenRef.current = { from, to, start: performance.now() };
    },
    [timelineData, total],
  );

  const clear = useCallback(() => {
    activeRef.current = null;
    setActiveId(null);
  }, []);

  useEffect(() => {
    if (activeId === null) {
      setSettled(false);
      return;
    }
    if (reduceMotionRef.current) {
      setSettled(true);
      return;
    }
    setSettled(false);
    const timer = window.setTimeout(() => setSettled(true), SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [activeId]);

  // While a card is open, any press outside it closes it and the ring resumes.
  // Presses on a node fall through to that node's own toggle.
  useEffect(() => {
    if (activeId === null) return;

    const onPressOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".v1-orbit-card") || target?.closest(".v1-orbit-node")) return;
      clear();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clear();
    };

    document.addEventListener("pointerdown", onPressOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPressOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeId, clear]);

  const ringSize = metrics.radius * 2;
  const activeIndex = active ? timelineData.findIndex((item) => item.id === active.id) : -1;

  const detail = active ? (
    <>
      <CardHeader className="v1-orbit-card-head">
        <span className="v1-orbit-card-step">
          Etapa {String(timelineData.findIndex((i) => i.id === active.id) + 1).padStart(2, "0")} de{" "}
          {String(total).padStart(2, "0")}
        </span>
        <CardTitle className="v1-orbit-card-title">{active.title}</CardTitle>
      </CardHeader>
      <CardContent className="v1-orbit-card-body">
        <p>{active.content}</p>

        {active.relatedIds?.length ? (
          <div className="v1-orbit-card-links">
            <span>No ciclo</span>
            <div>
              {active.relatedIds.map((relatedId, index) => {
                const related = timelineData.find((i) => i.id === relatedId);
                if (!related) return null;
                const isPrevious = index === 0;
                return (
                  <button
                    className="vbtn vbtn-outline vbtn-sm"
                    key={relatedId}
                    onClick={(event) => {
                      event.stopPropagation();
                      select(relatedId);
                    }}
                    type="button"
                  >
                    {isPrevious ? <ArrowLeft aria-hidden="true" /> : null}
                    {related.title}
                    {isPrevious ? null : <ArrowRight aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </CardContent>
    </>
  ) : null;

  return (
    <div
      className={`v1-orbit${metrics.compact ? " is-compact" : ""}`}
      ref={containerRef}
    >
      <div
        className="v1-orbit-ring"
        onClick={(event) => {
          if (event.target === event.currentTarget) clear();
        }}
        ref={ringRef}
        style={
          {
            "--orbit-r": `${metrics.radius}px`,
            "--orbit-rot": "0deg",
            height: ringSize,
            width: ringSize,
          } as React.CSSProperties
        }
      >
        <div className="v1-orbit-track" aria-hidden="true" />

        {/* Radius line from the hub out to the open step. It rides the same
            rotation as the nodes, so it stays attached during the settle. */}
        {activeIndex >= 0 ? (
          <div
            aria-hidden="true"
            className="v1-orbit-spoke"
            style={{ "--a": `${(activeIndex / total) * 360}deg` } as React.CSSProperties}
          />
        ) : null}

        {/* The hub: two counter-rotating arcs around a small flat dot. */}
        <div className="v1-orbit-core" aria-hidden="true">
          <i className="v1-orbit-arc" />
          <i className="v1-orbit-arc is-inner" />
          <i className="v1-orbit-hub" />
        </div>

        {timelineData.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          const isRelated = relatedIds.has(item.id);

          return (
            <button
              aria-expanded={isActive}
              className={`v1-orbit-node${isActive ? " is-active" : ""}${
                isRelated ? " is-related" : ""
              }`}
              key={item.id}
              onClick={() => select(item.id)}
              style={{ "--a": `${(index / total) * 360}deg` } as React.CSSProperties}
              type="button"
            >
              <span className="v1-orbit-halo" aria-hidden="true" />
              <span className="v1-orbit-dot">
                <Icon aria-hidden="true" />
              </span>
              <span className="v1-orbit-label">{item.title}</span>
            </button>
          );
        })}

      </div>

      {/* The detail always opens in the same place: beside the ring on wide
          screens (once the node has settled at 3 o'clock, facing it), below the
          ring on narrow ones. The panel keeps its size, so nothing shifts. */}
      <div aria-live="polite" className="v1-orbit-panel">
        {active ? (
          metrics.compact || settled ? (
            <Card className="v1-orbit-card" key={active.id}>
              {detail}
            </Card>
          ) : null
        ) : (
          <p className="v1-orbit-hint">
            {metrics.compact ? "Toque" : "Clique"} em uma etapa do ciclo para ver o que O VIABIL
            organiza nela.
          </p>
        )}
      </div>
    </div>
  );
}
