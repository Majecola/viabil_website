"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #E6E8EB", position: "sticky", top: 0, zIndex: 100 }}>
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 22, color: "#0A4B35", letterSpacing: "-0.5px" }}>VIABIL</span>
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>by BDK Solutions</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: pathname === link.href ? "#0A4B35" : "#374151",
                borderBottom: pathname === link.href ? "2px solid #0A4B35" : "2px solid transparent",
                paddingBottom: 2,
                transition: "color 0.15s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contato"
            style={{
              background: "#0A4B35",
              color: "#fff",
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Solicitar demonstração →
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="mobile-hamburger"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #E6E8EB", padding: "16px 24px 24px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                color: pathname === link.href ? "#0A4B35" : "#374151",
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contato"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: 16,
              background: "#0A4B35",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 18px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Solicitar demonstração →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
