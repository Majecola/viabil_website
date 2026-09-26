import { CicloOrbital } from "@/components/marketing/CicloOrbital";

const RAIL = [
  {
    step: "Captação",
    title: "A oportunidade entra organizada.",
    desc: "Terrenos, documentos, dados urbanísticos e histórico de negociação em um só lugar.",
  },
  {
    step: "Viabilidade",
    title: "As premissas viram números.",
    desc: "VGV, custos, financiamento, permutas, velocidade de vendas, cenários e indicadores.",
  },
  {
    step: "Decisão",
    title: "Go ou no-go, com respaldo.",
    desc: "Relatórios consistentes para comitês, sócios, conselhos e investidores.",
  },
  {
    step: "Acompanhamento",
    title: "Não basta acompanhar. Precisa agir.",
    desc: "Previsto, revisado e realizado lado a lado, com alertas antes do desvio custar caro.",
  },
  {
    step: "Replanejamento",
    title: "O estudo continua vivo.",
    desc: "Simule ajustes de premissas para recuperar — ou superar — as metas do empreendimento.",
  },
];

export function CicloSection() {
  return (
    <section className="v1-band is-white" id="ciclo">
      <div className="v1-shell">
        <div className="v1-head is-center v1-rise">
          <span className="v1-kicker">Ciclo VIABIL</span>
          <h2 className="v1-title is-long">
            Do terreno ao resultado, com a mesma visão gerencial.
          </h2>
          <p className="v1-lede">
            A análise não para na aprovação. Clique em cada etapa do ciclo para ver o que O VIABIL
            organiza — e por que a decisão continua depois que a obra começa.
          </p>
        </div>

        <div className="v1-orbit-stage v1-rise v1-rise-1">
          <CicloOrbital />
        </div>

        <div className="v1-orbit-rail v1-rise v1-rise-2">
          {RAIL.map((item, index) => (
            <article key={item.step}>
              <h3>
                <span>
                  {String(index + 1).padStart(2, "0")} · {item.step}
                </span>
                {item.title}
              </h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
