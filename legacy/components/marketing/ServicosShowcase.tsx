"use client";

import { useEffect, useRef, useState } from "react";

function IconSuporte() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12a7 7 0 0 1 14 0" />
      <rect x="3.4" y="12" width="3.6" height="6" rx="1.6" />
      <rect x="17" y="12" width="3.6" height="6" rx="1.6" />
      <path d="M19 18v.6a2.4 2.4 0 0 1-2.4 2.4H13" />
    </svg>
  );
}
function IconAssessoria() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8.2" cy="8.4" r="3" />
      <path d="M2.8 19.4c0-3.4 2.3-5.6 5.4-5.6 1.5 0 2.8.5 3.7 1.4" />
      <circle cx="16.6" cy="9.8" r="2.5" />
      <path d="M12.9 18.6c.4-2.7 2-4.2 4.4-4.2 2.3 0 3.9 1.6 4 4.4" />
    </svg>
  );
}
function IconImplantacao() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M7 20v-9l5-3.4L17 11v9" />
      <path d="M10.4 20v-4.4h3.2V20" />
      <path d="M12 3.2v4.4" />
      <path d="m9.6 5.6 2.4-2.4 2.4 2.4" />
    </svg>
  );
}
function IconCustomizacoes() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h12M20 17h0" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  );
}
function IconIntegracoes() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 7V4M15 7V4" />
      <path d="M7 7h10v4a5 5 0 0 1-10 0V7Z" />
      <path d="M12 16v2.6a2.4 2.4 0 0 1-2.4 2.4H7" />
    </svg>
  );
}

const SERVICES = [
  {
    num: "01",
    title: "Suporte ao Usuário",
    desc: "Especialistas em viabilidade imobiliária respondem dúvidas de uso e de conceito — não é um helpdesk genérico.",
    fact: "300+ atendimentos por semana",
    Icon: IconSuporte,
  },
  {
    num: "02",
    title: "Assessoria Operacional",
    desc: "Consultores VIABIL trabalham ao lado da sua equipe nos estudos e validações mais complexos.",
    fact: "Casos reais, lado a lado",
    Icon: IconAssessoria,
  },
  {
    num: "03",
    title: "Implantação",
    desc: "Premissas, curvas, plano de contas e estudos-modelo configurados para adoção real — não apenas instalação.",
    fact: "Método estruturado em 4 fases",
    Icon: IconImplantacao,
  },
  {
    num: "04",
    title: "Customizações",
    desc: "Relatórios, indicadores e extensões sob medida, desenvolvidos pela equipe dedicada ao VIABIL.",
    fact: "80+ projetos entregues",
    Icon: IconCustomizacoes,
  },
  {
    num: "05",
    title: "Integrações",
    desc: "Conexão com os principais ERPs do mercado imobiliário por layouts, exportações ou acesso estruturado a dados.",
    fact: "Dados sem redigitação",
    Icon: IconIntegracoes,
  },
];

const ROTATE_MS = 5000;

export function ServicosShowcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % SERVICES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [auto, paused]);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  return (
    <div className="sv-wrap">
      <div className="sv-head">
        <div>
          <span className="eyebrow">Serviços</span>
          <h2 className="sv-title">Mais do que software</h2>
          <p className="sv-sub">
            Suporte, assessoria e implantação para que sua equipe extraia o máximo do VIABIL.
          </p>
        </div>
        <a className="button-secondary" href="/servicos">
          Conhecer serviços
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div
        className="sv-rail"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {SERVICES.map(({ num, title, desc, fact, Icon }, i) => {
          const isActive = i === active;
          return (
            <article key={num} className={isActive ? "sv-item is-active" : "sv-item"}>
              <button
                type="button"
                className="sv-btn"
                onClick={() => select(i)}
                aria-expanded={isActive}
                aria-controls={`sv-body-${num}`}
              >
                <span className="sv-top">
                  <span className="sv-icon"><Icon /></span>
                  <span className="sv-num">{num}</span>
                </span>
                <span className="sv-name">{title}</span>
                <span id={`sv-body-${num}`} className="sv-body">
                  <span className="sv-body-inner">
                    <span className="sv-desc">{desc}</span>
                    <span className="sv-fact">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                        <path d="m2.5 8.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {fact}
                    </span>
                  </span>
                </span>
              </button>
              {isActive && auto ? (
                <span className="sv-progress" aria-hidden="true">
                  <span key={active} className="sv-progress-fill" />
                </span>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
