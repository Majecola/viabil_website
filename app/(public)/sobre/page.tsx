import type { Metadata } from "next";
import Image from "next/image";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Sobre a BDK Solutions",
  alternates: { canonical: "/sobre" },
  description:
    "Conheça a BDK Solutions, empresa por trás do VIABIL, fundada em 1995 por Eli Wolf.",
};

const timeline = [
  {
    year: "1995",
    event: "Fundação da BDK Solutions, com atuação voltada a conhecimento, tecnologia e negócios imobiliários.",
  },
  {
    year: "Mercado",
    event: "O VIABIL nasce dentro do universo da incorporação, absorvendo demandas reais de clientes e práticas do setor.",
  },
  {
    year: "Hoje",
    event: "A plataforma é usada por 600+ empresas e segue evoluindo com suporte, consultoria, treinamento e desenvolvimento dedicado.",
  },
];

const values = [
  ["Dedicação ao cliente", "Proximidade para entender a realidade da empresa e apoiar o uso correto da metodologia."],
  ["Orientação à solução", "Foco em resolver problemas concretos de decisão, operação e governança."],
  ["Responsabilidade", "Cálculos, premissas e suporte tratados com o peso de decisões financeiras críticas."],
  ["Conhecimento", "Tecnologia acompanhada de conteúdo prático do setor imobiliário."],
  ["Excelência", "Melhoria contínua no software, nos serviços e nas práticas internas."],
  ["Crescimento sustentável", "Decisões melhores para empresas, empreendimentos e para a economia do setor."],
];

const manifestoLines = [
  ["Tecnologia com conteúdo", "O VIABIL traduz prática de mercado em recursos, premissas, relatórios e serviços. Sem conteúdo, tecnologia perde eficácia."],
  ["Clientes como parceiros", "A evolução do produto nasce da troca contínua com incorporadoras, loteadoras, consultorias, investidores e equipes usuárias."],
  ["Responsabilidade", "Ser referência em viabilidade financeira exige cuidado com cálculo, método, treinamento e suporte em decisões de alto impacto."],
];

export default function SobrePage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Sobre</span>
            <h1 className="page-title">A empresa por trás do padrão VIABIL.</h1>
            <p className="page-subtitle">
              A BDK Solutions desenvolve, comercializa, treina, implanta e suporta o
              VIABIL em todo o Brasil. O produto é a identidade pública; a BDK é a
              estrutura que sustenta conhecimento, serviço e evolução.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner manifesto-panel">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Manifesto"
              heading="Nascemos dentro do universo da incorporação imobiliária."
              subheading="A BDK absorve demandas e práticas de mercado e traduz esse conhecimento em conceitos, recursos, tecnologia e serviços. É por isso que o VIABIL não soa como um sistema genérico adaptado ao setor."
            />
            <div className="timeline-rail ui-reveal ui-stagger">
              {timeline.map((item) => (
                <article className="timeline-row" key={item.year}>
                  <div className="timeline-index">{item.year}</div>
                  <p>{item.event}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="quote-panel ui-reveal" aria-label="Liderança">
            <Image
              src="/assets/people/eli_wolf.png"
              alt="Eli Wolf, Diretor Executivo e idealizador do VIABIL"
              fill
              className="quote-panel-photo"
              sizes="(max-width: 1024px) 100vw, 38vw"
              priority={false}
            />
            <span className="section-eyebrow">Liderança</span>
            <h2 className="section-title">Eli Wolf</h2>
            <p>
              Diretor Executivo e idealizador do VIABIL. Une formação em Tecnologia e
              Administração de Negócios a mais de 30 anos no mercado imobiliário,
              participando de produto, treinamento, consultoria e eventos do setor.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Propósito"
              heading="Democratizar e padronizar melhores práticas."
              subheading="A missão é contribuir com o desenvolvimento do setor por meio de softwares e serviços que levam metodologia, segurança e eficiência para decisões imobiliárias."
            />
          </div>
          <div className="metric-row ui-reveal ui-stagger">
            <div className="metric-item">
              <span className="metric-value">600+</span>
              <span className="metric-label">empresas implementadas</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">8.000+</span>
              <span className="metric-label">profissionais treinados</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Manifesto aplicado"
            heading="O DNA imobiliário aparece no produto e no serviço."
            subheading="A BDK não trata o VIABIL como software genérico. A empresa absorve práticas do mercado e devolve isso em metodologia, suporte e evolução contínua."
          />
          <div className="plain-list ui-reveal ui-stagger">
            {manifestoLines.map(([label, desc]) => (
              <article className="plain-list-item" key={label}>
                <h3>{label}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Valores"
            heading="O que sustenta a relação com o mercado."
            subheading="Os princípios que guiam como a BDK Solutions atua, evolui e se relaciona com clientes e o mercado."
          />
          <div className="value-grid ui-reveal ui-stagger">
            {values.map(([label, desc]) => (
              <article className="value-item" key={label}>
                <h3>{label}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Conheça a metodologia por trás do VIABIL."
        subheading="A plataforma é produto de décadas de prática no mercado imobiliário, suporte próximo e evolução contínua com clientes parceiros."
      />
    </>
  );
}
