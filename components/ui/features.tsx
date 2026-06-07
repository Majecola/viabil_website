"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ElementType } from "react";

export interface FeatureShowcaseItem {
  id: number;
  icon: ElementType;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  previewItems: string[];
}

interface FeaturesProps {
  eyebrow: string;
  heading: string;
  description: string;
  features: FeatureShowcaseItem[];
}

const PROGRESS_INTERVAL_MS = 90;

export function Features({ eyebrow, heading, description, features }: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || features.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((previous) => (previous >= 100 ? 100 : previous + 1));
    }, PROGRESS_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [features.length, prefersReducedMotion]);

  useEffect(() => {
    if (progress < 100 || features.length < 2) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCurrentFeature((previous) => (previous + 1) % features.length);
      setProgress(0);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [features.length, progress]);

  useEffect(() => {
    const activeFeature = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (!activeFeature || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const featureRect = activeFeature.getBoundingClientRect();

    container.scrollTo({
      left: activeFeature.offsetLeft - (containerRect.width - featureRect.width) / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [currentFeature, prefersReducedMotion]);

  if (!features.length) {
    return null;
  }

  const activeFeature = features[currentFeature];

  const selectFeature = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="mx-auto max-w-[1180px] px-6 md:px-0">
      <div className="max-w-3xl">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="section-title">{heading}</h2>
        <p className="section-subtitle">{description}</p>
      </div>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:gap-14">
        <div
          className="no-scrollbar grid w-full min-w-0 max-w-full gap-3 pb-0 sm:flex sm:overflow-x-auto sm:overscroll-x-contain sm:pb-3 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
          ref={containerRef}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = currentFeature === index;

            return (
              <button
                aria-pressed={isActive}
                className={`w-full cursor-pointer rounded-2xl border p-5 text-left transition duration-300 sm:w-[min(282px,calc(100vw-48px))] sm:shrink-0 lg:w-auto lg:min-w-0 ${
                  isActive
                    ? "border-green-primary/20 bg-white shadow-[0_18px_44px_rgba(10,75,53,0.12)]"
                    : "border-transparent bg-transparent hover:border-green-primary/10 hover:bg-white/70"
                }`}
                key={feature.id}
                onClick={() => selectFeature(index)}
                ref={(element) => {
                  featureRefs.current[index] = element;
                }}
                type="button"
              >
                <span className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                      isActive
                        ? "bg-green-primary text-white"
                        : "bg-green-primary/8 text-green-primary"
                    }`}
                  >
                    <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong className="block text-lg leading-tight text-black">{feature.title}</strong>
                    <span className="mt-2 block text-sm leading-6 text-gray-dark">
                      {feature.description}
                    </span>
                  </span>
                </span>
                <span className="mt-5 block h-1 overflow-hidden rounded-full bg-green-primary/8">
                  {isActive ? (
                    <motion.span
                      animate={{ width: `${prefersReducedMotion ? 100 : progress}%` }}
                      className="block h-full rounded-full bg-gradient-to-r from-green-primary to-green-secondary"
                      initial={{ width: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.1, ease: "linear" }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-green-primary/12 bg-white shadow-[0_28px_72px_rgba(10,75,53,0.14)]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          key={activeFeature.id}
          transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: "easeOut" }}
        >
          {activeFeature.image ? (
            <Image
              alt={activeFeature.imageAlt}
              className="h-auto w-full"
              height={720}
              src={activeFeature.image}
              width={1080}
            />
          ) : (
            <div
              aria-label={activeFeature.imageAlt}
              className="relative aspect-[3/2] overflow-hidden bg-[linear-gradient(145deg,rgba(10,75,53,0.08),rgba(95,191,159,0.12)_58%,rgba(30,58,138,0.08))] p-4 sm:p-6"
              role="img"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-green-primary/12 bg-white/94 shadow-[0_18px_48px_rgba(10,75,53,0.1)]">
                <div className="flex items-center justify-between border-b border-gray-light px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2 rounded-full bg-green-primary/25" />
                    <span className="size-2 rounded-full bg-green-secondary/25" />
                    <span className="size-2 rounded-full bg-blue-technology/20" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-green-primary">
                    Placeholder de screenshot
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-7">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-green-secondary">
                      Módulo de Viabilidade
                    </span>
                    <h3 className="mt-3 max-w-md text-xl font-extrabold leading-tight text-black sm:text-2xl">
                      {activeFeature.title}
                    </h3>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {activeFeature.previewItems.map((item) => (
                      <span
                        className="rounded-lg border border-green-primary/10 bg-green-primary/4 p-3 text-xs font-bold leading-5 text-green-primary"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="m-0 text-xs leading-5 text-gray-dark">
                    Espaço reservado para a captura real do software.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
