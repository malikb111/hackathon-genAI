import { TrendingUp, FileText, BarChart2 } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";

export default function Contenus() {
  return (
    <div id="contenus">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <SummaryCard
          title="Total contenus"
          value="1,547"
          icon={FileText}
          description="+12% par rapport au mois dernier"
        />
        <SummaryCard
          title="Articles publiés"
          value="856"
          icon={TrendingUp}
          iconColor="text-blue-600"
          description="+8% par rapport au mois dernier"
        />
        <SummaryCard
          title="Vidéos publiées"
          value="691"
          icon={BarChart2}
          iconColor="text-purple-600"
          description="+15% par rapport au mois dernier"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <CardChart title="Type de contenu" className="w-full">
            <DonutChart />
          </CardChart>
          <CardChart title="Qualité de retour" className="w-full">
            <DonutChart />
          </CardChart>
          <CardChart title="Thème" className="w-full">
            <DonutChart />
          </CardChart>
          <CardChart title="Typologie" className="w-full">
            <DonutChart />
          </CardChart>
        </div>
        <div className="grid gap-6">
          <CardChart title="Engagement" className="w-full">
            <BarChart />
          </CardChart>
          <CardChart title="Tendances émergentes" className="w-full">
            <BarChart />
          </CardChart>
        </div>
      </div>
    </div>
  );
}
