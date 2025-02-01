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

interface AreaChartProps {
  title?: string;
  description?: string;
}

interface ChartDataItem {
  date: string;
  matin: number;
  apresmidi: number;
  soir: number;
}

const chartData: ChartDataItem[] = [
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

const chartConfig = {
  visitors: {
    label: "Visiteurs",
  },
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

export default function AreaChartComponent({
  title = "Répartition temporelle",
  description = "Nombre de visites par période de la journée",
}: AreaChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
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
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Sélectionner une période"
          >
            <SelectValue placeholder="3 derniers mois" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              3 derniers mois
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 derniers jours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 derniers jours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMatin" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(213, 90%, 50%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(213, 90%, 50%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillApresMidi" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(213, 90%, 35%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(213, 90%, 35%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSoir" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(213, 90%, 20%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(213, 90%, 20%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
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
                return date.toLocaleDateString("en-US", {
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
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="soir"
              type="natural"
              fill="url(#fillSoir)"
              stroke="hsl(var(--chart-3))"
              stackId="a"
            />
            <Area
              dataKey="apresmidi"
              type="natural"
              fill="url(#fillApresMidi)"
              stroke="hsl(var(--chart-2))"
              stackId="a"
            />
            <Area
              dataKey="matin"
              type="natural"
              fill="url(#fillMatin)"
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
