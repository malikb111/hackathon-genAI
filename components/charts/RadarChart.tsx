"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type RadarData = {
  month?: string;
  name?: string;
  [key: string]: number | string | undefined;
};

interface RadarChartComponentProps {
  data?: RadarData[];
  metrics?: string[];
}

const defaultData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export default function RadarChartComponent({
  data = defaultData,
  metrics = ["desktop"],
}: RadarChartComponentProps) {
  const chartConfig = metrics.reduce((config, metricName, index) => {
    return {
      ...config,
      [metricName]: {
        label: metricName,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    };
  }, {}) satisfies ChartConfig;

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto h-[350px] w-full p-4"
      >
        <RadarChart data={data} outerRadius="80%">
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="name" />
          {metrics.map((metricName, index) => (
            <Radar
              key={metricName}
              name={metricName}
              dataKey={metricName}
              fill={`hsl(var(--chart-${index + 1}))`}
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          ))}
        </RadarChart>
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
