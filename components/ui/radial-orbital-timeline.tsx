"use client";
import { useState, useEffect, useRef } from "react";
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

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setAutoRotate(false);
        centerViewOnNode(id);
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
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    return { x, y, zIndex };
  };

  const formatPosition = (value: number) => Number(value.toFixed(3));

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: 540 }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center nucleus — VIABIL brand gradient */}
          <div
            className="absolute w-16 h-16 rounded-full animate-pulse flex items-center justify-center z-10"
            style={{ background: "linear-gradient(135deg, #0A4B35, #13885E, #5FBF9F)" }}
          >
            <div
              className="absolute w-20 h-20 rounded-full border animate-ping opacity-50"
              style={{ borderColor: "rgba(10,75,53,0.3)" }}
            />
            <div
              className="absolute w-24 h-24 rounded-full border animate-ping opacity-30"
              style={{ animationDelay: "0.5s", borderColor: "rgba(19,136,94,0.2)" }}
            />
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute w-96 h-96 rounded-full border"
            style={{ borderColor: "rgba(10,75,53,0.15)" }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${formatPosition(position.x)}px, ${formatPosition(position.y)}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node dot */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${isExpanded ? "scale-150" : ""}
                  `}
                  style={
                    isExpanded
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
                        }
                  }
                >
                  <Icon size={16} />
                </div>

                {/* Node label */}
                <div
                  className={`
                    absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider transition-all duration-300
                    ${isExpanded ? "scale-125" : ""}
                  `}
                  style={{ color: isExpanded ? "#0A4B35" : "#4A4A4A" }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-80 overflow-visible rounded-lg shadow-2xl"
                    style={{
                      background: "#ffffff",
                      borderColor: "rgba(10,75,53,0.24)",
                      boxShadow: "0 24px 60px rgba(10,75,53,0.18)",
                    }}
                  >
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4"
                      style={{ background: "rgba(10,75,53,0.46)" }}
                    />
                    <CardHeader className="pb-3 pt-6 px-6">
                      <CardTitle
                        className="text-base font-bold"
                        style={{ color: "#0A4B35" }}
                      >
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
      </div>
    </div>
  );
}
