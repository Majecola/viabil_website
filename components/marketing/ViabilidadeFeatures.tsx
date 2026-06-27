"use client";

import {
  ChartNoAxesCombined,
  FileSpreadsheet,
  GitCompareArrows,
  SlidersHorizontal,
} from "lucide-react";
import { Features, type FeatureShowcaseItem } from "@/components/marketing/features";

const viabilidadeFeatures: FeatureShowcaseItem[] = [
  {
    id: 1,
    icon: SlidersHorizontal,
    title: "Premissas parametrizáveis",
    description:
      "Estruture curvas de obra e infraestrutura, condições comerciais, financiamentos, permutas e participações conforme a realidade de cada negócio.",
    imageAlt: "Placeholder para futura captura das premissas parametrizáveis no VIABIL",
    previewItems: ["Curvas de obra e vendas", "Modelos de financiamento", "Sócios e investidores"],
  },
  {
    id: 2,
    icon: ChartNoAxesCombined,
    title: "Fluxo de caixa e indicadores",
    description:
      "Analise resultados em tempo real com indicadores como margem, VPL, TIR, MTIR, exposição de caixa, ROI, yield e payback.",
    imageAlt: "Placeholder para futura captura do fluxo de caixa e indicadores no VIABIL",
    previewItems: ["Fluxo sintético e analítico", "VPL, TIR e margem", "Exposição de caixa"],
  },
  {
    id: 3,
    icon: GitCompareArrows,
    title: "Stress-cenários e sensibilidade",
    description:
      "Teste o impacto de mudanças em preço de venda, custo de construção, velocidade de vendas, permuta financeira, juros e outras variáveis críticas.",
    imageAlt: "Placeholder para futura captura da análise de sensibilidade no VIABIL",
    previewItems: ["Preço de venda", "Custo de construção", "Velocidade de vendas"],
  },
  {
    id: 4,
    icon: FileSpreadsheet,
    title: "Relatórios para decisão",
    description:
      "Exporte premissas, fluxos de caixa, previsão de resultados, tabelas de vendas e análises de sensibilidade diretamente para Excel.",
    imageAlt: "Placeholder para futura captura dos relatórios exportáveis no VIABIL",
    previewItems: ["Premissas", "Previsão de resultados", "Análise de sensibilidade"],
  },
];

export function ViabilidadeFeatures() {
  return (
    <Features
      description="O módulo principal do VIABIL organiza a análise econômico-financeira de cada empreendimento. A equipe simula alternativas, compara riscos e leva indicadores consistentes para decisões de Go/No-Go."
      eyebrow="Módulo de Viabilidade"
      features={viabilidadeFeatures}
      heading="Premissas, cenários e indicadores para decisões financeiras críticas."
    />
  );
}
