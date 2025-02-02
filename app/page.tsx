"use client";

import { RefreshCw } from "lucide-react";
import { DrawerAlert } from "@/components/popup/DrawerAlert";
import { Filter } from "@/components/popup/Filter";
import { SummaryNotificationsCard } from "@/components/cards/SummaryNotificationsCard";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import AreaChart from "@/components/charts/AreaChart";
import { CardChart } from "@/components/cards/CardChart";
import useFetchData from "@/hooks/use-fetch-data";
import { filterOpportunites } from "@/filters/filter-opportunites";

export default function Home() {
  const pageTitle: string = "Vue d'ensemble";

  const { data, isLoading, error } = useFetchData();
  console.log(data);
  const opportunites = filterOpportunites(data?.data || null);
  console.log(opportunites);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
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
            <AreaChart />
          </CardChart>
        </div>
        <div className="flex-none">
          <SummaryNotificationsCard />
        </div>
      </div>
    </div>
  );
}
