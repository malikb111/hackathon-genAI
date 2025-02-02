"use client";
import { TrendingUp, FileText, BarChart2 } from "lucide-react";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { CardChart } from "@/components/cards/CardChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import RadarChart from "@/components/charts/RadarChart";
import { filterTypeContenu } from "@/filters/filter-type-contenu";
import { useFetchData } from "@/hooks/use-fetch-data";
import { filterQualiteRetour } from "@/filters/filter-qualite-retour";
import { filterTheme } from "@/filters/filter-theme";
import { filterTendance } from "@/filters/filter-tendance";

export default function Contenus() {
  const { data, isLoading, error } = useFetchData();
  const typeContenu = filterTypeContenu(data);
  const qualiteRetour = filterQualiteRetour(data);
  const theme = filterTheme(data);
  const tendance = filterTendance(data);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div>
      {/* <div className="grid gap-4 md:grid-cols-3 mb-6">
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
      </div> */}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          <CardChart title="Type de contenu" className="w-full">
            <RadarChart
              data={typeContenu.map((item) => ({
                name: item.name,
                value: item.value,
              }))}
              metrics={["value"]}
            />
          </CardChart>
          <CardChart title="Qualité de retour" className="w-full">
            <BarChart data={qualiteRetour} bars={["value"]} />
          </CardChart>
          <CardChart title="Tendances émergentes" className="w-full">
            <DonutChart data={tendance} valueKey="value" nameKey="name" />
          </CardChart>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <CardChart title="Thème" className="w-full">
            <DonutChart data={theme} valueKey="value" nameKey="name" />
          </CardChart>
          <CardChart title="Typologie" className="w-full">
            <DonutChart />
          </CardChart>
        </div>
      </div>
    </div>
  );
}
