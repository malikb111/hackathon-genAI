"use client";

import { RefreshCw } from "lucide-react";
import { DrawerAlert } from "@/components/popup/DrawerAlert";
import { Filter } from "@/components/popup/Filter";
import { SummaryNotificationsCard } from "@/components/cards/SummaryNotificationsCard";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import AreaChart from "@/components/charts/AreaChart";
import { CardChart } from "@/components/cards/CardChart";
import { useFetchData } from "@/hooks/use-fetch-data";
import { filterOpportunites } from "@/filters/filter-opportunites";
import { Loader } from "@/components/sections/Loader";
import AreaChartComponent from "@/components/charts/AreaChart";
import { filterDateSentiments } from "@/filters/filter-date-emotions";
import { ChartConfig } from "@/components/ui/chart";
import { filterSentimentPositif } from "@/filters/filter-sentiment";
import {
  filterSentimentNegatif,
  filterSentimentNeutre,
} from "@/filters/filter-sentiment";
import { filterTheme } from "@/filters/filter-theme";
import React from "react";

export default function Home() {
  const pageTitle: string = "Vue d'ensemble";

  const { data, isLoading, error } = useFetchData();

  const globalPositif = filterSentimentPositif(data || null);
  const globalNegatif = filterSentimentNegatif(data || null);
  const globalNeutre = filterSentimentNeutre(data || null);
  const globalSentiments = [
    { name: "Positif", value: globalPositif, fill: "hsl(var(--chart-1))" },
    { name: "Négatif", value: globalNegatif, fill: "hsl(var(--chart-2))" },
    { name: "Neutre", value: globalNeutre, fill: "hsl(var(--chart-3))" },
  ];
  const dateSentiments = filterDateSentiments(data || null);
  const themeData = filterTheme(data || null);
  const theme = themeData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      name:
        item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name,
    }));

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

  const gradients = [
    { id: "fillJoie", color: "hsl(213, 90%, 50%)" },
    { id: "fillTristesse", color: "hsl(213, 90%, 35%)" },
    { id: "fillColere", color: "hsl(213, 90%, 20%)" },
  ];
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="px-8 mb-8">
      <h2 className="text-3xl font-semibold mt-8">{pageTitle}</h2>
      <div className="flex justify-between items-center mt-4 mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            👋 Bienvenue sur votre tableau de bord !{" "}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <DrawerAlert />
          <Filter />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <CardChart title="Sentiments globaux">
              <DonutChart
                data={globalSentiments}
                valueKey="value"
                nameKey="name"
              />
            </CardChart>
            <CardChart title="Répartition par source">
              <DonutChart data={theme} valueKey="value" nameKey="name" />
            </CardChart>
          </div>
          <CardChart title="Évolution temporelle">
            <AreaChartComponent
              data={transformedData}
              areas={["positif", "neutre", "negatif"]}
              config={chartConfig}
              title="Évolution des sentiments"
              description="Répartition des sentiments au fil du temps"
            />
          </CardChart>
        </div>
        <div className="flex-none">
          <SummaryNotificationsCard />
        </div>
      </div>
    </div>
  );
}
