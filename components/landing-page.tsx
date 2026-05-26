"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  landingBodyHtml,
  landingScript,
  landingStyles,
} from "@/lib/landing-source";
import { DepoimentosSection } from "@/components/marketing/DepoimentosSection";
import { ClientsMarquee } from "@/components/marketing/ClientsMarquee";

const landingShellOverrides = `
  .landing-source .site-nav,
  .landing-source .whatsapp-fab,
  .landing-source > footer {
    display: none !important;
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

  .landing-source .hero-video .container {
    min-height: calc(100dvh - var(--nav-height));
    display: flex;
    align-items: center;
    padding-top: clamp(24px, 4vh, 42px);
    padding-bottom: clamp(28px, 5vh, 52px);
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

  @media (min-width: 769px) {
    .landing-source .hero-content {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    .landing-source .hero-video .container {
      align-items: flex-start;
      padding-top: 32px;
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
    }

    .landing-source .hero-video .hero-title {
      font-size: clamp(33px, 9vw, 42px);
      line-height: 1.08;
      max-width: min(100%, 315px);
      overflow-wrap: break-word;
      text-wrap: auto;
    }

    .landing-source .hero-video .hero-sub {
      max-width: min(100%, 315px);
      font-size: 15px;
      line-height: 1.55;
      overflow-wrap: break-word;
    }

    .landing-source .hero-copy,
    .landing-source .hero-video .hero-ctas {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

export function LandingPage() {
  const homepageBodyHtml = landingBodyHtml.replace(
    /href="https:\/\/wa\.me\/PLACEHOLDER\?text=Ol%C3%A1%2C\+gostaria\+de\+solicitar\+uma\+demonstra%C3%A7%C3%A3o\+do\+VIABIL\."/g,
    'href="/contato"',
  );

  const depoimentosRootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  const depoimentosMountRef = useRef<HTMLElement | null>(null);
  const depoimentosGenRef = useRef(0);

  const clientsRootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  const clientsMountRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cleanupCallbacks: Array<() => void> = [];
    const timeoutIds = new Set<number>();
    const animationFrameIds = new Set<number>();
    const observers = new Set<IntersectionObserver>();

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalSetTimeout = window.setTimeout;
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const OriginalIntersectionObserver = window.IntersectionObserver;
    let pageIsBeingHidden = false;

    EventTarget.prototype.addEventListener = function patchedAddEventListener(
      type,
      listener,
      options,
    ) {
      originalAddEventListener.call(this, type, listener, options);

      const target = this;
      const shouldTrack =
        target instanceof Element &&
        (target.classList.contains("landing-source") || Boolean(target.closest(".landing-source")));

      if (listener && shouldTrack) {
        cleanupCallbacks.push(() => {
          target.removeEventListener(type, listener, options);
        });
      }
    };

    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      const timeoutId = originalSetTimeout(() => {
        timeoutIds.delete(timeoutId);
        if (typeof handler === "function") {
          handler(...args);
          return;
        }
        new Function(String(handler))();
      }, timeout);

      timeoutIds.add(timeoutId);
      return timeoutId;
    }) as typeof window.setTimeout;

    window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
      const frameId = originalRequestAnimationFrame((time) => {
        animationFrameIds.delete(frameId);
        callback(time);
      });

      animationFrameIds.add(frameId);
      return frameId;
    }) as typeof window.requestAnimationFrame;

    if (OriginalIntersectionObserver) {
      window.IntersectionObserver = class TrackedIntersectionObserver extends OriginalIntersectionObserver {
        constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
          super(callback, options);
          observers.add(this);
        }

        disconnect() {
          observers.delete(this);
          super.disconnect();
        }
      };
    }

    try {
      const runLandingScript = new Function(landingScript);
      runLandingScript();
    } catch (error) {
      console.warn("Landing animation script did not complete", error);
    }

    const gen = ++depoimentosGenRef.current;

    const clientsMount = document.getElementById("viabil-clients-root") as HTMLElement | null;
    if (clientsMount) {
      if (clientsMountRef.current === clientsMount && clientsRootRef.current) {
        clientsRootRef.current.render(<ClientsMarquee />);
      } else {
        clientsRootRef.current = createRoot(clientsMount);
        clientsMountRef.current = clientsMount;
        clientsRootRef.current.render(<ClientsMarquee />);
      }
    }

    const depoimentosMount = document.getElementById("viabil-depoimentos-root") as HTMLElement | null;
    if (depoimentosMount) {
      if (depoimentosMountRef.current === depoimentosMount && depoimentosRootRef.current) {
        depoimentosRootRef.current.render(<DepoimentosSection />);
      } else {
        depoimentosRootRef.current = createRoot(depoimentosMount);
        depoimentosMountRef.current = depoimentosMount;
        depoimentosRootRef.current.render(<DepoimentosSection />);
      }
    }

    const heroSection = document.querySelector(".landing-source .hero-video");
    const restoreLandingAnimationState = () => {
      const restoredHeroSection = document.querySelector(".landing-source .hero-video");
      restoredHeroSection?.classList.add(
        "hero-sequence-started",
        "hero-copy-started",
        "hero-ctas-started",
      );

      // The hero uses a CSS @keyframe animation (heroLoadReveal) that replays on BFCache
      // restore. Lock elements at their final state with !important inline styles so the
      // animation cannot override them. These stay for the life of this DOM tree (cleared
      // on full unmount / SPA re-navigation to the homepage).
      document.querySelectorAll<HTMLElement>(
        ".landing-source .hero-copy, .landing-source .hero-video .hero-ctas",
      ).forEach((el) => {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("filter", "none", "important");
        el.style.setProperty("animation", "none", "important");
      });

      document.querySelectorAll(".landing-source .reveal").forEach((element) => {
        element.classList.add("visible");
      });

      document.querySelectorAll<HTMLVideoElement>(".landing-source video").forEach((video) => {
        if (video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      });

      // Force scroll-stopper canvas to redraw at the current scroll position.
      // A second dispatch one frame later ensures it fires after layout is settled.
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

    const handlePageShow = (event: Event) => {
      pageIsBeingHidden = false;
      const pageTransitionEvent = event as PageTransitionEvent;
      const navigationEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      if (pageTransitionEvent.persisted || navigationEntry?.type === "back_forward") {
        clientsRootRef.current?.render(<ClientsMarquee />);
        depoimentosRootRef.current?.render(<DepoimentosSection />);
        originalSetTimeout(restoreLandingAnimationState, 60);
      }
    };

    originalAddEventListener.call(window, "pagehide", handlePageHide);
    originalAddEventListener.call(window, "pageshow", handlePageShow);

    const initialNavigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (initialNavigationEntry?.type === "back_forward") {
      originalSetTimeout(restoreLandingAnimationState, 60);
    }

    const copyFallback = originalSetTimeout(() => {
      heroSection?.classList.add("hero-copy-started");
    }, 700);
    const ctaFallback = originalSetTimeout(() => {
      heroSection?.classList.add("hero-ctas-started");
    }, 1300);

    return () => {
      if (pageIsBeingHidden || document.visibilityState === "hidden") {
        return;
      }

      const capturedGen = gen;
      const depoimentosRootToUnmount = depoimentosRootRef.current;
      const clientsRootToUnmount = clientsRootRef.current;

      originalSetTimeout(() => {
        if (depoimentosGenRef.current === capturedGen) {
          depoimentosRootToUnmount?.unmount();
          depoimentosRootRef.current = null;
          depoimentosMountRef.current = null;
          clientsRootToUnmount?.unmount();
          clientsRootRef.current = null;
          clientsMountRef.current = null;
        }
      }, 0);

      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      window.clearTimeout(copyFallback);
      window.clearTimeout(ctaFallback);

      EventTarget.prototype.addEventListener = originalAddEventListener;
      window.setTimeout = originalSetTimeout;
      window.requestAnimationFrame = originalRequestAnimationFrame;
      window.IntersectionObserver = OriginalIntersectionObserver;

      cleanupCallbacks.forEach((cleanup) => cleanup());
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      animationFrameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      observers.forEach((observer) => observer.disconnect());

      document.querySelectorAll<HTMLVideoElement>(".landing-source video").forEach((video) => {
        video.pause();
      });
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `${landingStyles}\n${landingShellOverrides}` }} />
      <div className="landing-source" dangerouslySetInnerHTML={{ __html: homepageBodyHtml }} />
    </>
  );
}
