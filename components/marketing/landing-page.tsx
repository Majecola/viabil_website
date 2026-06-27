"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { landingStyles } from "@/lib/generated/landing-styles";
import { ClientsMarquee } from "@/components/marketing/ClientsMarquee";
import { DepoimentosSection } from "@/components/marketing/DepoimentosSection";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { PlataformaFeatures } from "@/components/marketing/PlataformaFeatures";
import { ProofMetrics } from "@/components/marketing/ProofMetrics";
import { ServicosShowcase } from "@/components/marketing/ServicosShowcase";

const landingShellOverrides = `
  .landing-source {
    overflow-x: clip;
  }

  .landing-source .site-nav,
  .landing-source .whatsapp-fab,
  .landing-source > footer,
  .landing-source footer {
    display: none !important;
  }

  .landing-source .btn,
  .landing-source .nav-cta,
  .landing-source .business-nav {
    position: relative;
    isolation: isolate;
    min-height: 46px;
    border-radius: 8px;
    font-weight: 800;
    letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(10, 75, 53, 0.14);
    transition:
      transform 180ms var(--ease-out),
      background 220ms var(--ease-out),
      border-color 220ms var(--ease-out),
      color 220ms var(--ease-out),
      box-shadow 220ms var(--ease-out),
      opacity 220ms var(--ease-out);
  }

  .landing-source .btn::after,
  .landing-source .nav-cta::after,
  .landing-source .business-nav::after {
    content: "";
    position: absolute;
    inset: 1px;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,.2), rgba(255,255,255,0));
    pointer-events: none;
  }

  .landing-source .btn-primary,
  .landing-source .nav-cta {
    background: linear-gradient(135deg, var(--green-primary), #073d2c);
    box-shadow: 0 12px 28px rgba(10, 75, 53, 0.18), inset 0 1px 0 rgba(255,255,255,.18);
  }

  .landing-source .btn-secondary {
    background: rgba(255,255,255,.86);
    border-color: rgba(10, 75, 53, .28);
    box-shadow: 0 10px 24px rgba(10, 75, 53, 0.08), inset 0 1px 0 rgba(255,255,255,.8);
    backdrop-filter: blur(10px);
  }

  .landing-source .business-nav {
    border: 1px solid rgba(10, 75, 53, .18);
    background: rgba(255, 255, 255, .9);
    color: var(--green-primary);
  }

  .landing-source .business-dot {
    border: 1px solid rgba(10, 75, 53, .22);
    background: rgba(10, 75, 53, .16);
    transition: width 180ms var(--ease-out), background 180ms var(--ease-out), transform 180ms var(--ease-out);
  }

  .landing-source .business-dot.is-active {
    background: var(--green-primary);
    transform: scale(1.08);
  }

  @media (hover: hover) and (pointer: fine) {
    .landing-source .btn:hover,
    .landing-source .nav-cta:hover,
    .landing-source .business-nav:hover {
      transform: translateY(-2px);
    }

    .landing-source .btn-primary:hover,
    .landing-source .nav-cta:hover {
      background: linear-gradient(135deg, var(--green-secondary), var(--green-primary));
      box-shadow: 0 16px 34px rgba(10, 75, 53, 0.22), inset 0 1px 0 rgba(255,255,255,.2);
    }

    .landing-source .btn-secondary:hover,
    .landing-source .business-nav:hover {
      background: rgba(10, 75, 53, .06);
      border-color: rgba(10, 75, 53, .42);
      box-shadow: 0 14px 30px rgba(10, 75, 53, 0.12);
    }
  }

  .landing-source .btn:active,
  .landing-source .nav-cta:active,
  .landing-source .business-nav:active {
    transform: translateY(0) scale(.98);
  }

  .landing-source .hero {
    min-height: calc(100dvh - var(--nav-height));
    padding-top: 0;
    align-items: stretch;
  }

  .landing-source .hero-video-bg,
  .landing-source .hero-video-overlay {
    inset: 0;
    height: 100%;
  }

  .landing-source .hero-video-bg {
    object-position: 56% center;
  }

  .landing-source .hero-video-overlay {
    background:
      linear-gradient(90deg, rgba(0, 0, 0, .38) 0%, rgba(0, 0, 0, .24) 38%, rgba(0, 0, 0, .14) 70%),
      rgba(0, 0, 0, .20);
  }

  .landing-source .hero-video .container {
    min-height: calc(100dvh - var(--nav-height));
    display: flex;
    align-items: center;
    padding-top: clamp(20px, 3.5vh, 38px);
    padding-bottom: clamp(26px, 5vh, 48px);
  }

  .landing-source .hero-content {
    width: min(100%, 540px);
    max-width: 540px;
    transform: translateY(-4px);
  }

  .landing-source .hero-video .hero-title {
    color: var(--white);
    max-width: 520px;
    font-size: clamp(38px, 4.25vw, 58px);
    line-height: 1.04;
    letter-spacing: -0.035em;
    text-shadow: 0 14px 38px rgba(0, 0, 0, .42);
  }

  .landing-source .hero-video .hero-sub {
    color: rgba(255, 255, 255, .9);
    max-width: 470px;
    margin-top: 18px;
    font-size: clamp(16px, 1.4vw, 19px);
    line-height: 1.58;
    text-shadow: 0 10px 30px rgba(0, 0, 0, .44);
  }

  .landing-source .hero-video .hero-ctas {
    gap: 14px;
    margin-top: 30px;
  }

  .landing-source .hero-video .hero-ctas .btn {
    min-height: 52px;
    padding: 14px 24px;
    font-size: 14px;
  }

  .landing-source .hero-video .hero-ctas .btn-secondary {
    color: var(--green-primary);
    background: rgba(255, 255, 255, .9);
    border-color: rgba(255, 255, 255, .62);
  }

  .landing-source .market-map {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(340px, 1.25fr);
    align-items: center;
    gap: clamp(28px, 5vw, 64px);
    margin: 54px 0 36px;
  }

  .landing-source .market-map-copy {
    max-width: 460px;
  }

  .landing-source .map-kicker {
    display: inline-block;
    margin-bottom: 12px;
    color: var(--green-primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .landing-source .market-map h3 {
    color: var(--black);
    font-size: clamp(24px, 2.7vw, 36px);
    line-height: 1.15;
    margin-bottom: 16px;
  }

  .landing-source .market-map p {
    font-size: 16px;
    line-height: 1.7;
  }

  .landing-source .market-map-points {
    display: grid;
    gap: 10px;
    margin-top: 22px;
  }

  .landing-source .market-map-points span {
    position: relative;
    padding-left: 18px;
    color: var(--black);
    font-size: 14px;
    font-weight: 600;
  }

  .landing-source .market-map-points span::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green-primary);
  }

  .landing-source .market-map-visual img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 680px;
    object-fit: contain;
  }

  .landing-source .diferenciais {
    background: var(--green-primary);
    color: var(--white);
  }

  .landing-source .diferenciais .eyebrow {
    color: rgba(255, 255, 255, .9);
  }

  .landing-source .stage-scroll-heading {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .landing-source .stage-scroll-heading .eyebrow {
    margin-bottom: 0;
  }

  .landing-source .stage-scroll-heading h2 {
    max-width: 760px;
  }

  .landing-source .stage-scroll-heading p {
    max-width: 680px;
    margin: 0;
  }

  @media (min-width: 1181px) {
    .landing-source .hero-content {
      margin-left: clamp(0px, 1.5vw, 24px);
      transform: translateY(-12px);
    }
  }

  @media (max-width: 1180px) {
    .landing-source .hero-video-bg {
      object-position: 60% center;
    }

    .landing-source .hero-content {
      width: min(100%, 430px);
      max-width: 430px;
      transform: translateY(-18px);
    }

    .landing-source .hero-video .hero-title {
      max-width: 400px;
      font-size: clamp(34px, 4.7vw, 44px);
      line-height: 1.05;
    }

    .landing-source .hero-video .hero-sub {
      max-width: 380px;
      font-size: 16px;
      line-height: 1.55;
    }

    .landing-source .hero-video .hero-ctas {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      max-width: 300px;
    }

    .landing-source .hero-video .hero-ctas .btn {
      min-height: 50px;
      padding: 13px 20px;
      width: 100%;
    }
  }

  @media (min-width: 1800px) {
    .landing-source .hero-video .container {
      padding-left: max(80px, calc((100vw - 1440px) / 2));
      padding-right: max(80px, calc((100vw - 1440px) / 2));
    }
  }

  @media (max-width: 768px) {
    .landing-source .hero-video-bg {
      object-position: 34% center;
    }

    .landing-source .hero-video-overlay {
      background:
        linear-gradient(180deg, rgba(0, 0, 0, .42) 0%, rgba(0, 0, 0, .22) 48%, rgba(0, 0, 0, .28) 100%),
        rgba(0, 0, 0, .20);
    }

    .landing-source .hero-video .container {
      align-items: flex-start;
      padding-top: 38px;
      padding-bottom: 44px;
    }

    .landing-source .market-map {
      grid-template-columns: 1fr;
      gap: 24px;
      margin: 40px 0 28px;
    }

    .landing-source .market-map-copy {
      max-width: none;
    }

    .landing-source .market-map-visual {
      margin: 0 -12px;
    }

    .landing-source .hero-content {
      width: 100%;
      max-width: calc(100vw - 52px);
      transform: none;
    }

    .landing-source .hero-video .hero-title {
      font-size: clamp(31px, 8.8vw, 40px);
      line-height: 1.07;
      max-width: min(100%, 330px);
      overflow-wrap: break-word;
      text-wrap: auto;
    }

    .landing-source .hero-video .hero-sub {
      max-width: min(100%, 320px);
      font-size: 15px;
      line-height: 1.55;
      overflow-wrap: break-word;
    }

    .landing-source .hero-video .hero-ctas {
      gap: 10px;
      margin-top: 24px;
      max-width: min(100%, 320px);
    }

    .landing-source .hero-video .hero-ctas .btn {
      min-height: 50px;
      padding: 13px 18px;
      font-size: 14px;
    }

    .landing-source .hero-copy,
    .landing-source .hero-video .hero-ctas {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }

  @media (max-width: 480px) {
    .landing-source .hero-video-bg {
      object-position: 30% center;
    }
  }
`;

const stageCopies = [
  {
    step: "01 - Captação",
    title: "Captação: antes do projeto, existe a oportunidade.",
    body: "Encontrar o terreno certo não é sorte. É inteligência geográfica, análise de mercado e precisão na leitura do contexto urbano. O VIABIL mapeia oportunidades antes que o mercado as perceba - cruzando dados de localização, potencial construtivo e viabilidade comercial em uma única inteligência de captação.",
    close: "O empreendimento começa aqui.",
  },
  {
    step: "02 - Viabilidade",
    title: "Os números precisam contar a história certa.",
    body: "TIR, VPL, payback, sensibilidade, cenários otimistas e conservadores - o VIABIL transforma dados brutos em clareza financeira. Cada variável do empreendimento é simulada, testada e confrontada com a realidade do mercado antes de qualquer compromisso.",
    close: "Decisões seguras começam com simulações honestas.",
  },
  {
    step: "03 - Decisão",
    title: "Go ou no-go. Com convicção.",
    body: "A decisão mais cara do mercado imobiliário não é a errada - é a certa tomada tarde demais. O VIABIL entrega o respaldo analítico para que incorporadoras, fundos e gestores avancem com velocidade e segurança - ou recuem antes que o custo seja irreversível.",
    close: "Decidir bem é uma vantagem competitiva.",
  },
  {
    step: "04 - Lançamento",
    title: "O mercado não espera. A preparação, sim.",
    body: "Um lançamento bem-sucedido não é resultado de timing - é resultado de estrutura. O VIABIL garante que o empreendimento chega ao mercado com projeções de receita calibradas, cronograma de vendas validado e performance comercial monitorada desde o primeiro dia.",
    close: "O lançamento é só o começo do que foi planejado.",
  },
  {
    step: "05 - Acompanhamento",
    title: "O que não é monitorado não pode ser gerenciado.",
    body: "Da obra ao fluxo de caixa, do cronograma físico à performance de vendas - o VIABIL mantém o empreendimento sob visibilidade total durante toda a sua execução. Gestão de portfólio, KPIs em tempo real e alertas de desvio antes que o problema se torne irreversível.",
    close: "Controle não é burocracia. É inteligência em movimento.",
  },
];

const resourceItems = [
  ["Reforma tributária", "Premissas fiscais alinhadas às novas regras."],
  ["MCMV", "Minha Casa Minha Vida e modelos residenciais."],
  ["Funding e crédito", "Financiamento, crédito associado e securitização."],
  ["Integrações", "Conexão com ERPs e sistemas de gestão imobiliária."],
  ["Indicadores e relatórios", "VPL, TIR, margem e consolidação sempre refinados."],
  ["Novos modelos de negócio", "Loteamentos, renda, fundos e novas estruturas."],
];

const pillars = [
  ["Valor agregado", "Transforma estudos em decisões de aquisição, aprovação, investimento, correção de rota e portfólio."],
  ["Flexibilidade", "Adapta-se à realidade de incorporadoras, casas, loteamentos, renda, fundos e consultorias."],
  ["Parametrização", "Premissas, indicadores, relatórios e modelos seguem a forma de trabalho da empresa."],
  ["Confiança", "Décadas de uso reduzem discussões sobre fórmulas e elevam a conversa para premissas."],
];

const segments = [
  {
    image: "/assets/segmentos/incorporacao-residencial.png",
    alt: "Empreendimento de incorporação residencial ao entardecer",
    tag: "Residencial",
    title: "Incorporação residencial",
    text: "Decisões de aquisição, lançamento, funding e acompanhamento para o principal ciclo de atuação do VIABIL.",
  },
  {
    image: "/assets/segmentos/casas-condominios.png",
    alt: "Condomínio residencial horizontal com casas e portaria",
    tag: "Casas",
    title: "Casas e condomínios",
    text: "Fases, tipologias, infraestrutura, absorção comercial e custos por unidade para produtos horizontais.",
  },
  {
    image: "/assets/segmentos/loteamentos-urbanizacao.png",
    alt: "Loteamento urbanizado com ruas, lotes e áreas verdes",
    tag: "Urbanização",
    title: "Loteamentos e urbanização",
    text: "Longos ciclos de aprovação, infraestrutura, permutas e carteira exigem disciplina de caixa desde a origem.",
  },
  {
    image: "/assets/segmentos/corporativo-locacao.png",
    alt: "Edifício corporativo de escritórios para locação",
    tag: "Locação",
    title: "Corporativo e locação",
    text: "Galpões, BTS, lajes e renda pedem premissas de vacância, cap-rate, contratos e saída do investimento.",
  },
  {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Warehouse_of_Grupo_Martins_in_Cama%C3%A7ari_(Brazil).jpg?width=900",
    alt: "Centro de distribuição no Brasil",
    tag: "Logística",
    title: "Logística",
    text: "Ativos logísticos dependem de implantação, contratos, faseamento e retorno sobre capital investido.",
    external: true,
  },
  {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Interior_do_Boulevard_Shopping_Vila_Velha_ES.JPG?width=900",
    alt: "Shopping no Brasil",
    tag: "Renda",
    title: "Shopping e ativos de renda",
    text: "Projetos de renda combinam desenvolvimento, ocupação, NOI, yield e valorização patrimonial.",
    external: true,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 13 4 4 10-10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m15 18-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m9 18 6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function useHomepageInteractions() {
  useEffect(() => {
    const cleanupCallbacks: Array<() => void> = [];
    const animationFrameIds = new Set<number>();
    const observers = new Set<IntersectionObserver>();
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    let pageIsBeingHidden = false;

    const trackFrame = (callback: FrameRequestCallback) => {
      const frameId = originalRequestAnimationFrame((time) => {
        animationFrameIds.delete(frameId);
        callback(time);
      });
      animationFrameIds.add(frameId);
      return frameId;
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observers.add(revealObserver);
    document.querySelectorAll(".landing-source .reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    const heroSection = document.querySelector<HTMLElement>(".landing-source .hero-video");
    const heroVideo = document.querySelector<HTMLVideoElement>(
      ".landing-source .hero-video .hero-video-bg",
    );

    if (heroSection && heroVideo) {
      let heroVideoIsVisible = false;
      let heroVideoHasStarted = false;
      let waitForUserScrollBeforeHeroStart = false;
      let heroRevealRaf: number | null = null;

      if (location.hash) {
        try {
          const hashTarget = document.querySelector(location.hash);
          waitForUserScrollBeforeHeroStart = Boolean(hashTarget && !heroSection.contains(hashTarget));
        } catch {}
      }

      const resetHeroVideo = () => {
        try {
          heroVideo.currentTime = 0;
        } catch {}
        heroVideo.playbackRate = 0.85;
        heroSection.classList.remove(
          "hero-sequence-started",
          "hero-copy-started",
          "hero-ctas-started",
        );
      };

      const isHeroVisibleNow = () => {
        const rect = heroSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const syncHeroReveal = () => {
        if (heroVideo.currentTime >= 1.45 || heroVideo.ended) {
          heroSection.classList.add("hero-copy-started");
        }
        if (heroVideo.currentTime >= 2.45 || heroVideo.ended) {
          heroSection.classList.add("hero-ctas-started");
        }

        const revealComplete =
          heroSection.classList.contains("hero-copy-started") &&
          heroSection.classList.contains("hero-ctas-started");
        if (heroVideoHasStarted && !revealComplete && !heroVideo.paused && !heroVideo.ended) {
          heroRevealRaf = trackFrame(syncHeroReveal);
        } else {
          heroRevealRaf = null;
        }
      };

      const startHeroRevealLoop = () => {
        if (!heroRevealRaf) heroRevealRaf = trackFrame(syncHeroReveal);
      };

      const playHeroVideo = () => {
        if (heroVideo.ended) return;
        heroSection.classList.add("hero-sequence-started");
        heroVideoHasStarted = true;
        const playAttempt = heroVideo.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => {});
        }
        startHeroRevealLoop();
      };

      const syncHeroVideo = () => {
        const visibleNow = heroVideoIsVisible && isHeroVisibleNow();
        if (!heroVideoHasStarted && waitForUserScrollBeforeHeroStart) return;
        if (visibleNow || heroVideoHasStarted) playHeroVideo();
      };

      if (heroVideo.readyState >= 1) resetHeroVideo();
      else heroVideo.addEventListener("loadedmetadata", resetHeroVideo, { once: true });
      heroVideo.pause();

      const handleEnded = () => {
        heroVideoHasStarted = true;
        syncHeroReveal();
      };
      const handleTimeUpdate = () => syncHeroReveal();
      heroVideo.addEventListener("ended", handleEnded);
      heroVideo.addEventListener("timeupdate", handleTimeUpdate);
      cleanupCallbacks.push(() => {
        heroVideo.removeEventListener("ended", handleEnded);
        heroVideo.removeEventListener("timeupdate", handleTimeUpdate);
      });

      const startHeroVisibilityObserver = () => {
        const heroVideoObserver = new IntersectionObserver(
          (entries) => {
            heroVideoIsVisible = entries.some((entry) => entry.isIntersecting);
            syncHeroVideo();
          },
          { threshold: 0 },
        );
        observers.add(heroVideoObserver);
        heroVideoObserver.observe(heroSection);
      };

      if (document.readyState === "complete") {
        window.setTimeout(startHeroVisibilityObserver, 100);
      } else {
        window.addEventListener("load", startHeroVisibilityObserver, { once: true });
        cleanupCallbacks.push(() => window.removeEventListener("load", startHeroVisibilityObserver));
      }

      if (waitForUserScrollBeforeHeroStart) {
        const unlockHeroVideoStart = () => {
          waitForUserScrollBeforeHeroStart = false;
          syncHeroVideo();
        };
        window.addEventListener("wheel", unlockHeroVideoStart, { once: true, passive: true });
        window.addEventListener("touchstart", unlockHeroVideoStart, { once: true, passive: true });
        window.addEventListener("keydown", unlockHeroVideoStart, { once: true });
        window.addEventListener("pointerdown", unlockHeroVideoStart, { once: true, passive: true });
        cleanupCallbacks.push(() => {
          window.removeEventListener("wheel", unlockHeroVideoStart);
          window.removeEventListener("touchstart", unlockHeroVideoStart);
          window.removeEventListener("keydown", unlockHeroVideoStart);
          window.removeEventListener("pointerdown", unlockHeroVideoStart);
        });
      }
    }

    const stageScroll = document.querySelector<HTMLElement>("[data-stage-scroll]");
    if (stageScroll) {
      const canvas = stageScroll.querySelector<HTMLCanvasElement>("[data-stage-canvas]");
      const ctx = canvas?.getContext("2d") || null;
      const firstFrameCount = Number(stageScroll.dataset.frameCount || 0);
      const nextFrameCount = Number(stageScroll.dataset.frameCountNext || 0);
      const nextFrameStart = Number(stageScroll.dataset.frameStartNext || 1);
      const frameSets = [
        { count: firstFrameCount, base: "/assets/estagios-scroll/frames/frame_", start: 1 },
        {
          count: Math.max(0, nextFrameCount - nextFrameStart + 1),
          base: "/assets/estagios-scroll/frames-3-5/frame_",
          start: nextFrameStart,
        },
      ].filter((set) => set.count > 0);
      const totalFrames = frameSets.reduce((sum, set) => sum + set.count, 0);
      const stageCopyElements = Array.from(stageScroll.querySelectorAll<HTMLElement>("[data-stage-copy]"));
      const stageStatus = stageScroll.querySelector<HTMLElement>("[data-stage-status]");
      const stageProgress = stageScroll.querySelector<HTMLElement>("[data-stage-progress]");
      const stageLabels = ["Captação", "Viabilidade", "Decisão", "Lançamento", "Acompanhamento"];
      const stageStartFrames = [
        0,
        Math.round(firstFrameCount / 2),
        firstFrameCount,
        firstFrameCount + Math.max(0, 108 - nextFrameStart),
        firstFrameCount + Math.max(0, 192 - nextFrameStart),
      ].filter((frame) => frame < totalFrames);
      const frameCache = new Map<string, HTMLImageElement>();
      let currentFrame = 0;
      let currentStage = -1;
      let stageRaf: number | null = null;

      const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

      const getFrameInfo = (index: number) => {
        let offset = 0;
        for (const set of frameSets) {
          if (index < offset + set.count) {
            const localIndex = index - offset + set.start;
            return {
              key: `${set.base}${localIndex}`,
              src: `${set.base}${String(localIndex).padStart(4, "0")}.jpg`,
            };
          }
          offset += set.count;
        }
        return null;
      };

      const getFrame = (index: number) => {
        const frameInfo = getFrameInfo(clamp(index, 0, totalFrames - 1));
        if (!frameInfo) return null;
        if (!frameCache.has(frameInfo.key)) {
          const image = new Image();
          image.decoding = "async";
          image.src = frameInfo.src;
          frameCache.set(frameInfo.key, image);
        }
        return frameCache.get(frameInfo.key) || null;
      };

      const drawStageFrame = (index: number) => {
        if (!canvas || !ctx || !totalFrames) return;
        const image = getFrame(index);
        if (!image) return;
        if (!image.complete || !image.naturalWidth) {
          image.addEventListener(
            "load",
            () => {
              if (index === currentFrame) drawStageFrame(index);
            },
            { once: true },
          );
          return;
        }

        const canvasRatio = canvas.width / canvas.height;
        const imageRatio = image.naturalWidth / image.naturalHeight;
        let sourceWidth = image.naturalWidth;
        let sourceHeight = image.naturalHeight;
        let sourceX = 0;
        let sourceY = 0;

        if (imageRatio > canvasRatio) {
          sourceWidth = image.naturalHeight * canvasRatio;
          sourceX = (image.naturalWidth - sourceWidth) / 2;
        } else {
          sourceHeight = image.naturalWidth / canvasRatio;
          sourceY = (image.naturalHeight - sourceHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
      };

      const resizeStageCanvas = () => {
        if (!canvas || !ctx) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          drawStageFrame(currentFrame);
        }
      };

      const preloadNearbyFrames = (index: number) => {
        for (let offset = -2; offset <= 6; offset += 1) {
          getFrame(index + offset);
        }
      };

      const getStageForFrame = (index: number) => {
        let stage = 0;
        stageStartFrames.forEach((startFrame, stageIndex) => {
          if (index >= startFrame) stage = stageIndex;
        });
        return Math.min(stage, stageCopyElements.length - 1);
      };

      const setStage = (stage: number) => {
        if (stage === currentStage) return;
        currentStage = stage;
        stageCopyElements.forEach((copy, index) => {
          const isActive = index === stage;
          copy.classList.toggle("is-active", isActive);
          copy.setAttribute("aria-hidden", isActive ? "false" : "true");
        });
        if (stageStatus) stageStatus.textContent = stageLabels[stage] || "";
      };

      const updateStageScroll = () => {
        stageRaf = null;
        if (!totalFrames) return;
        resizeStageCanvas();
        const rect = stageScroll.getBoundingClientRect();
        const scrollDistance = Math.max(1, stageScroll.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / scrollDistance, 0, 1);
        currentFrame = Math.min(totalFrames - 1, Math.round(progress * (totalFrames - 1)));
        preloadNearbyFrames(currentFrame);
        drawStageFrame(currentFrame);
        setStage(getStageForFrame(currentFrame));
        if (stageProgress) stageProgress.style.transform = `scaleX(${progress})`;
      };

      const requestStageUpdate = () => {
        if (!stageRaf) stageRaf = trackFrame(updateStageScroll);
      };

      const firstFrame = getFrame(0);
      firstFrame?.addEventListener("load", () => drawStageFrame(0), { once: true });
      resizeStageCanvas();
      updateStageScroll();
      window.addEventListener("scroll", requestStageUpdate, { passive: true });
      window.addEventListener("resize", requestStageUpdate);
      cleanupCallbacks.push(() => {
        window.removeEventListener("scroll", requestStageUpdate);
        window.removeEventListener("resize", requestStageUpdate);
        if (stageRaf) window.cancelAnimationFrame(stageRaf);
      });
    }

    const restoreLandingAnimationState = () => {
      document.querySelector(".landing-source .hero-video")?.classList.add(
        "hero-sequence-started",
        "hero-copy-started",
        "hero-ctas-started",
      );
      document.querySelectorAll(".landing-source .reveal").forEach((element) => {
        element.classList.add("visible");
      });
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
      originalRequestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));
      });
    };

    const handlePageHide = () => {
      pageIsBeingHidden = true;
    };
    const handlePageShow = (event: PageTransitionEvent) => {
      pageIsBeingHidden = false;
      if (event.persisted) window.setTimeout(restoreLandingAnimationState, 60);
    };
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    cleanupCallbacks.push(() => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    });

    return () => {
      if (pageIsBeingHidden || document.visibilityState === "hidden") return;
      cleanupCallbacks.forEach((cleanup) => cleanup());
      animationFrameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      observers.forEach((observer) => observer.disconnect());
      document.querySelectorAll<HTMLVideoElement>(".landing-source video").forEach((video) => {
        video.pause();
      });
    };
  }, []);
}

function HeroSection() {
  return (
    <section className="hero hero-video" id="inicio">
      <video
        aria-hidden="true"
        className="hero-video-bg"
        muted
        playsInline
        preload="metadata"
        src="/assets/hero/building.mp4"
      />
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-title">A referência em viabilidade financeira para o mercado imobiliário</h1>
            <p className="hero-sub">
              Do terreno ao resultado: decisões mais seguras para incorporadoras, loteadoras e desenvolvedores
              imobiliários.
            </p>
          </div>
          <div className="hero-ctas">
            <a className="btn btn-primary pulse" href="/contato">
              Solicitar demonstração -&gt;
            </a>
            <a className="btn btn-secondary" href="#contato">
              Falar com especialista &#9993;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageScrollSection() {
  return (
    <section
      aria-labelledby="stageScrollTitle"
      className="stage-scroll"
      data-frame-count="171"
      data-frame-count-next="279"
      data-frame-start-next="27"
      data-stage-scroll
      id="ciclo-scroll"
    >
      <div className="stage-scroll-heading container reveal">
        <span className="eyebrow">Ciclo VIABIL</span>
        <h2>Do terreno ao acompanhamento do resultado.</h2>
        <p>
          Cada etapa tem um papel: organizar a oportunidade, testar premissas, decidir, acompanhar e replanejar quando
          o mercado muda.
        </p>
      </div>
      <div className="stage-scroll-sticky">
        <div className="container stage-scroll-grid">
          <div className="stage-scroll-copy" aria-live="polite">
            {stageCopies.map((stage, index) => (
              <article
                aria-hidden={index === 0 ? undefined : "true"}
                className={index === 0 ? "stage-copy is-active" : "stage-copy"}
                data-stage-copy={index}
                key={stage.step}
              >
                <span className="stage-step">{stage.step}</span>
                <h2 id={index === 0 ? "stageScrollTitle" : undefined}>{stage.title}</h2>
                <p>{stage.body}</p>
                <p className="stage-close">{stage.close}</p>
              </article>
            ))}
          </div>

          <div className="stage-scroll-visual">
            <canvas
              aria-label="Animação em scroll dos estágios de captação e viabilidade VIABIL"
              className="stage-scroll-canvas"
              data-stage-canvas
              height={902}
              width={1600}
            />
            <div className="stage-scroll-status" aria-hidden="true" data-stage-status>
              Captação
            </div>
            <div className="stage-scroll-progress" aria-hidden="true">
              <span data-stage-progress />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="clients section-pad" id="clientes">
      <div className="container">
        <div className="clients-headline">
          <span className="eyebrow reveal">Prova de mercado</span>
          <h2 className="reveal stagger-1">Empresas que confiam no padrão VIABIL</h2>
          <p className="reveal stagger-2">
            A metodologia VIABIL circula entre incorporadoras, loteadoras, construtoras, fundos, consultorias e
            parceiros de todo o Brasil.
          </p>
        </div>
        <ClientsMarquee />
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="section-pad resources" id="recursos">
      <div className="container">
        <div className="evolution-panel reveal">
          <div className="evolution-copy">
            <span className="eyebrow">Sempre evoluindo</span>
            <h2>Sempre atualizado com a realidade da incorporação.</h2>
            <p>
              Regras, modelos e práticas de mercado mudam - e o VIABIL acompanha. Cada frente abaixo já vem atualizada
              na plataforma.
            </p>
          </div>
          <div className="evolution-features" aria-label="Frentes sempre atualizadas no VIABIL">
            {resourceItems.map(([title, text]) => (
              <article className="evolution-feature" key={title}>
                <span className="check" aria-hidden="true">
                  <CheckIcon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferentialsSection() {
  return (
    <section className="section-pad diferenciais" id="diferenciais">
      <div className="container">
        <div className="pillars-editorial reveal">
          <div className="pillars-intro">
            <span className="eyebrow">Diferenciais</span>
            <h2>O valor está no método, na flexibilidade e na confiança de mercado.</h2>
            <p>
              O VIABIL não tenta parecer simples escondendo a complexidade. Ele organiza a complexidade imobiliária em
              premissas, cenários, indicadores e relatórios confiáveis.
            </p>
          </div>
          <div className="pillar-lines">
            {pillars.map(([title, text]) => (
              <article className="pillar-line" key={title}>
                <span>{title}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessSegmentsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getStep = () => {
      const firstCard = track.querySelector<HTMLElement>(".business-card");
      if (!firstCard) return 0;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      return firstCard.getBoundingClientRect().width + gap;
    };

    const updateControls = () => {
      const step = getStep();
      const nextMaxIndex = step ? Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step)) : 0;
      const nextIndex = step ? Math.min(nextMaxIndex, Math.max(0, Math.round(track.scrollLeft / step))) : 0;
      setMaxIndex(nextMaxIndex);
      setActiveIndex(nextIndex);
    };

    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>(".business-card");
    if (!firstCard) return;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const step = firstCard.getBoundingClientRect().width + gap;
    const nextIndex = Math.min(maxIndex, Math.max(0, index));
    track.scrollTo({ left: step * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  return (
    <section className="business-types" id="segmentos-atendidos" aria-labelledby="businessTypesTitle">
      <div className="container">
        <div className="business-head">
          <div>
            <span className="eyebrow reveal">Segmentos atendidos</span>
            <h2 className="reveal stagger-1" id="businessTypesTitle">
              Primeiro residencial, casas e loteamentos. Depois, todo o real estate.
            </h2>
          </div>
          <p className="reveal stagger-2">
            O VIABIL nasceu na incorporação imobiliária. A mesma metodologia se adapta a ativos de renda, logística,
            corporativo e estruturas de participação.
          </p>
        </div>

        <div className="business-carousel reveal stagger-3" data-business-carousel>
          <button
            aria-label="Ver segmento anterior"
            className="business-nav prev"
            data-business-prev
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            type="button"
          >
            <ArrowLeftIcon />
          </button>

          <div
            aria-label="Segmentos de negócio atendidos pelo VIABIL"
            className="business-track"
            data-business-track
            ref={trackRef}
            tabIndex={0}
          >
            {segments.map((segment) => (
              <article className="business-card" key={segment.title}>
                <img
                  alt={segment.alt}
                  loading="lazy"
                  referrerPolicy={segment.external ? "no-referrer" : undefined}
                  src={segment.image}
                />
                <span className="business-tag">{segment.tag}</span>
                <div className="business-copy">
                  <h3>{segment.title}</h3>
                  <p>{segment.text}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            aria-label="Ver próximo segmento"
            className="business-nav next"
            data-business-next
            disabled={activeIndex >= maxIndex}
            onClick={() => scrollToIndex(activeIndex + 1)}
            type="button"
          >
            <ArrowRightIcon />
          </button>

          <div className="business-dots" aria-label="Navegação dos segmentos" data-business-dots>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                aria-current={activeIndex === index ? "true" : undefined}
                aria-label={`Ver grupo de segmentos ${index + 1}`}
                className={activeIndex === index ? "business-dot is-active" : "business-dot"}
                key={index}
                onClick={() => scrollToIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NationalPresenceSection() {
  return (
    <section className="clients section-pad" id="presenca-nacional">
      <div className="container">
        <div className="market-map reveal stagger-2">
          <div className="market-map-copy">
            <span className="map-kicker">Presença nacional</span>
            <h3>Conhecimento aplicado em empreendimentos por todo o Brasil.</h3>
            <p>
              Da incorporação residencial aos loteamentos, casas e estruturas de participação, a BDK Solutions acompanha
              clientes em diferentes regiões, traduzindo práticas locais em metodologia, suporte e parametrização dentro
              do VIABIL.
            </p>
            <div className="market-map-points">
              <span>600+ empresas implementadas</span>
              <span>Atuação em todo o Brasil</span>
              <span>Metodologia validada no mercado imobiliário</span>
            </div>
          </div>
          <div className="market-map-visual">
            <img
              alt="Mapa do Brasil com pontos de atuação da BDK Solutions e VIABIL"
              decoding="async"
              loading="lazy"
              src="/assets/elements/map-clean.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = "Solicitar demonstracao VIABIL";
    const body = [
      `Nome: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Empresa: ${data.get("company") || ""}`,
      `Telefone: ${data.get("phone") || ""}`,
      "",
      data.get("message") || "",
    ].join("\n");

    window.location.href = `mailto:comercial@viabil.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="final-cta" id="contato">
      <div className="container">
        <span className="eyebrow reveal">Pronto para começar?</span>
        <h2 className="reveal stagger-1">
          Transforme dados em decisões. <br />
          Impulsione resultados.
        </h2>
        <p className="reveal stagger-2">
          Fale com um especialista VIABIL e descubra como a plataforma pode transformar a inteligência financeira da sua
          incorporadora.
        </p>
        <form className="contact-form reveal stagger-3" id="contactForm" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contactName">Nome</label>
            <input id="contactName" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contactEmail">Email profissional</label>
            <input id="contactEmail" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contactCompany">Empresa</label>
            <input id="contactCompany" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="contact-field">
            <label htmlFor="contactPhone">Telefone</label>
            <input id="contactPhone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="contact-field full">
            <label htmlFor="contactMessage">Como podemos ajudar?</label>
            <textarea id="contactMessage" name="message" rows={4} defaultValue="Quero solicitar uma demonstração do VIABIL." />
          </div>
          <div className="contact-submit">
            <button className="btn btn-white" type="submit">
              Solicitar demonstração -&gt;
            </button>
            <span className="contact-helper">Abriremos seu email com as informações preenchidas.</span>
          </div>
        </form>
      </div>
    </section>
  );
}

export function LandingPage() {
  useHomepageInteractions();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `${landingStyles}\n${landingShellOverrides}` }} />
      <div className="landing-source">
        <HeroSection />
        <section className="proof-strip" id="prova" aria-label="Resultados que sustentam a confiança">
          <ProofMetrics />
        </section>
        <section className="section-pad" id="viabil-plataforma" aria-label="A Plataforma">
          <PlataformaFeatures />
        </section>
        {/*
          Archived for now. To restore, import HomepageCicloViabilSection from
          "@/components/marketing/archived/HomepageCicloViabilSection" and render it here.
        */}
        <ClientsSection />
        <section className="clients section-pad" id="depoimentos">
          <div className="container">
            <DepoimentosSection />
          </div>
        </section>
        <ResourcesSection />
        <DifferentialsSection />
        <NewsletterSignup />
        <BusinessSegmentsSection />
        <section className="section-pad" id="servicos-preview" aria-label="Serviços VIABIL">
          <ServicosShowcase />
        </section>
        <NationalPresenceSection />
        <FinalCtaSection />
      </div>
    </>
  );
}
