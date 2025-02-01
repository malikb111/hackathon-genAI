"use client";

import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function BarChartComponent() {
  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] overflow-x-auto"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
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
