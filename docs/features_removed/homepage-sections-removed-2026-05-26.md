# Homepage sections removed on 2026-05-26

These blocks were removed from the rendered home page after browser review comments.
They are archived here so they can be reused later without searching browser comments.

The original static HTML source is still preserved in `lib/landing-source.ts`.
The home page currently strips these IDs at render time in `components/landing-page.tsx`.

## Removed: `o-que-e`

Original section name: `A PLATAFORMA / O que e o VIABIL?`

Use case if restored:
Introductory platform explainer with proof metrics for modules, segments, versions, and years of evolution.

## Removed: `para-quem`

Archived feature name: `executive-and-analyst-audience-section`

Original section name:
`Para CEOs e Fundadores / Para Analistas e Gestores`

Reusable copy:

- Para CEOs e Fundadores
- Visao estrategica. Decisoes com confianca.
- Cenarios e sensibilidade para decisoes criticas.
- Visao consolidada do portfolio e performance.
- Mais seguranca para investidores e conselhos.

- Para Analistas e Gestores
- Agilidade tecnica. Precisao nos numeros.
- Modelagem financeira completa e parametrizavel.
- Calculos automaticos e consistentes.
- Relatorios executivos e personalizaveis.
- Produtividade e padronizacao para o time.

Suggested future location:
Can be reused on a future `Plataforma`, `Modulos`, or executive value page.

## Removed: `versoes-preview`

Original section name: `VERSOES / Uma linha para cada estagio de maturidade.`

Use case if restored:
Short home page teaser linking to the full versions page.

## Moved: `lite`

Original section name:
`Versao acessivel / VIABIL Lite e a porta de entrada para a cultura VIABIL`

New location:
Moved conceptually to the versions page at `app/(public)/versoes/page.tsx`, where it now appears as `viabil-lite` beside a new similar `viabil-full` block.

## Removed: `sobre-strip`

Archived feature name: `bdk-solutions-manifesto-strip`

Original section name:
`BDK SOLUTIONS / Nascemos dentro do universo da incorporacao imobiliaria.`

Reusable copy:

- A BDK Solutions e a empresa que desenvolve, comercializa, treina, implanta e suporta o VIABIL.
- O produto carrega tecnologia, mas tambem conteudo pratico acumulado em mais de 30 anos de mercado.
- Absorvemos demandas, praticas e mudancas do setor para traduzi-las em conceitos, recursos, relatorios e servicos.
- Tecnologia sem conteudo e pouco eficaz.

Suggested future location:
Can be reused on the `Sobre` page or as a shorter institutional band near the footer.

## Removed Temporarily: `ciclo-scroll`

Archived feature name: `homepage-ciclo-viabil-scroll-section`

Original section name:
`Ciclo VIABIL / Do terreno ao acompanhamento do resultado.`

Current archive location:
`components/marketing/archived/HomepageCicloViabilSection.tsx`

Assets intentionally preserved:

- `public/assets/estagios-scroll/frames/`
- `public/assets/estagios-scroll/frames-3-5/`

Restore instruction:
Import `HomepageCicloViabilSection` from `@/components/marketing/archived/HomepageCicloViabilSection` in `components/marketing/landing-page.tsx` and render `<HomepageCicloViabilSection />` in the archived placeholder before `ClientsSection`.
