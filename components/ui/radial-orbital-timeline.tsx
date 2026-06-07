"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: React.ElementType;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const defaultMetrics = {
  radius: 230,
  ringSize: 460,
  nodeSize: 40,
  iconSize: 16,
  nucleusSize: 72,
  labelOffset: 54,
  cardWidth: 340,
  compact: false,
};

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [orbitMetrics, setOrbitMetrics] = useState(defaultMetrics);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const expandedItem = timelineData.find((item) => expandedItems[item.id]);
  const compactCardHeight = expandedItem ? 280 : 0;
  const containerHeight = orbitMetrics.compact
    ? orbitMetrics.ringSize + 150 + compactCardHeight
    : orbitMetrics.ringSize + 170;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setAutoRotate(true);
    }
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        if (orbitMetrics.compact) {
          setAutoRotate(true);
        } else {
          setAutoRotate(false);
          centerViewOnNode(id);
        }
      } else {
        setAutoRotate(true);
      }

      return newState;
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoRotate]);

  useEffect(() => {
    const updateMetrics = () => {
      const width = containerRef.current?.getBoundingClientRect().width || 900;
      const compact = width < 640;
      const radius = compact
        ? Math.max(82, Math.min(104, (width - 152) / 2))
        : Math.min(300, Math.max(210, width * 0.27));
      const wide = !compact && width >= 920;

      setOrbitMetrics({
        radius,
        ringSize: radius * 2,
        nodeSize: compact ? 36 : wide ? 50 : 44,
        iconSize: compact ? 15 : wide ? 20 : 18,
        nucleusSize: compact ? 54 : wide ? 88 : 76,
        labelOffset: compact ? 40 : wide ? 64 : 56,
        cardWidth: compact ? Math.min(320, Math.max(270, width - 28)) : wide ? 360 : 340,
        compact,
      });
    };

    updateMetrics();
    const animationFrame = window.requestAnimationFrame(updateMetrics);
    const settleTimer = window.setTimeout(updateMetrics, 120);
    window.addEventListener("resize", updateMetrics);

    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.clearTimeout(settleTimer);
        window.removeEventListener("resize", updateMetrics);
      };
    }

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", updateMetrics);
      observer.disconnect();
    };
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = orbitMetrics.radius * Math.cos(radian) + centerOffset.x;
    const y = orbitMetrics.radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    return { x, y, zIndex };
  };

  const formatPosition = (value: number) => Number(value.toFixed(3));
  const orbitTop = orbitMetrics.compact ? 36 : "50%";
  const compactCardTop = orbitMetrics.ringSize + 96;

  return (
    <div
      className="mx-auto w-full overflow-x-clip overflow-y-visible"
      style={{ height: containerHeight }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full items-start justify-center pt-8 sm:items-center sm:pt-0">
        <div
          className="absolute flex items-center justify-center"
          ref={orbitRef}
          style={{
            top: orbitTop,
            left: "50%",
            width: orbitMetrics.ringSize,
            height: orbitMetrics.ringSize,
            perspective: "1000px",
            transform: orbitMetrics.compact
              ? `translate(calc(-50% + ${centerOffset.x}px), ${centerOffset.y}px)`
              : `translate(calc(-50% + ${centerOffset.x}px), calc(-50% + ${centerOffset.y}px))`,
          }}
        >
          <div
            className="absolute z-10 flex animate-pulse items-center justify-center rounded-full"
            style={{
              width: orbitMetrics.nucleusSize,
              height: orbitMetrics.nucleusSize,
              background: "linear-gradient(135deg, #0A4B35, #13885E, #5FBF9F)",
            }}
          >
            <div
              className="absolute animate-ping rounded-full border opacity-50"
              style={{
                width: orbitMetrics.nucleusSize + 16,
                height: orbitMetrics.nucleusSize + 16,
                borderColor: "rgba(10,75,53,0.3)",
              }}
            />
            <div
              className="absolute animate-ping rounded-full border opacity-30"
              style={{
                width: orbitMetrics.nucleusSize + 32,
                height: orbitMetrics.nucleusSize + 32,
                animationDelay: "0.5s",
                borderColor: "rgba(19,136,94,0.2)",
              }}
            />
            <div
              className="rounded-full bg-white/90 backdrop-blur-md"
              style={{
                width: orbitMetrics.nucleusSize / 2,
                height: orbitMetrics.nucleusSize / 2,
              }}
            />
          </div>

          <div
            className="absolute rounded-full border"
            style={{
              width: orbitMetrics.ringSize,
              height: orbitMetrics.ringSize,
              borderColor: "rgba(10,75,53,0.15)",
            }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${item.title}: ${item.content}`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${formatPosition(position.x - orbitMetrics.nodeSize / 2)}px, ${formatPosition(
                    position.y - orbitMetrics.nodeSize / 2,
                  )}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isExpanded ? "scale-150" : ""
                  }`}
                  style={{
                    width: orbitMetrics.nodeSize,
                    height: orbitMetrics.nodeSize,
                    ...(isExpanded
                      ? {
                          background: "#ffffff",
                          color: "#0A4B35",
                          borderColor: "#0A4B35",
                          boxShadow: "0 0 0 4px rgba(10,75,53,0.12)",
                        }
                      : {
                          background: "#0A4B35",
                          color: "#ffffff",
                          borderColor: "rgba(10,75,53,0.4)",
                        }),
                  }}
                >
                  <Icon size={orbitMetrics.iconSize} />
                </div>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold transition-all duration-300 ${
                    isExpanded ? "scale-125" : ""
                  }`}
                  style={{
                    top: orbitMetrics.labelOffset,
                    color: isExpanded ? "#0A4B35" : "#4A4A4A",
                    fontSize: orbitMetrics.compact ? 10 : orbitMetrics.nodeSize >= 50 ? 14 : 12,
                    letterSpacing: orbitMetrics.compact ? "0.02em" : "0.05em",
                    width: orbitMetrics.compact ? 64 : "max-content",
                    whiteSpace: orbitMetrics.compact ? "normal" : "nowrap",
                    lineHeight: orbitMetrics.compact ? 1.15 : 1.2,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </div>

                {isExpanded && !orbitMetrics.compact && (
                  <Card
                    className="absolute left-1/2 top-20 -translate-x-1/2 overflow-visible rounded-lg shadow-2xl"
                    style={{
                      width: orbitMetrics.cardWidth,
                      background: "#ffffff",
                      borderColor: "rgba(10,75,53,0.24)",
                      boxShadow: "0 24px 60px rgba(10,75,53,0.18)",
                    }}
                  >
                    <div
                      className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2"
                      style={{ background: "rgba(10,75,53,0.46)" }}
                    />
                    <CardHeader className="pb-3 pt-6 px-6">
                      <CardTitle className="text-base font-bold" style={{ color: "#0A4B35" }}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 text-sm" style={{ color: "#33423d" }}>
                      <p className="leading-relaxed">{item.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>

        {expandedItem && orbitMetrics.compact && (
          <Card
            className="absolute left-1/2 -translate-x-1/2 overflow-visible rounded-lg shadow-2xl"
            style={{
              top: compactCardTop,
              width: orbitMetrics.cardWidth,
              background: "#ffffff",
              borderColor: "rgba(10,75,53,0.24)",
              boxShadow: "0 20px 44px rgba(10,75,53,0.14)",
            }}
          >
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-base font-bold" style={{ color: "#0A4B35" }}>
                {expandedItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm" style={{ color: "#33423d" }}>
              <p className="leading-relaxed">{expandedItem.content}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
