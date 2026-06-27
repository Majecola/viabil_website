import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/marketing/CTABand";
import { CicloOrbital } from "@/components/marketing/CicloOrbital";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Plataforma",
  alternates: { canonical: "/plataforma" },
  description:
    "Conheça o VIABIL: a referência em viabilidade econômico-financeira para o ciclo completo do empreendimento imobiliário.",
};

const cycle = [
  {
    step: "Captação",
    desc: "Organize oportunidades, documentos, mapas e histórico de negociação antes da decisão de compra.",
  },
  {
    step: "Viabilidade",
    desc: "Modele VGV, custos, financiamento, permutas, velocidade de vendas, indicadores e cenários.",
  },
  {
    step: "Decisão",
    desc: "Leve relatórios consistentes para sócios, investidores, comitês e conselhos.",
  },
  {
    step: "Acompanhamento",
    desc: "Compare planejado, revisado e realizado para agir antes que o resultado se perca.",
  },
  {
    step: "Replanejamento",
    desc: "Simule novas ações quando obra, vendas, custos ou funding mudam ao longo do ciclo.",
  },
];

const pillars = [
  {
    label: "Valor agregado",
    desc: "Cada estudo passa a sustentar uma decisão de negócio, não apenas um cálculo isolado.",
  },
  {
    label: "Flexibilidade",
    desc: "A plataforma se adapta a segmentos, estruturas societárias, modelos financeiros e regiões.",
  },
  {
    label: "Parametrização",
    desc: "Premissas, indicadores, relatórios e modelos seguem a forma de trabalho da empresa.",
  },
  {
    label: "Confiança",
    desc: "Décadas de uso no mercado reduzem discussões sobre fórmulas e elevam o debate sobre premissas.",
  },
];

const decisionDepth = [
  {
    label: "Do ativo ao portfólio",
    desc: "O estudo individual precisa conversar com a necessidade de caixa, retorno esperado e exposição dos acionistas no tempo.",
  },
  {
    label: "Premissas vivas",
    desc: "Preço, custo, velocidade de vendas, financiamento e permutas mudam. A decisão precisa ser recalculável sem perder histórico.",
  },
  {
    label: "Discussão executiva",
    desc: "Relatórios e indicadores padronizados reduzem ruído técnico e ajudam comitês a discutir risco, retorno e alternativa de ação.",
  },
];

export default function PlataformaPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Plataforma</span>
            <h1 className="page-title">Inteligência financeira para todo o ciclo imobiliário.</h1>
            <p className="page-subtitle">
              O VIABIL nasceu dentro da incorporação imobiliária para simular cenários,
              analisar indicadores e acompanhar a rentabilidade do negócio do Go/No-Go ao
              previsto x realizado.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/contato">
                Solicitar demonstração
              </Link>
              <Link className="button-secondary" href="/modulos">
                Ver módulos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner split-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="O que é"
              heading="Uma referência de mercado, não uma planilha mais bonita."
              subheading="O VIABIL concentra conhecimento prático do setor, modelos financeiros testados e governança para decisões de alto impacto em incorporação residencial, casas, loteamentos e outros segmentos."
            />
            <div className="pill-row" aria-label="Diferenciais centrais">
              <span className="info-pill">DNA imobiliário</span>
              <span className="info-pill">Padrão entre parceiros</span>
              <span className="info-pill">Cenários vivos</span>
              <span className="info-pill">Governança de premissas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Ciclo VIABIL"
            heading="Do terreno ao resultado, com a mesma visão gerencial."
            subheading="A análise não para na aprovação. O ciclo continua quando as premissas mudam, a obra avança e a empresa precisa corrigir rota."
          />
          <CicloOrbital />
          <div className="timeline-rail plataforma-cycle-rail ui-reveal ui-stagger">
            {cycle.map((item, index) => (
              <article className="timeline-row" key={item.step}>
                <div className="timeline-index">{String(index + 1).padStart(2, "0")} · {item.step}</div>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Planilhas x VIABIL"
            heading="A discussão sai da fórmula e volta para a decisão."
            subheading="Em negócios imobiliários, a fragilidade está no controle de premissas, versões, indicadores e histórico. O VIABIL reduz esse ruído."
          />
          <div className="comparison-grid ui-reveal ui-stagger">
            <div className="comparison-column">
              <h3>Quando a análise fica em planilhas</h3>
              {[
                ["Governança", "Arquivos circulam sem rastreabilidade clara."],
                ["Método", "Cada equipe pode calcular de um jeito."],
                ["Cenários", "Testar mudanças exige refazer muito trabalho."],
                ["Portfólio", "A visão consolidada depende de recortes manuais."],
              ].map(([label, copy]) => (
                <div className="comparison-line" key={label}>
                  <span className="comparison-label">{label}</span>
                  <span className="comparison-copy">{copy}</span>
                </div>
              ))}
            </div>
            <div className="comparison-column strong">
              <h3>Quando a análise roda no VIABIL</h3>
              {[
                ["Governança", "Premissas, versões e usuários ficam organizados."],
                ["Método", "A empresa trabalha com cálculo testado e padrão de mercado."],
                ["Cenários", "Stress-cenários e simulações mantêm a decisão viva."],
                ["Portfólio", "Projetos e oportunidades alimentam uma visão executiva."],
              ].map(([label, copy]) => (
                <div className="comparison-line" key={label}>
                  <span className="comparison-label">{label}</span>
                  <span className="comparison-copy">{copy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Pilares"
            heading="Valor, flexibilidade, parametrização e confiança."
            subheading="Esses quatro princípios precisam aparecer em toda a experiência porque explicam por que o VIABIL é diferente de soluções genéricas."
          />
          <div className="plain-list ui-reveal ui-stagger">
            {pillars.map((pillar) => (
              <article className="plain-list-item" key={pillar.label}>
                <h3>{pillar.label}</h3>
                <p>{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Decisão contínua"
            heading="As decisões não são mais estáticas."
            subheading="O VIABIL ajuda a empresa a avaliar a saúde dos empreendimentos, a necessidade de funding e o retorno esperado conforme o projeto evolui."
          />
          <div className="plain-list ui-reveal ui-stagger">
            {decisionDepth.map((item) => (
              <article className="plain-list-item" key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner">
          <div className="ui-reveal">
            <SectionHeader
              eyebrow="Análise de sensibilidade"
              heading="Como preço, custo e velocidade de vendas mudam o resultado."
              subheading="O VIABIL gera automaticamente o mapa de sensibilidade do estudo: uma matriz que mostra como os indicadores reagem a variações nas premissas críticas. Exemplo real abaixo, gerado pela plataforma."
            />
          </div>
          <div className="ui-reveal">
            <div className="sensitivity-matrix">
              <div className="sensitivity-row header">
                <span className="sensitivity-cell label">Variável / Indicador</span>
                <span className="sensitivity-cell">TIR a.a.</span>
                <span className="sensitivity-cell">VPL</span>
                <span className="sensitivity-cell">Margem</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Preço +10%</span>
                <span className="sensitivity-cell up">37,6%</span>
                <span className="sensitivity-cell up">R$ 5.820.000</span>
                <span className="sensitivity-cell up">40,2%</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Cenário base</span>
                <span className="sensitivity-cell base">28,4%</span>
                <span className="sensitivity-cell base">R$ 3.140.000</span>
                <span className="sensitivity-cell base">34,7%</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Preço −10%</span>
                <span className="sensitivity-cell dn">19,2%</span>
                <span className="sensitivity-cell dn">R$ 460.000</span>
                <span className="sensitivity-cell dn">28,8%</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Custo −10%</span>
                <span className="sensitivity-cell up">31,8%</span>
                <span className="sensitivity-cell up">R$ 4.080.000</span>
                <span className="sensitivity-cell up">37,4%</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Custo +10%</span>
                <span className="sensitivity-cell dn">24,6%</span>
                <span className="sensitivity-cell dn">R$ 2.200.000</span>
                <span className="sensitivity-cell dn">31,8%</span>
              </div>
              <div className="sensitivity-row">
                <span className="sensitivity-cell label">Velocidade −20%</span>
                <span className="sensitivity-cell dn">22,1%</span>
                <span className="sensitivity-cell dn">R$ 1.740.000</span>
                <span className="sensitivity-cell dn">33,9%</span>
              </div>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: "var(--gray-dark)" }}>
              Exemplo gerado pelo VIABIL para incorporação residencial SFH. VGV R$ 24,8M, 40 unidades, 24 meses de obra.{" "}
              <a
                href="/assets/relatorios/analise_sensibilidade_SFH.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--green-primary)", fontWeight: 700 }}
              >
                Abrir exemplo completo ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Veja o ciclo completo em uma demonstração."
        subheading="A melhor conversa começa com o seu tipo de empreendimento, suas premissas e as decisões que sua equipe precisa sustentar."
      />
    </>
  );
}
