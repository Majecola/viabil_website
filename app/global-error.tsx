"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[VIABIL] Critical error:", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: "'Outfit', 'Helvetica Neue', Arial, sans-serif",
          background: "#FAFAFA",
          color: "#4A4A4A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(10,75,53,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A4B35"
              strokeWidth="2"
            >
              <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>

          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#0A4B35",
              margin: "0 0 16px",
            }}
          >
            Erro crítico
          </p>
          <h1
            style={{
              fontSize: "clamp(26px, 5vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#0A4B35",
              margin: "0 0 16px",
            }}
          >
            A aplicação encontrou um problema.
          </h1>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "#4A4A4A",
              margin: "0 0 36px",
            }}
          >
            Ocorreu um erro crítico na aplicação. Recarregue a página ou entre
            em contato com nossa equipe se o problema persistir.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                background: "#0A4B35",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Recarregar
            </button>
            <a
              href="/"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                background: "transparent",
                color: "#0A4B35",
                fontSize: "14px",
                fontWeight: 700,
                border: "1.5px solid rgba(10,75,53,.30)",
                cursor: "pointer",
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              Página inicial
            </a>
          </div>

          {error.digest && (
            <p
              style={{
                marginTop: "32px",
                fontSize: "12px",
                color: "#4A4A4A",
                opacity: 0.45,
                fontFamily: "monospace",
              }}
            >
              {error.digest}
            </p>
          )}

          <div
            style={{
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(10,75,53,.10)",
            }}
          >
            <img
              src="/assets/logos/viabil-logo.webp"
              alt="VIABIL"
              style={{ height: "22px", opacity: 0.5 }}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
