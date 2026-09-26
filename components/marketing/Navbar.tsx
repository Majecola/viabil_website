"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";

/**
 * v1 is a single-page landing: the nav scrolls the homepage instead of
 * routing. Each entry maps to a section id rendered by HomeLanding.
 */
const navLinks = [
  { id: "plataforma", label: "Plataforma" },
  { id: "ciclo", label: "Ciclo" },
  { id: "modulos", label: "Módulos" },
  { id: "segmentos", label: "Segmentos" },
  { id: "implantacao", label: "Implantação" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently under the nav.
  useEffect(() => {
    if (!isHome) {
      setActiveId("");
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const inView = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.set(entry.target.id, entry.intersectionRatio);
          else inView.delete(entry.target.id);
        });

        // Nothing tracked is on screen (hero, evolução, depoimentos, contato):
        // drop the highlight rather than leaving a stale one lit.
        const best = [...inView.entries()].sort((a, b) => b[1] - a[1])[0];
        setActiveId(best ? best[0] : "");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const scrollToId = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      setOpen(false);
      if (!isHome) return; // let Next route to /#id

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
    },
    [isHome],
  );

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`site-nav-public ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-public-inner" aria-label="Navegação principal">
        <Link className="brand-lockup" href="/" onClick={handleLogoClick}>
          <img className="brand-logo-img" src="/assets/logos/viabil-logo.webp" alt="VIABIL" />
        </Link>

        <div className="nav-public-links">
          {navLinks.map((link) => (
            <a
              aria-current={activeId === link.id ? "true" : undefined}
              className={`nav-public-link ${activeId === link.id ? "is-active" : ""}`}
              href={`/#${link.id}`}
              key={link.id}
              onClick={(event) => scrollToId(event, link.id)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-public-cta"
            href="/#contato"
            onClick={(event) => scrollToId(event, "contato")}
          >
            Solicitar demonstração
          </a>
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu-panel ${open ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <a
            className={`nav-public-link ${activeId === link.id ? "is-active" : ""}`}
            href={`/#${link.id}`}
            key={link.id}
            onClick={(event) => scrollToId(event, link.id)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="nav-public-cta"
          href="/#contato"
          onClick={(event) => scrollToId(event, "contato")}
        >
          Solicitar demonstração
        </a>
      </div>
    </header>
  );
}
