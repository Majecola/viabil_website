const STEPS = [
  {
    title: "Modelo de importação",
    desc: "Layouts, plano de contas e de-para definidos para que dados externos entrem com consistência.",
  },
  {
    title: "Conteúdo e parâmetros",
    desc: "Premissas, curvas, indicadores, estudos-modelo e relatórios alinhados à realidade do cliente.",
  },
  {
    title: "Testes e homologação",
    desc: "Rodadas de validação com casos reais antes de consolidar o uso pela equipe.",
  },
  {
    title: "Adoção assistida",
    desc: "Apoio a dúvidas operacionais, conceituais e ajustes finos após a implantação.",
  },
];

export function ImplantacaoStepper() {
  return (
    <div className="imp-wrap ui-reveal">
      <ol className="imp-steps">
        {STEPS.map((step, i) => (
          <li key={step.title} className="imp-step" style={{ ["--i" as string]: i }}>
            <span className="imp-node" aria-hidden="true">
              <span className="imp-node-num">{i + 1}</span>
            </span>
            <h3 className="imp-title">{step.title}</h3>
            <p className="imp-desc">{step.desc}</p>
          </li>
        ))}
      </ol>
      <p className="imp-note">
        Implantação típica concluída entre 19 e 28 semanas, conforme a complexidade da operação.
      </p>
    </div>
  );
}
