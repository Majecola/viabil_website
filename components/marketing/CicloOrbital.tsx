"use client";
import { MapPin, Calculator, CheckSquare, BarChart2, TrendingUp } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

/**
 * `relatedIds` is [etapa anterior, etapa seguinte]. Captação points back to
 * Replanejamento on purpose: the point of the section is that the cycle closes.
 */
const cicloData: TimelineItem[] = [
  {
    id: 1,
    title: "Captação",
    content:
      "Organize oportunidades, documentos, mapas e histórico de negociação antes da decisão de compra.",
    icon: MapPin,
    relatedIds: [5, 2],
  },
  {
    id: 2,
    title: "Viabilidade",
    content:
      "Modele VGV, custos, financiamento, permutas, velocidade de vendas, indicadores e cenários.",
    icon: Calculator,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Decisão",
    content:
      "Leve relatórios consistentes para sócios, investidores, comitês e conselhos.",
    icon: CheckSquare,
    relatedIds: [2, 4],
  },
  {
    id: 4,
    title: "Acompanhamento",
    content:
      "Compare planejado, revisado e realizado para agir antes que o resultado se perca.",
    icon: BarChart2,
    relatedIds: [3, 5],
  },
  {
    id: 5,
    title: "Replanejamento",
    content:
      "A partir dos resultados do acompanhamento, simule ajustes de premissas para recuperar ou superar as metas do empreendimento.",
    icon: TrendingUp,
    relatedIds: [4, 1],
  },
];

export function CicloOrbital() {
  return <RadialOrbitalTimeline timelineData={cicloData} />;
}
