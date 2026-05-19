"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[VIABIL] Runtime error:", error);
  }, [error]);

  return (
    <div className="site-shell">
      <main
        id="conteudo"
        className="site-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          background: "var(--off-white)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(220,38,38,.08)",
              border: "1px solid rgba(220,38,38,.20)",
              borderRadius: "8px",
              padding: "6px 14px",
              marginBottom: "28px",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4m0 4h.01" />
            </svg>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#DC2626",
              }}
            >
              Erro inesperado
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "var(--green-primary)",
              margin: "0 0 16px",
            }}
          >
            Algo deu errado.
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--gray-dark)",
              margin: "0 0 8px",
            }}
          >
            Ocorreu um erro inesperado ao carregar esta página. Nossa equipe foi
            notificada automaticamente.
          </p>
          <p style={{ fontSize: "15px", color: "var(--gray-dark)", opacity: 0.7, margin: "0 0 36px" }}>
            Tente novamente em alguns instantes ou volte à página inicial.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              className="button-primary"
              onClick={reset}
              type="button"
            >
              Tentar novamente
            </button>
            <Link className="button-secondary" href="/">
              Ir para a página inicial
            </Link>
          </div>

          {error.digest && (
            <p
              style={{
                marginTop: "32px",
                fontSize: "12px",
                color: "var(--gray-dark)",
                opacity: 0.5,
                fontFamily: "monospace",
              }}
            >
              Código de referência: {error.digest}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
