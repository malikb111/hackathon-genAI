"use client";
import { Clock, Calendar, History } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import AreaChart from "@/components/charts/AreaChart";
import { useFetchData } from "@/hooks/use-fetch-data";
import { filterPicActivite } from "@/filters/filter-pic-activite";
import { filterFrequence } from "@/filters/filter-frequence";
import { filterMediaActif } from "@/filters/filter-media-actif";
import { filterTerritoire } from "@/filters/filter-territoire";
import { Loader } from "@/components/sections/Loader";

interface TerritoireData {
  name: string;
  value: number;
}

export default function Temporality() {
  const { data, isLoading, error } = useFetchData();
  const picActivite = filterPicActivite(data);
  const frequence = filterFrequence(data);
  const mediaActif = filterMediaActif(data);
  const territoire: TerritoireData[] = filterTerritoire(data);

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
          <AreaChart />
        </CardChart>
        <CardChart title="Territoire" className="w-full">
          <DonutChart data={territoire} valueKey="value" nameKey="name" />
        </CardChart>
      </div>
    </div>
  );
}
