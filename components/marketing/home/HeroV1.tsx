"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/whatsapp";

// 15% faster than the half-speed pass — still calm, less sluggish.
const HERO_PLAYBACK_RATE = 0.575;

export function HeroV1() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Media drifts slower than the page; copy lifts and fades out.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      return;
    }

    // Half speed: the building footage is far calmer behind the copy.
    video.playbackRate = HERO_PLAYBACK_RATE;

    const play = () => {
      video.playbackRate = HERO_PLAYBACK_RATE;
      video.play().catch(() => {
        /* autoplay blocked — the poster frame still reads fine */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    // Stop decoding frames while the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section className="v1-hero" id="inicio" ref={sectionRef}>
      <motion.video
        aria-hidden="true"
        className="v1-hero-media"
        loop
        muted
        playsInline
        preload="metadata"
        ref={videoRef}
        src="/assets/hero/building.mp4"
        style={reduceMotion ? undefined : { y: mediaY, scale: mediaScale }}
      />
      <div className="v1-hero-scrim" aria-hidden="true" />
      <div className="v1-hero-grain" aria-hidden="true" />

      <div className="v1-shell v1-hero-inner">
        <motion.div
          className="v1-hero-copy"
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <motion.h1
            className="v1-hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            A referência em viabilidade financeira para o <em>mercado imobiliário</em>
          </motion.h1>

          <motion.p
            className="v1-hero-sub"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Do terreno ao resultado: incorporadoras, loteadoras e desenvolvedores usam O VIABIL
            para transformar premissas em decisões de investimento mais seguras.
          </motion.p>

          <motion.div
            className="v1-hero-ctas"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="vbtn vbtn-primary vbtn-lg" href="#contato">
              Solicitar demonstração
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="vbtn vbtn-clear vbtn-lg"
              href={getWhatsAppHref("Olá, gostaria de falar com um especialista VIABIL.")}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" />
              Falar com especialista
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
