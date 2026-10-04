"use client";

import Image from "next/image";
import { useId, useState } from "react";

/**
 * Segments follow the owner's order (residencial, casas, loteamentos first) and the
 * source-document structure: o desafio → por que viabilidade importa → com o VIABIL.
 */
const SEGMENTS = [
  {
    image: "/assets/segmentos/incorporacao-residencial.webp",
    alt: "Edifício residencial de incorporação ao entardecer",
    tag: "Foco principal",
    title: "Incorporação residencial",
    challenge: "Ciclos longos, capital intensivo e decisões de terreno que definem o resultado anos antes das chaves.",
    why: "Preço, velocidade de vendas, custo de obra e funding mudam a exposição de caixa e a TIR a cada premissa.",
    viabil: "Estudos padronizados do terreno ao lançamento, com SFH, crédito associativo e MCMV, e previsto × realizado até a entrega.",
    metrics: ["VGV", "TIR", "Exposição máxima", "Margem"],
  },
  {
    image: "/assets/segmentos/casas-condominios.webp",
    alt: "Condomínio residencial horizontal com portaria e casas",
    tag: "Foco principal",
    title: "Casas e condomínios",
    challenge: "Produtos horizontais com fases, tipologias e infraestrutura própria, vendidos em ritmos diferentes.",
    why: "O custo por unidade e a absorção de cada fase decidem quando o caixa vira.",
    viabil: "Faseamento, tabelas de venda por tipologia e curvas de obra e infraestrutura por fase, com o mesmo padrão de indicadores.",
    metrics: ["Faseamento", "Custo por unidade", "Velocidade de vendas", "Payback"],
  },
  {
    image: "/assets/segmentos/loteamentos-urbanizacao.webp",
    alt: "Loteamento urbanizado com ruas, lotes e áreas verdes ao pôr do sol",
    tag: "Foco principal",
    title: "Loteamentos e urbanização",
    challenge: "Aprovações longas, infraestrutura pesada antes da venda e recebíveis que se estendem por anos.",
    why: "Permutas, carteira própria e inadimplência pesam tanto quanto o preço do lote.",
    viabil: "Modelagem de permutas física e financeira, infraestrutura, carteira de recebíveis e securitização, com sensibilidade nas variáveis-chave.",
    metrics: ["Permuta financeira", "Carteira de recebíveis", "Infraestrutura", "VPL"],
  },
  {
    image: "/assets/segmentos/corporativo-locacao.webp",
    alt: "Edifício corporativo de escritórios para locação",
    tag: "Renda e corporativo",
    title: "Corporativo, logística e renda",
    challenge: "Galpões, BTS, lajes e ativos de renda dependem de contratos, vacância e estratégia de saída.",
    why: "Yield, cap-rate e prazo de locação definem o valor do ativo tanto quanto o custo de construção.",
    viabil: "Estudos de locação com renda por m², vacância e saída, e stress-cenário de yield e cap-rate.",
    metrics: ["Yield", "Cap-rate", "Vacância", "Renda / m²"],
  },
];

const ALSO = ["MCMV", "Shopping centers", "Fundos e private equity", "Originação e consultoria", "Proprietários de área"];

export function SegmentosSection() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <section className="v1-band" id="segmentos">
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

        <div className="v1-sx v1-rise v1-rise-1">
          {SEGMENTS.map((s, i) => {
            const open = i === active;
            const panelId = `${baseId}-seg-${i}`;
            return (
              <article
                className={`v1-sx-panel ${open ? "is-open" : ""}`}
                key={s.title}
                onMouseEnter={() => setActive(i)}
              >
                <Image
                  alt={s.alt}
                  className="v1-sx-img"
                  fill
                  sizes="(max-width: 1023px) 100vw, 760px"
                  src={s.image}
                />
                <span className="v1-sx-shade" aria-hidden="true" />

                {/* Collapsed state: the whole panel is the control. */}
                <button
                  aria-controls={panelId}
                  aria-expanded={open}
                  className="v1-sx-toggle"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  type="button"
                >
                  <span className="v1-sx-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v1-sx-vtitle">{s.title}</span>
                </button>

                <div className="v1-sx-body" id={panelId}>
                  <span className="v1-sx-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <dl className="v1-sx-story">
                    <div>
                      <dt>O desafio</dt>
                      <dd>{s.challenge}</dd>
                    </div>
                    <div>
                      <dt>Por que viabilidade</dt>
                      <dd>{s.why}</dd>
                    </div>
                    <div>
                      <dt>Com o VIABIL</dt>
                      <dd>{s.viabil}</dd>
                    </div>
                  </dl>
                  <ul className="v1-sx-metrics" aria-label="Indicadores que mais pesam no segmento">
                    {s.metrics.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <p className="v1-sx-also v1-rise v1-rise-2">
          <span>Também atendemos</span>
          {ALSO.map((a) => (
            <em key={a}>{a}</em>
          ))}
        </p>
      </div>
    </section>
  );
}
