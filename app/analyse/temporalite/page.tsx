"use client";
import { Clock, Calendar, History } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import AreaChartComponent from "@/components/charts/AreaChart";
import { useFetchData } from "@/hooks/use-fetch-data";
import { filterPicActivite } from "@/filters/filter-pic-activite";
import { filterFrequence } from "@/filters/filter-frequence";
import { filterMediaActif } from "@/filters/filter-media-actif";
import { filterTerritoire } from "@/filters/filter-territoire";
import { filterDateSentiments } from "@/filters/filter-date-emotions";
import { Loader } from "@/components/sections/Loader";
import { ChartConfig } from "@/components/ui/chart";
import React from "react";

interface TerritoireData {
  name: string;
  value: number;
}

const chartConfig = {
  positif: {
    label: "Positif",
    color: "hsl(var(--chart-1))",
  },
  neutre: {
    label: "Neutre",
    color: "hsl(var(--chart-2))",
  },
  negatif: {
    label: "Négatif",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const gradients = [
  { id: "fillJoie", color: "hsl(213, 90%, 50%)" },
  { id: "fillTristesse", color: "hsl(213, 90%, 35%)" },
  { id: "fillColere", color: "hsl(213, 90%, 20%)" },
];

export default function Temporality() {
  const { data, isLoading, error } = useFetchData();
  const picActivite = filterPicActivite(data);
  const frequence = filterFrequence(data);
  const mediaActif = filterMediaActif(data);
  const territoire: TerritoireData[] = filterTerritoire(data);
  const dateSentiments = filterDateSentiments(data);

  // Transformer les données pour le graphique
  const transformedData = React.useMemo(() => {
    const groupedByDate = dateSentiments.reduce((acc, item) => {
      const date = new Date(item.date).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { date, positif: 0, neutre: 0, negatif: 0 };
      }
      const sentiment = item.sentiment.toLowerCase() as
        | "positif"
        | "neutre"
        | "negatif";
      acc[date][sentiment] += 1;
      return acc;
    }, {} as Record<string, { date: string; positif: number; neutre: number; negatif: number }>);

    return Object.values(groupedByDate);
  }, [dateSentiments]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="pr-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Pic d'activité"
          value={picActivite[0]?.name || "Ce mois"}
          icon={Clock}
          description="-5% par rapport au mois dernier"
        />
        <SummaryCard
          title="Fréquence"
          value={frequence[0]?.name || "0 / jour"}
          icon={Calendar}
          iconColor="text-blue-600"
          description="+10% par rapport au mois dernier"
        />
        <SummaryCard
          title="Media le plus actif"
          value={mediaActif[0]?.name || "0"}
          icon={History}
          iconColor="text-purple-600"
          description="+7% par rapport au mois dernier"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <CardChart title="Sentiment global" className="w-full">
          <AreaChartComponent
            data={transformedData}
            areas={["positif", "neutre", "negatif"]}
            config={chartConfig}
            title="Évolution des sentiments"
            description="Répartition des sentiments au fil du temps"
          />
        </CardChart>
        <CardChart title="Territoire" className="w-full">
          <DonutChart data={territoire} valueKey="value" nameKey="name" />
        </CardChart>
      </div>
    </div>
  );
}
