"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type DonutData = {
  name: string;
  value: number;
  fill?: string;
};

interface DonutChartComponentProps {
  data?: DonutData[];
  valueKey?: string;
  nameKey?: string;
  showLegend?: boolean;
  showLabel?: boolean;
  className?: string;
}

const defaultData: DonutData[] = [
  { name: "Blog", value: 27, fill: "hsl(var(--chart-1))" },
  { name: "Article", value: 200, fill: "hsl(var(--chart-2))" },
  { name: "TV", value: 187, fill: "hsl(var(--chart-3))" },
  { name: "Forum", value: 17, fill: "hsl(var(--chart-4))" },
  { name: "Avis clients", value: 20, fill: "hsl(var(--chart-5))" },
];

export default function DonutChartComponent({
  data = defaultData,
  valueKey = "value",
  nameKey = "name",
  showLegend = true,
  showLabel = true,
  className = "mx-auto aspect-square max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] [&_.recharts-pie-label-text]:fill-foreground",
}: DonutChartComponentProps) {
  const chartConfig = data.reduce((config, item, index) => {
    return {
      ...config,
      [item.name]: {
        label: item.name,
        color: item.fill || `hsl(var(--chart-${index + 1}))`,
      },
    };
  }, {}) satisfies ChartConfig;

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className={className}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            label={showLabel}
          />
        </PieChart>
      </ChartContainer>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          Trending up by 5.2% this month. Showing total visitors for the last 6
          months.
        </p>
      </div>
    </div>
  );
}
