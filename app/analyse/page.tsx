"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import RadarChart from "@/components/charts/RadarChart";
import { useFetchData } from "@/hooks/use-fetch-data";
import { filterOpportunites } from "@/filters/filter-opportunites";
import { countElements } from "@/utils/count-elements";
import {
  filterSentimentPositif,
  filterSentimentNegatif,
  filterSentimentNeutre,
} from "@/filters/filter-sentiment";
import { filterEmotions } from "@/filters/filter-emotions";
import { filterTonalite } from "@/filters/filter-tonalite";

export default function Perception() {
  const { data, isLoading, error } = useFetchData();
  const opportunites = filterOpportunites(data || null);
  const mentions = countElements(data || null);
  const globalPositif = filterSentimentPositif(data || null);
  const globalNegatif = filterSentimentNegatif(data || null);
  const globalNeutre = filterSentimentNeutre(data || null);
  const globalSentiments = [
    { name: "Positif", value: globalPositif, fill: "hsl(var(--chart-1))" },
    { name: "Négatif", value: globalNegatif, fill: "hsl(var(--chart-2))" },
    { name: "Neutre", value: globalNeutre, fill: "hsl(var(--chart-3))" },
  ];
  const emotions = filterEmotions(data || null);
  const tonalite = filterTonalite(data || null);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="mb-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Mentions Enedis"
          value={mentions}
          icon={TrendingUp}
          description="+2% par rapport au mois dernier"
        />
        <SummaryCard
          title="Sentiments positifs / neutres"
          value={globalPositif + globalNeutre}
          icon={TrendingUp}
          iconColor="text-green-600"
          description="+15% par rapport au mois dernier"
        />
        <SummaryCard
          title="Sentiments négatifs"
          value={globalNegatif}
          icon={TrendingDown}
          iconColor="text-red-600"
          description="-5% par rapport au mois dernier"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CardChart title="Opportunités detectées" className="w-full">
          <BarChart data={opportunites} bars={["opportunites"]} />
        </CardChart>
        <CardChart title="Répartition des émotions" className="w-full">
          <RadarChart
            data={emotions.map((item) => ({
              name: item.name,
              value: item.emotions,
            }))}
            metrics={["value"]}
          />
        </CardChart>
        <CardChart title="Répartition de la tonalité" className="w-full">
          <RadarChart
            data={tonalite.map((item) => ({
              name: item.name,
              value: item.count,
            }))}
            metrics={["value"]}
          />
        </CardChart>
        <CardChart title="Sentiments globaux" className="w-full">
          <DonutChart data={globalSentiments} valueKey="value" nameKey="name" />
        </CardChart>
      </div>
    </div>
  );
}
