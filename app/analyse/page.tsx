import { TrendingUp, TrendingDown } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import RadarChart from "@/components/charts/RadarChart";
import { useFetchDataJson } from "@/hooks/use-fetch-data-json";
import { filterOpportunites } from "@/filters/filter-opportunites";

export default function Perception() {
  // const { data, isLoading, error } = useFetchDataJson();
  // const opportunitesData = filterOpportunites(data);

  const data = {
    opportunites: [
      { name: "Recommandation", opportunites: 45 },
      { name: "Feedback valorisable", opportunites: 52 },
      { name: "Amélioration", opportunites: 61 },
      { name: "Gestion de crise", opportunites: 48 },
      { name: "Non identifié", opportunites: 55 },
    ],
  };

  return (
    <div className="mb-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Mentions Enedis"
          value="78"
          icon={TrendingUp}
          description="+2% par rapport au mois dernier"
        />
        <SummaryCard
          title="Sentiments positifs"
          value={98}
          icon={TrendingUp}
          iconColor="text-green-600"
          description="+15% par rapport au mois dernier"
        />
        <SummaryCard
          title="Sentiments négatifs"
          value={12}
          icon={TrendingDown}
          iconColor="text-red-600"
          description="-5% par rapport au mois dernier"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CardChart title="Opportunités detectées" className="w-full">
          <BarChart data={data.opportunites} bars={["opportunites"]} />
        </CardChart>
        <CardChart title="Répartition par source" className="w-full">
          <RadarChart />
        </CardChart>
        <CardChart title="Répartition par sentiment" className="w-full">
          <RadarChart />
        </CardChart>
        <CardChart title="Répartition par thème" className="w-full">
          <DonutChart />
        </CardChart>
      </div>
    </div>
  );
}
