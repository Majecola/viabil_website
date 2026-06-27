import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/CTABand";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { ServicosExplorer } from "@/components/marketing/ServicosExplorer";
import { ImplantacaoStepper } from "@/components/marketing/ImplantacaoStepper";
import { ServicosStats } from "@/components/marketing/ServicosStats";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Suporte especializado, assessoria operacional, implantação, parametrização, customizações e integrações para clientes VIABIL em todo o Brasil.",
  alternates: { canonical: "/servicos" },
};

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
        <div className="section-inner">
          <SectionHeader
            align="left"
            eyebrow="Full-service"
            heading="Serviço faz parte do valor do VIABIL."
            subheading="O software carrega metodologia, mas a adoção real acontece quando suporte, parametrização e consultoria ajudam a empresa a transformar processo. Navegue pelos serviços:"
          />
          <div className="ui-reveal">
            <ServicosExplorer />
          </div>
        </div>
      </section>

      <section className="section-block white compact">
        <div className="section-inner">
          <SectionHeader
            align="left"
            eyebrow="Conhecimento aplicado"
            heading="Suporte, implantação e treinamento falam a língua do mercado."
            subheading="Os consultores VIABIL ajudam em dúvidas conceituais, critérios de estudo, parametrização e práticas que surgem em incorporações, casas, loteamentos e demais segmentos."
          />
          <div className="ui-reveal">
            <ServicosStats />
          </div>
        </div>
      </section>

      <section className="section-block surface">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Implantação"
            heading="Da contratação ao uso seguro em estudos reais."
            subheading="Parametrizar é traduzir a forma de trabalho da empresa para o VIABIL. O caminho é estruturado em quatro fases acompanhadas pela equipe."
          />
          <ImplantacaoStepper />
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
