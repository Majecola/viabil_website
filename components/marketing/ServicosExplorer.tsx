"use client";

import { useState } from "react";

const SERVICES = [
  {
    id: "suporte",
    tag: "Dia a dia",
    name: "Suporte ao Usuário",
    headline: "Quem atende entende de viabilidade, não só de software.",
    desc: "Atendimento contínuo para dúvidas operacionais, técnicas e conceituais. A equipe tem formação em viabilidade financeira imobiliária e valida estudos junto com o cliente.",
    facts: ["300+ atendimentos por semana", "Dúvidas de uso e de conceito", "Atualizações e novos recursos"],
    stat: { value: "300+", label: "atendimentos/semana" },
  },
  {
    id: "assessoria",
    tag: "Casos reais",
    name: "Assessoria Operacional",
    headline: "Especialistas VIABIL ao lado da sua equipe.",
    desc: "Realização conjunta de estudos, validação de premissas e troca de boas práticas de mercado — útil tanto para operações de alto volume quanto para quem está profissionalizando a análise.",
    facts: ["Realização conjunta de estudos", "Validação de critérios e premissas", "Troca de melhores práticas"],
    stat: { value: "30+", label: "anos de prática de mercado" },
  },
  {
    id: "implantacao",
    tag: "Adoção",
    name: "Implantação e Parametrização",
    headline: "Traduzir a forma de trabalho da empresa para o VIABIL.",
    desc: "Configuração inicial de premissas, indicadores, curvas, plano de contas e estudos-modelo, com testes e homologação para que a empresa adote o padrão VIABIL com segurança.",
    facts: ["Modelo de importação definido", "Conteúdo e parâmetros do cliente", "Testes e homologação"],
    stat: { value: "4", label: "fases estruturadas" },
  },
  {
    id: "customizacoes",
    tag: "Sob medida",
    name: "Customizações",
    headline: "O VIABIL no formato do seu modelo de negócio.",
    desc: "Relatórios, indicadores e extensões funcionais para empresas com demandas específicas — sempre desenvolvidas pela equipe dedicada exclusivamente ao VIABIL.",
    facts: ["Indicadores personalizados", "Relatórios executivos", "Extensões funcionais"],
    stat: { value: "80+", label: "projetos realizados" },
  },
  {
    id: "integracoes",
    tag: "Dados",
    name: "Integrações",
    headline: "O realizado entra sem redigitação.",
    desc: "Caminhos de integração com os principais ERPs do mercado imobiliário, conforme escopo do projeto: layouts de importação, exportações ou acesso estruturado a dados.",
    facts: ["Layouts de importação", "De-para de plano de contas", "Base para o Acompanhamento"],
    stat: { value: "ERP → VIABIL", label: "mesma linguagem financeira" },
  },
];

export function ServicosExplorer() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <div className="sx-grid">
      <div className="sx-tabs" role="tablist" aria-label="Serviços VIABIL" aria-orientation="vertical">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`sx-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls={`sx-panel-${s.id}`}
            className={i === active ? "sx-tab is-active" : "sx-tab"}
            onClick={() => setActive(i)}
          >
            <span className="sx-tab-num">0{i + 1}</span>
            <span className="sx-tab-copy">
              <span className="sx-tab-tag">{s.tag}</span>
              <span className="sx-tab-name">{s.name}</span>
            </span>
            <svg className="sx-tab-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      <div
        key={current.id}
        id={`sx-panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`sx-tab-${current.id}`}
        className="sx-panel"
      >
        <span className="sx-panel-tag">{current.tag}</span>
        <h3 className="sx-panel-title">{current.headline}</h3>
        <p className="sx-panel-desc">{current.desc}</p>
        <ul className="sx-facts">
          {current.facts.map((fact) => (
            <li key={fact}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="m2.5 8.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {fact}
            </li>
          ))}
        </ul>
        <div className="sx-stat">
          <span className="sx-stat-value">{current.stat.value}</span>
          <span className="sx-stat-label">{current.stat.label}</span>
        </div>
      </div>
    </div>
  );
}
