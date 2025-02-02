"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SentimentAreaChartProps {
  data: {
    date: number;
    positif: number;
    neutre: number;
    negatif: number;
  }[];
  className?: string;
  showLegend?: boolean;
}

const chartConfig = {
  positif: {
    label: "Positif",
    color: "hsl(var(--chart-1))",
  },
  neutre: {
    label: "Neutre",
    color: "hsl(var(--chart-2))",
  },
  negatif: {
    label: "Négatif",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function SentimentAreaChart({
  data,
  showLegend = true,
  className = "aspect-auto h-[250px] w-full",
}: SentimentAreaChartProps) {
  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className={className}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fillPositif" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(150, 90%, 50%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(150, 90%, 50%)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillNeutre" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="fillNegatif" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(0, 90%, 50%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(0, 90%, 50%)"
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
              return new Date(value).toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
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
          <Area
            dataKey="positif"
            type="monotone"
            fill="url(#fillPositif)"
            stroke="hsl(150, 90%, 50%)"
            stackId="1"
          />
          <Area
            dataKey="neutre"
            type="monotone"
            fill="url(#fillNeutre)"
            stroke="hsl(213, 90%, 50%)"
            stackId="1"
          />
          <Area
            dataKey="negatif"
            type="monotone"
            fill="url(#fillNegatif)"
            stroke="hsl(0, 90%, 50%)"
            stackId="1"
          />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
