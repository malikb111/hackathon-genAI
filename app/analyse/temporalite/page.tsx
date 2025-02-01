import { Clock, Calendar, History } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import AreaChart from "@/components/charts/AreaChart";

export default function Temporality() {
  return (
    <div className="pr-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Temps moyen"
          value="15 min"
          icon={Clock}
          description="-5% par rapport au mois dernier"
        />
        <SummaryCard
          title="Fréquence"
          value="3.2/jour"
          icon={Calendar}
          iconColor="text-blue-600"
          description="+10% par rapport au mois dernier"
        />
        <SummaryCard
          title="Sessions"
          value="2,547"
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
          <DonutChart />
        </CardChart>
      </div>
    </div>
  );
}
