const stageCopies = [
  {
    step: "01 - Captacao",
    title: "Captacao: antes do projeto, existe a oportunidade.",
    body: "Encontrar o terreno certo nao e sorte. E inteligencia geografica, analise de mercado e precisao na leitura do contexto urbano. O VIABIL mapeia oportunidades antes que o mercado as perceba - cruzando dados de localizacao, potencial construtivo e viabilidade comercial em uma unica inteligencia de captacao.",
    close: "O empreendimento comeca aqui.",
  },
  {
    step: "02 - Viabilidade",
    title: "Os numeros precisam contar a historia certa.",
    body: "TIR, VPL, payback, sensibilidade, cenarios otimistas e conservadores - o VIABIL transforma dados brutos em clareza financeira. Cada variavel do empreendimento e simulada, testada e confrontada com a realidade do mercado antes de qualquer compromisso.",
    close: "Decisoes seguras comecam com simulacoes honestas.",
  },
  {
    step: "03 - Decisao",
    title: "Go ou no-go. Com conviccao.",
    body: "A decisao mais cara do mercado imobiliario nao e a errada - e a certa tomada tarde demais. O VIABIL entrega o respaldo analitico para que incorporadoras, fundos e gestores avancem com velocidade e seguranca - ou recuem antes que o custo seja irreversivel.",
    close: "Decidir bem e uma vantagem competitiva.",
  },
  {
    step: "04 - Lancamento",
    title: "O mercado nao espera. A preparacao, sim.",
    body: "Um lancamento bem-sucedido nao e resultado de timing - e resultado de estrutura. O VIABIL garante que o empreendimento chega ao mercado com projecoes de receita calibradas, cronograma de vendas validado e performance comercial monitorada desde o primeiro dia.",
    close: "O lancamento e so o comeco do que foi planejado.",
  },
  {
    step: "05 - Acompanhamento",
    title: "O que nao e monitorado nao pode ser gerenciado.",
    body: "Da obra ao fluxo de caixa, do cronograma fisico a performance de vendas - o VIABIL mantem o empreendimento sob visibilidade total durante toda a sua execucao. Gestao de portfolio, KPIs em tempo real e alertas de desvio antes que o problema se torne irreversivel.",
    close: "Controle nao e burocracia. E inteligencia em movimento.",
  },
];

export function HomepageCicloViabilSection() {
  return (
    <section
      aria-labelledby="stageScrollTitle"
      className="stage-scroll"
      data-frame-count="171"
      data-frame-count-next="279"
      data-frame-start-next="27"
      data-stage-scroll
      id="ciclo-scroll"
    >
      <div className="stage-scroll-heading container reveal">
        <span className="eyebrow">Ciclo VIABIL</span>
        <h2>Do terreno ao acompanhamento do resultado.</h2>
        <p>
          Cada etapa tem um papel: organizar a oportunidade, testar premissas, decidir, acompanhar e replanejar quando
          o mercado muda.
        </p>
      </div>
      <div className="stage-scroll-sticky">
        <div className="container stage-scroll-grid">
          <div className="stage-scroll-copy" aria-live="polite">
            {stageCopies.map((stage, index) => (
              <article
                aria-hidden={index === 0 ? undefined : "true"}
                className={index === 0 ? "stage-copy is-active" : "stage-copy"}
                data-stage-copy={index}
                key={stage.step}
              >
                <span className="stage-step">{stage.step}</span>
                <h2 id={index === 0 ? "stageScrollTitle" : undefined}>{stage.title}</h2>
                <p>{stage.body}</p>
                <p className="stage-close">{stage.close}</p>
              </article>
            ))}
          </div>

          <div className="stage-scroll-visual">
            <canvas
              aria-label="Animacao em scroll dos estagios de captacao e viabilidade VIABIL"
              className="stage-scroll-canvas"
              data-stage-canvas
              height={902}
              width={1600}
            />
            <div className="stage-scroll-status" aria-hidden="true" data-stage-status>
              Captacao
            </div>
            <div className="stage-scroll-progress" aria-hidden="true">
              <span data-stage-progress />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
