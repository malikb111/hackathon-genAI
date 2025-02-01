import { TrendingUp, TrendingDown } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import RadarChart from "@/components/charts/RadarChart";
import { AlertCard } from "@/components/cards/AlertCard";

export default function Perception() {
  return (
    <div className="pr-6 mb-10">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Score global"
          value="78%"
          icon={TrendingUp}
          description="+2% par rapport au mois dernier"
        />
        <SummaryCard
          title="Mentions positives"
          value={1234}
          icon={TrendingUp}
          iconColor="text-green-600"
          description="+15% par rapport au mois dernier"
        />
        <SummaryCard
          title="Mentions négatives"
          value={432}
          icon={TrendingDown}
          iconColor="text-red-600"
          description="-5% par rapport au mois dernier"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CardChart title="Répartition par type" className="w-full">
          <BarChart />
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
      <AlertCard />
    </div>
  );
}
