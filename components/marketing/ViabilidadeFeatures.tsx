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
    image: "/assets/produto/v04_obra_curvas.webp",
    imageWidth: 1178,
    imageHeight: 758,
    imageAlt: "Tela de premissas de obra do VIABIL: custo por metro quadrado, curvas de obra por fase e taxa de administração",
    previewItems: ["Curvas de obra e vendas", "Modelos de financiamento", "Sócios e investidores"],
  },
  {
    id: 2,
    icon: ChartNoAxesCombined,
    title: "Fluxo de caixa e indicadores",
    description:
      "Analise resultados em tempo real com indicadores como margem, VPL, TIR, MTIR, exposição de caixa, ROI, yield e payback.",
    image: "/assets/produto/v10_resumo_simulado.webp",
    imageWidth: 1178,
    imageHeight: 758,
    imageAlt: "Estudo simulado no VIABIL: resumo das contas e indicadores como VGV, VPL, exposição máxima e TIR",
    previewItems: ["Fluxo sintético e analítico", "VPL, TIR e margem", "Exposição de caixa"],
  },
  {
    id: 3,
    icon: GitCompareArrows,
    title: "Stress-cenários e sensibilidade",
    description:
      "Teste o impacto de mudanças em preço de venda, custo de construção, velocidade de vendas, permuta financeira, juros e outras variáveis críticas.",
    image: "/assets/produto/v16_sensibilidade.webp",
    imageWidth: 1300,
    imageHeight: 500,
    imageAlt: "Análise de sensibilidade exportada pelo VIABIL: VPL sobre receita cruzando variações de preço de venda e custo de obra",
    previewItems: ["Preço de venda", "Custo de construção", "Velocidade de vendas"],
  },
  {
    id: 4,
    icon: FileSpreadsheet,
    title: "Relatórios para decisão",
    description:
      "Exporte premissas, fluxos de caixa, previsão de resultados, tabelas de vendas e análises de sensibilidade diretamente para Excel.",
    image: "/assets/produto/v12_relatorios.webp",
    imageWidth: 1178,
    imageHeight: 758,
    imageAlt: "Central de relatórios do VIABIL: premissas, previsão de resultados, fluxos de caixa e análise de sensibilidade",
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
