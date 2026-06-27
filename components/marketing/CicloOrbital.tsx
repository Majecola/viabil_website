"use client";
import { MapPin, Calculator, CheckSquare, BarChart2, TrendingUp } from "lucide-react";
import RadialOrbitalTimeline from "@/components/marketing/radial-orbital-timeline";
import type { TimelineItem } from "@/components/marketing/radial-orbital-timeline";

const cicloData: TimelineItem[] = [
  {
    id: 1,
    title: "Captação",
    content:
      "Organize oportunidades, documentos, mapas e histórico de negociação antes da decisão de compra.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Viabilidade",
    content:
      "Modele VGV, custos, financiamento, permutas, velocidade de vendas, indicadores e cenários.",
    icon: Calculator,
  },
  {
    id: 3,
    title: "Decisão",
    content:
      "Leve relatórios consistentes para sócios, investidores, comitês e conselhos.",
    icon: CheckSquare,
  },
  {
    id: 4,
    title: "Acompanhamento",
    content:
      "Compare planejado, revisado e realizado para agir antes que o resultado se perca.",
    icon: BarChart2,
  },
  {
    id: 5,
    title: "Replanejamento",
    content:
      "A partir dos resultados do acompanhamento, simule ajustes de premissas para recuperar ou superar as metas do empreendimento.",
    icon: TrendingUp,
  },
];

export function CicloOrbital() {
  return <RadialOrbitalTimeline timelineData={cicloData} />;
}
