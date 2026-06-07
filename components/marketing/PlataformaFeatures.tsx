"use client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  GitBranch,
  Landmark,
  Layers3,
  LineChart,
  MapPinned,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";

const lifecycleSteps = [
  { label: "Captação", icon: MapPinned },
  { label: "Viabilidade", icon: BarChart3 },
  { label: "Decisão", icon: Gauge },
  { label: "Acompanhamento", icon: LineChart },
  { label: "Replanejamento", icon: GitBranch },
];

const platformPillars = [
  {
    title: "Valor agregado",
    description:
      "Transforma premissas, fluxo de caixa e indicadores em uma base objetiva para aprovar, ajustar ou recusar oportunidades.",
    icon: Landmark,
  },
  {
    title: "Flexibilidade",
    description:
      "Atende incorporação residencial, casas, loteamentos e outros modelos com estruturas financeiras adaptáveis.",
    icon: Layers3,
  },
  {
    title: "Parametrização",
    description:
      "Premissas, curvas, indicadores, relatórios e benchmarks seguem a realidade operacional de cada empresa.",
    icon: SlidersHorizontal,
  },
  {
    title: "Confiança",
    description:
      "Metodologia testada no mercado, cálculos protegidos e uma base comum para comitês, sócios e investidores.",
    icon: ShieldCheck,
  },
];

const proofStats = [
  { value: "600+", label: "empresas implementadas" },
  { value: "8.000+", label: "profissionais treinados" },
  { value: "25+", label: "anos de conhecimento aplicado" },
];

const dashboardRows = [
  { label: "Margem", value: "34,7%", tone: "strong" },
  { label: "TIR", value: "28,4% a.a.", tone: "strong" },
  { label: "VPL", value: "R$ 3,1M", tone: "neutral" },
  { label: "Exposição máx.", value: "R$ 4,8M", tone: "neutral" },
];

const scenarioBars = [48, 62, 44, 76, 58, 88, 70];

const platformStyles = `
  .viabil-platform-section {
    padding: 64px 0;
  }

  .viabil-platform-section .vp-container {
    width: min(100% - 32px, 1180px);
    margin-inline: auto;
  }

  .viabil-platform-section .p-4 { padding: 1rem; }
  .viabil-platform-section .p-5 { padding: 1.25rem; }
  .viabil-platform-section .p-6 { padding: 1.5rem; }
  .viabil-platform-section .px-3 { padding-inline: .75rem; }
  .viabil-platform-section .px-5 { padding-inline: 1.25rem; }
  .viabil-platform-section .py-2 { padding-block: .5rem; }
  .viabil-platform-section .pt-4 { padding-top: 1rem; }
  .viabil-platform-section .pb-4 { padding-bottom: 1rem; }
  .viabil-platform-section .pl-4 { padding-left: 1rem; }
  .viabil-platform-section .mt-1 { margin-top: .25rem; }
  .viabil-platform-section .mt-2 { margin-top: .5rem; }
  .viabil-platform-section .mt-3 { margin-top: .75rem; }
  .viabil-platform-section .mt-4 { margin-top: 1rem; }
  .viabil-platform-section .mt-5 { margin-top: 1.25rem; }
  .viabil-platform-section .mt-7 { margin-top: 1.75rem; }
  .viabil-platform-section .mt-8 { margin-top: 2rem; }
  .viabil-platform-section .mt-10 { margin-top: 2.5rem; }

  .viabil-platform-section .platform-cta {
    position: relative;
    isolation: isolate;
    color: var(--white);
    background: linear-gradient(135deg, var(--green-primary), #073d2c);
    box-shadow: 0 12px 28px rgba(10, 75, 53, .18), inset 0 1px 0 rgba(255,255,255,.18);
    transition: transform 180ms var(--ease-out), background 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
  }

  .viabil-platform-section .platform-cta::after {
    content: "";
    position: absolute;
    inset: 1px;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,.2), rgba(255,255,255,0));
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .viabil-platform-section .platform-cta:hover {
      background: linear-gradient(135deg, var(--green-secondary), var(--green-primary));
      box-shadow: 0 16px 34px rgba(10, 75, 53, .22), inset 0 1px 0 rgba(255,255,255,.2);
    }
  }

  @media (min-width: 640px) {
    .viabil-platform-section .sm\\:p-5 { padding: 1.25rem; }
  }

  @media (min-width: 768px) {
    .viabil-platform-section {
      padding: 96px 0;
    }
  }
`;

function PlatformDashboard() {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border bg-white p-4 shadow-[0_28px_70px_rgba(10,75,53,0.14)]"
      style={{ borderColor: "rgba(10,75,53,0.12)" }}
      aria-label="Visual demonstrativo da plataforma VIABIL"
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "rgba(95,191,159,0.3)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-10 h-52 w-52 rounded-full blur-3xl"
        style={{ background: "rgba(10,75,53,0.14)" }}
      />

      <div className="relative rounded-2xl border bg-[var(--off-white)] p-4 sm:p-5" style={{ borderColor: "rgba(10,75,53,0.1)" }}>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4" style={{ borderColor: "rgba(10,75,53,0.1)" }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "var(--green-secondary)" }}>
              Estudo integrado
            </span>
            <h3 className="mt-2 text-xl font-extrabold leading-tight text-[var(--black)]">
              Residencial Jardim Sul
            </h3>
            <p className="mt-1 text-sm text-[var(--gray-dark)]">
              Cenário base com sensibilidade e acompanhamento
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
            style={{ background: "rgba(22,163,74,0.1)", color: "var(--success-green)" }}
          >
            <CheckCircle2 className="size-4" strokeWidth={2} />
            dentro do critério
          </span>
        </div>

        <div className="grid gap-3 pt-4 sm:grid-cols-2">
          {dashboardRows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border bg-white p-4"
              style={{ borderColor: "rgba(10,75,53,0.1)" }}
            >
              <span className="block text-xs font-semibold text-[var(--gray-dark)]">
                {row.label}
              </span>
              <strong
                className="mt-1 block text-2xl font-extrabold leading-none tabular-nums"
                style={{ color: row.tone === "strong" ? "var(--green-primary)" : "var(--black)" }}
              >
                {row.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border bg-white p-4" style={{ borderColor: "rgba(10,75,53,0.1)" }}>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--green-primary)" }}>
              Stress-cenário
            </span>
            <span className="text-xs font-semibold text-[var(--gray-dark)]">
              preço, custo, velocidade, juros
            </span>
          </div>
          <div className="mt-5 flex h-28 items-end gap-2">
            {scenarioBars.map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-md"
                style={{
                  height: `${height}%`,
                  background:
                    index === 5
                      ? "linear-gradient(180deg, var(--green-secondary), var(--green-primary))"
                      : "rgba(10,75,53,0.14)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-2 text-sm font-semibold text-[var(--ink-soft)] sm:grid-cols-3">
          <span className="rounded-lg bg-white px-3 py-2">Lite</span>
          <span className="rounded-lg bg-white px-3 py-2">Full</span>
          <span className="rounded-lg bg-white px-3 py-2">Cloud</span>
        </div>
      </div>
    </div>
  );
}

export function PlataformaFeatures() {
  return (
    <>
      <style>{platformStyles}</style>
      <section
        className="viabil-platform-section relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 14% 10%, rgba(95,191,159,0.18), transparent 30%), radial-gradient(circle at 86% 8%, rgba(30,58,138,0.08), transparent 26%), var(--surface)",
        }}
      >
      <div className="vp-container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: "var(--green-secondary)" }}>
              A Plataforma
            </span>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] text-[var(--black)] md:text-5xl">
              Inteligência financeira para decidir, acompanhar e corrigir a rota.
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[var(--gray-dark)]">
              O VIABIL organiza o ciclo imobiliário em um ambiente único: terrenos, estudos de viabilidade,
              cenários, indicadores, relatórios e acompanhamento do planejado versus realizado.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {proofStats.map((stat) => (
                <div key={stat.label} className="border-l pl-4" style={{ borderColor: "rgba(10,75,53,0.18)" }}>
                  <strong className="block text-3xl font-extrabold leading-none tabular-nums text-[var(--green-primary)]">
                    {stat.value}
                  </strong>
                  <span className="mt-2 block text-sm font-semibold leading-snug text-[var(--gray-dark)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2" aria-label="Etapas atendidas pela plataforma">
              {lifecycleSteps.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-sm font-bold text-[var(--green-primary)]"
                  style={{ borderColor: "rgba(10,75,53,0.12)" }}
                >
                  <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            <a
              href="/plataforma"
              className="platform-cta mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--green-primary)] px-5 text-sm font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--green-secondary)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[rgba(19,136,94,0.34)] active:scale-[0.98]"
            >
              Conhecer a plataforma completa
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <PlatformDashboard />
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {platformPillars.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(10,75,53,0.1)]"
              style={{ borderColor: "rgba(10,75,53,0.12)" }}
            >
              <div
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(10,75,53,0.08)", color: "var(--green-primary)" }}
              >
                <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold leading-tight text-[var(--black)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--gray-dark)]">
                {description}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
