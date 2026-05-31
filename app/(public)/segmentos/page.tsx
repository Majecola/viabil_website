import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Segmentos | VIABIL",
  description:
    "O VIABIL atende incorporação residencial, casas, loteamentos e outros segmentos do mercado imobiliário com modelos parametrizáveis.",
};

const primarySegments = [
  {
    name: "Incorporação residencial",
    challenge:
      "Ciclos longos, terrenos caros, aprovações, funding, variação de custos e risco comercial tornam cada decisão de aquisição ou lançamento crítica.",
    value:
      "O VIABIL organiza VGV, velocidade de vendas, permutas, custos, financiamento, indicadores e acompanhamento em uma visão que serve ao analista e ao comitê executivo.",
    details: ["Aquisição de terreno", "Lançamento e tabela de vendas", "Previsto x realizado", "Consolidação de SPEs"],
  },
  {
    name: "Casas e condomínios horizontais",
    challenge:
      "Produtos horizontais exigem controle de fases, infraestrutura, personalizações, absorção comercial e custos por tipologia.",
    value:
      "A parametrização permite simular modelos de casas, sobrados, condomínios fechados e operações com diferentes ritmos de venda e entrega.",
    details: ["Fases de lançamento", "Custos por tipologia", "Absorção de unidades", "Estratégias de preço"],
  },
  {
    name: "Loteamentos e urbanização",
    challenge:
      "Licenças, infraestrutura, parceria com terrenistas e longos ciclos de capital próprio exigem visão financeira disciplinada.",
    value:
      "O VIABIL contempla permutas, infraestrutura, tabelas simultâneas, financiamento direto, securitização e acompanhamento do plano aprovado.",
    details: ["Permuta física e financeira", "Infraestrutura e terraplanagem", "Carteira e securitização", "Análise por fase"],
  },
];

const secondarySegments = [
  {
    name: "Corporativo e locação",
    desc: "Galpões logísticos, BTS, lajes, malls e ativos com renda, cap rate, vacância e contratos.",
  },
  {
    name: "Investimentos e participações",
    desc: "Sócios, fundos, investidores, permutantes e estruturas com retorno individualizado.",
  },
  {
    name: "Originação e desenvolvimento",
    desc: "Consultorias, áreas de novos negócios, imobiliárias e proprietários de áreas em análise.",
  },
];

const segmentMethod = [
  {
    label: "Incorporação residencial",
    desc: "O estudo combina aquisição do terreno, VGV, tabela de vendas, curva de obra, financiamento, SPEs e acompanhamento depois do lançamento.",
  },
  {
    label: "Loteamentos",
    desc: "A análise precisa suportar aprovação longa, infraestrutura pesada, parceria com terrenistas, carteira própria e fases de comercialização.",
  },
  {
    label: "Ativos de renda",
    desc: "Quando o retorno vem de locação ou saída de investimento, entram vacância, cap-rate, contratos, yield e estrutura de participação.",
  },
];

export default function SegmentosPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Segmentos</span>
            <h1 className="page-title">Começa no residencial. Avança para todo o real estate.</h1>
            <p className="page-subtitle">
              A prioridade do VIABIL é incorporação residencial, casas e loteamentos.
              A mesma base metodológica também atende renda, participações, originação,
              consultorias e proprietários de áreas.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Foco principal"
            heading="Incorporação, casas e loteamentos vêm primeiro."
            subheading="A estrutura segue a orientação do proprietário: apresentar os segmentos residenciais como o núcleo do posicionamento e tratar os demais como suportados."
          />
          <div className="segment-grid ui-reveal">
            {primarySegments.map((segment, index) => (
              <article
                className={`segment-feature ${index === 0 ? "" : "secondary"}`}
                key={segment.name}
              >
                <span className="segment-tag">{index === 0 ? "Principal" : "Residencial"}</span>
                <h2>{segment.name}</h2>
                <p><strong>O desafio:</strong> {segment.challenge}</p>
                <p><strong>Como o VIABIL ajuda:</strong> {segment.value}</p>
                <div className="segment-details">
                  {segment.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Abrangência"
            heading="Outros segmentos sem roubar o foco."
            subheading="Corporativo, logística, shopping, fundos, consultorias e proprietários de áreas continuam importantes. A página apenas não deve abrir com eles."
          />
          <div className="secondary-segments ui-reveal">
            {secondarySegments.map((segment) => (
              <article className="secondary-segment" key={segment.name}>
                <h3>{segment.name}</h3>
                <p>{segment.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner split-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Parametrização"
              heading="A flexibilidade está nas premissas, não em promessas genéricas."
              subheading="Cada segmento muda o peso das variáveis: preço, custo, infraestrutura, funding, permuta, aluguel, cap rate, velocidade de vendas, distrato, inadimplência e saída do investimento."
            />
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Método por segmento"
            heading="O desafio muda, mas a linguagem financeira permanece."
            subheading="A página agora deixa claro por que cada segmento exige premissas próprias, sem tirar o foco do residencial, casas e loteamentos."
          />
          <div className="plain-list ui-reveal">
            {segmentMethod.map((item) => (
              <article className="plain-list-item" key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Mostre seu tipo de empreendimento na demonstração."
        subheading="A conversa fica mais objetiva quando parte do segmento, do ciclo e das variáveis que realmente mudam a decisão."
      />
    </>
  );
}
