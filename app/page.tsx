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

export default function Home() {
  const pageTitle: string = "Vue d'ensemble";

  const { data, isLoading, error } = useFetchData();
  const opportunites = filterOpportunites(data || null);
  const dateSentiments = filterDateSentiments(data || null);

  const chartConfig = {
    emotions: {
      label: "Émotions",
    },
    joie: {
      label: "Joie",
      color: "hsl(var(--chart-1))",
    },
    tristesse: {
      label: "Tristesse",
      color: "hsl(var(--chart-2))",
    },
    colere: {
      label: "Colère",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

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
    <div className="px-8">
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
            Rafraîchir
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <CardChart title="Répartition par type">
              <BarChart data={opportunites} bars={["opportunites"]} />
            </CardChart>
            <CardChart title="Répartition par source">
              <DonutChart />
            </CardChart>
          </div>
          <CardChart title="Évolution temporelle">
            <AreaChartComponent />
          </CardChart>
        </div>
        <div className="flex-none">
          <SummaryNotificationsCard />
        </div>
      </div>
    </div>
  );
}
