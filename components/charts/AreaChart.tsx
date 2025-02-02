"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AreaData = {
  date: string;
  [key: string]: number | string;
};

interface AreaChartProps {
  title?: string;
  description?: string;
  data?: AreaData[];
  areas?: string[];
  config?: ChartConfig;
}

const defaultData: AreaData[] = [
  { date: "2024-04-01", matin: 45, apresmidi: 32, soir: 28 },
  { date: "2024-04-02", matin: 52, apresmidi: 38, soir: 35 },
  { date: "2024-04-03", matin: 48, apresmidi: 41, soir: 30 },
  { date: "2024-04-04", matin: 61, apresmidi: 45, soir: 40 },
  { date: "2024-04-05", matin: 55, apresmidi: 48, soir: 38 },
  { date: "2024-04-06", matin: 42, apresmidi: 36, soir: 25 },
  { date: "2024-04-07", matin: 38, apresmidi: 31, soir: 22 },
  { date: "2024-04-08", matin: 57, apresmidi: 42, soir: 33 },
  { date: "2024-04-09", matin: 53, apresmidi: 45, soir: 36 },
  { date: "2024-04-10", matin: 59, apresmidi: 47, soir: 42 },
];

const defaultConfig = {
  matin: {
    label: "Matin (6h-12h)",
    color: "hsl(var(--chart-1))",
  },
  apresmidi: {
    label: "Après-midi (12h-18h)",
    color: "hsl(var(--chart-2))",
  },
  soir: {
    label: "Soir (18h-24h)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const defaultAreas = ["soir", "apresmidi", "matin"];

export default function AreaChartComponent({
  title = "Répartition temporelle",
  description = "Nombre de visites par période de la journée",
  data = defaultData,
  areas = defaultAreas,
  config = defaultConfig,
}: AreaChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="w-full">
      <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
        <AreaChart data={filteredData}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient
                key={area}
                id={`fill${area}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={
                    config[area]?.color || `hsl(213, 90%, ${50 - index * 15}%)`
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    config[area]?.color || `hsl(213, 90%, ${50 - index * 15}%)`
                  }
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("fr-FR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          {areas.map((area) => (
            <Area
              key={area}
              dataKey={area}
              type="natural"
              fill={`url(#fill${area})`}
              stroke={config[area]?.color || "hsl(var(--chart-1))"}
              stackId="a"
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
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
