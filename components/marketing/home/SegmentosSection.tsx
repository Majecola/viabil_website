"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SEGMENTS = [
  {
    image: "/assets/segmentos/incorporacao-residencial.png",
    alt: "Empreendimento de incorporação residencial ao entardecer",
    title: "Incorporação residencial",
    text: "Aquisição, lançamento, funding e acompanhamento para o principal ciclo de atuação do VIABIL.",
  },
  {
    image: "/assets/segmentos/casas-condominios.png",
    alt: "Condomínio residencial horizontal com casas e portaria",
    title: "Casas e condomínios",
    text: "Fases, tipologias, infraestrutura, absorção comercial e custos por unidade em produtos horizontais.",
  },
  {
    image: "/assets/segmentos/loteamentos-urbanizacao.png",
    alt: "Loteamento urbanizado com ruas, lotes e áreas verdes",
    title: "Loteamentos e urbanização",
    text: "Ciclos longos de aprovação, infraestrutura, permutas e carteira exigem disciplina de caixa desde a origem.",
  },
  {
    image: "/assets/segmentos/corporativo-locacao.png",
    alt: "Edifício corporativo de escritórios para locação",
    title: "Corporativo, logística e renda",
    text: "Galpões, BTS, lajes e ativos de renda pedem vacância, cap-rate, contratos e estratégia de saída.",
  },
];

export function SegmentosSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".v1-seg-card");
    const step = card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="v1-band is-surface" id="segmentos">
      <div className="v1-shell">
        <div className="v1-head is-split v1-rise">
          <div>
            <span className="v1-kicker">Segmentos</span>
            <h2 className="v1-title">
              Primeiro residencial, casas e loteamentos. Depois, todo o real estate.
            </h2>
          </div>
          <p className="v1-lede">
            O VIABIL nasceu dentro da incorporação imobiliária. A mesma metodologia se adapta a
            ativos de renda, logística, corporativo e estruturas de participação.
          </p>
        </div>

        <div className="v1-rise v1-rise-1">
          <div
            aria-label="Segmentos atendidos pelo VIABIL"
            className="v1-seg-track"
            ref={trackRef}
            tabIndex={0}
          >
            {SEGMENTS.map((segment) => (
              <article className="v1-seg-card" key={segment.title}>
                <img alt={segment.alt} loading="lazy" src={segment.image} />
                <div className="v1-seg-body">
                  <h3>{segment.title}</h3>
                  <p>{segment.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="v1-seg-controls" hidden={atStart && atEnd}>
            <button
              aria-label="Ver segmento anterior"
              className="v1-seg-nav"
              disabled={atStart}
              onClick={() => nudge(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              aria-label="Ver próximo segmento"
              className="v1-seg-nav"
              disabled={atEnd}
              onClick={() => nudge(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
