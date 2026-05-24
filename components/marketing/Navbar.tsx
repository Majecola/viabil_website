"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useState } from "react";

const navLinks = [
  { href: "/plataforma", label: "Plataforma" },
  { href: "/modulos", label: "Módulos" },
  { href: "/segmentos", label: "Segmentos" },
  { href: "/versoes", label: "Versões" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="site-nav-public">
      <nav className="nav-public-inner" aria-label="Navegação principal">
        <a className="brand-lockup" href="/" onClick={handleLogoClick}>
          <img className="brand-logo-img" src="/assets/viabil-logo.webp" alt="VIABIL" />
        </a>

        <div className="nav-public-links">
          {navLinks.map((link) => (
            <Link
              className={`nav-public-link ${pathname === link.href ? "is-active" : ""}`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-public-cta" href="/contato">
            Solicitar demonstração
          </Link>
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
          <Link
            className={`nav-public-link ${pathname === link.href ? "is-active" : ""}`}
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link className="nav-public-cta" href="/contato" onClick={() => setOpen(false)}>
          Solicitar demonstração
        </Link>
      </div>
    </header>
  );
}
