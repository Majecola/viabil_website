import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Serviços | VIABIL",
  description:
    "Suporte ao usuário, assessoria operacional, implantação, parametrização, customizações e integrações para clientes VIABIL.",
};

const services = [
  {
    name: "Suporte ao Usuário",
    tag: "Dia a dia",
    desc: "Atendimento para dúvidas operacionais, técnicas e conceituais. A equipe entende viabilidade financeira imobiliária, não apenas funcionamento de software.",
    facts: ["300+ atendimentos semanais", "Dúvidas de uso e conceito", "Atualizações e novos recursos"],
  },
  {
    name: "Assessoria Operacional",
    tag: "Casos reais",
    desc: "Especialistas VIABIL trabalham junto com a equipe do cliente em estudos, validação de premissas e discussão de boas práticas de mercado.",
    facts: ["Realização conjunta de estudos", "Validação de critérios", "Troca de melhores práticas"],
  },
  {
    name: "Implantação e Parametrização",
    tag: "Adoção",
    desc: "Configuração inicial de premissas, indicadores, curvas, plano de contas, estudos-modelo e homologação para que a empresa adote o padrão VIABIL.",
    facts: ["Modelo de importação", "Geração de conteúdo", "Testes e homologação"],
  },
  {
    name: "Customizações",
    tag: "Sob medida",
    desc: "Relatórios, indicadores e extensões funcionais para empresas com demandas específicas, sempre desenvolvidas pela equipe dedicada ao VIABIL.",
    facts: ["80+ projetos realizados", "Indicadores personalizados", "Relatórios executivos"],
  },
  {
    name: "Integrações",
    tag: "Dados",
    desc: "Caminhos de integração com os principais ERPs do mercado imobiliário, conforme escopo do projeto, por layouts, exportações ou acesso estruturado a dados.",
    facts: ["Layouts de importação", "De-para de plano de contas", "Base para acompanhamento"],
  },
];

const implementationSteps = [
  ["1. Modelo de importação", "Definição de layouts, plano de contas e de-para para que dados externos entrem com consistência."],
  ["2. Conteúdo e parâmetros", "Configuração de premissas, curvas, indicadores, estudos-modelo e relatórios alinhados à realidade do cliente."],
  ["3. Testes e homologação", "Rodadas de validação com casos reais antes de consolidar o uso pela equipe."],
  ["4. Adoção assistida", "Apoio inicial para dúvidas operacionais, conceituais e ajustes finos após a implantação."],
];

export default function ServicosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-copy-block ui-reveal">
            <span className="eyebrow">Serviços</span>
            <h1 className="page-title">Tecnologia sem conteúdo é pouco eficaz.</h1>
            <p className="page-subtitle">
              A BDK Solutions opera full-service: desenvolvimento, suporte, treinamento,
              consultoria, implantação, customização e integração para que o VIABIL se
              encaixe na realidade de cada cliente.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Full-service"
            heading="Serviço faz parte do valor do VIABIL."
            subheading="O software carrega metodologia, mas a adoção real acontece quando suporte, parametrização e consultoria ajudam a empresa a transformar processo."
          />
          <div className="service-flow ui-reveal">
            {services.map((service) => (
              <article className="service-row" key={service.name}>
                <div>
                  <span className="service-tag">{service.tag}</span>
                  <h2>{service.name}</h2>
                  <p>{service.desc}</p>
                </div>
                <ul className="service-facts" aria-label={`Destaques de ${service.name}`}>
                  {service.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid">
          <div className="ui-reveal">
            <SectionHeader
              align="left"
              eyebrow="Conhecimento aplicado"
              heading="Suporte, implantação e treinamento falam a língua do mercado."
              subheading="Os consultores VIABIL ajudam em dúvidas conceituais, critérios de estudo, parametrização e práticas que surgem em incorporações, casas, loteamentos e demais segmentos."
            />
            <div className="metric-row">
              <div className="metric-item">
                <span className="metric-value">300+</span>
                <span className="metric-label">atendimentos por semana</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">120+</span>
                <span className="metric-label">treinamentos por ano</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Implantação"
            heading="Parametrizar é traduzir a forma de trabalho da empresa para o VIABIL."
            subheading="A implantação foi detalhada para explicar o caminho entre contratar o sistema e usar a metodologia com segurança em estudos reais."
          />
          <div className="timeline-rail ui-reveal">
            {implementationSteps.map(([label, desc]) => (
              <article className="timeline-row" key={label}>
                <div className="timeline-index">{label}</div>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block white">
        <div className="section-inner split-grid top">
          <SectionHeader
            align="left"
            eyebrow="Tabela de vendas"
            heading="A parametrização define o padrão de análise da empresa."
            subheading="Na implantação, o VIABIL é configurado com as premissas, plano de contas, curvas, indicadores e tabelas de venda do cliente. O resultado é um modelo-padrão alinhado à realidade da operação — não um template genérico."
          />
          <div className="report-sample ui-reveal" style={{ border: "1px solid var(--gray-light)", borderRadius: 18 }}>
            <div className="report-sample-header">
              <span className="report-sample-name">Tabela de Vendas</span>
              <span className="report-sample-tag">Parametrização</span>
            </div>
            <div className="report-kpi-list">
              <div className="report-kpi-row">
                <span className="report-kpi-label">Tipologia</span>
                <span className="report-kpi-value neutral">Apto 2 dorms — 62m²</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">Preço de tabela</span>
                <span className="report-kpi-value">R$ 384.400</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">Entrada (30% ato)</span>
                <span className="report-kpi-value neutral">R$ 115.320</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">Parcelas mensais (24x)</span>
                <span className="report-kpi-value neutral">R$ 3.846</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">Chaves (50% saldo)</span>
                <span className="report-kpi-value neutral">R$ 134.540</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">INCC (correção)</span>
                <span className="report-kpi-value neutral">100% INCC obra</span>
              </div>
              <div className="report-kpi-row">
                <span className="report-kpi-label">Velocidade estimada</span>
                <span className="report-kpi-value neutral">4 und/mês</span>
              </div>
            </div>
            <a
              className="report-sample-link"
              href="/assets/relatorios/Tabelas de Vendas.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M8 1v9M4 6l4 4 4-4M2 12v2h12v-2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ver exemplo de tabela real
            </a>
          </div>
        </div>
      </section>

      <CTABand
        heading="Precisa parametrizar o VIABIL para sua operação?"
        subheading="A conversa comercial pode mapear versão, implantação, customizações e integrações sem prometer escopo antes da análise técnica."
      />
    </>
  );
}
