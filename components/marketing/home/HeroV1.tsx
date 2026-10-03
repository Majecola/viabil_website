"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { HeroStudyPanel, type PaintFn } from "@/components/marketing/home/HeroStudyPanel";

const POSTER_START = "/assets/hero/terreno-start.webp";
const POSTER_END = "/assets/hero/terreno-end.webp";

const TITLE = ["A", "referência", "em", "viabilidade", "financeira", "para", "o"];
const TITLE_EM = ["mercado", "imobiliário"];

export function HeroV1() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const paintRef = useRef<PaintFn | null>(null);
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Media drifts slower than the page; copy lifts and fades out.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  // The study panel paints straight to the DOM: no React render per frame.
  const paint = (p: number) => paintRef.current?.(p);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      // No film with reduced motion: show the finished neighborhood, panel complete.
      video.poster = POSTER_END;
      paint(1);
      setSettled(true);
      return;
    }

    let raf = 0;
    const tick = () => {
      if (video.duration) paint(video.currentTime / video.duration);
      raf = requestAnimationFrame(tick);
    };
    const onEnded = () => {
      cancelAnimationFrame(raf);
      paint(1);
      setSettled(true);
    };
    const play = () => {
      if (video.ended) return;
      video.play().then(
        () => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        },
        () => {
          // Autoplay blocked: show the finished scene instead of a frozen first frame.
          video.poster = POSTER_END;
          onEnded();
        },
      );
    };

    // timeupdate backs up rAF when frames are throttled (background tabs, low power).
    const onTime = () => video.duration && paint(video.currentTime / video.duration);

    paint(0);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    // Stop decoding frames while the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else {
          video.pause();
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", play);
      video.pause();
    };
    // paint only touches refs; reduceMotion is the only real input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  let wordIndex = 0;
  const word = (w: string, em = false) => {
    const i = wordIndex++;
    return (
      <span className={`v1-hw ${em ? "is-em" : ""}`} key={`${w}-${i}`}>
        <span style={{ "--i": i } as CSSProperties}>{w}</span>
      </span>
    );
  };

  return (
    <section
      className={`v1-hero ${settled ? "is-settled" : ""}`}
      id="inicio"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="v1-hero-media-wrap"
        style={reduceMotion ? undefined : { y: mediaY }}
      >
        <video
          className="v1-hero-media"
          muted
          playsInline
          poster={POSTER_START}
          preload="auto"
          ref={videoRef}
        >
          <source media="(max-width: 760px)" src="/assets/hero/terreno-1280.mp4" type="video/mp4" />
          <source src="/assets/hero/terreno-1920.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="v1-hero-scrim" aria-hidden="true" />
      <div className="v1-hero-grain" aria-hidden="true" />

      <div className="v1-shell v1-hero-inner">
        <motion.div
          className="v1-hero-copy"
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <h1 className="v1-hero-title">
            {TITLE.map((w) => (
              <span key={w}>
                {word(w)}{" "}
              </span>
            ))}
            <em>
              {TITLE_EM.map((w, i) => (
                <span key={w}>
                  {word(w, true)}
                  {i < TITLE_EM.length - 1 ? " " : null}
                </span>
              ))}
            </em>
          </h1>

          <p className="v1-hero-sub v1-hero-in" style={{ "--d": "820ms" } as CSSProperties}>
            Do terreno ao resultado: incorporadoras, loteadoras e desenvolvedores usam O VIABIL
            para transformar premissas em decisões de investimento mais seguras.
          </p>

          <div className="v1-hero-ctas v1-hero-in" style={{ "--d": "980ms" } as CSSProperties}>
            <a className="vbtn vbtn-primary vbtn-lg v1-hero-cta-main" href="#contato">
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
          </div>
        </motion.div>

        <HeroStudyPanel paintRef={paintRef} style={{ "--d": "1300ms" } as CSSProperties} />
      </div>

      <a className="v1-hero-cue v1-hero-in" href="#prova" style={{ "--d": "1600ms" } as CSSProperties}>
        <span className="sr-only">Ir para o conteúdo</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
