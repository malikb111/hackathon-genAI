"use client";

import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export type BarData = {
  name: string;
  [key: string]: number | string;
};

interface BarChartComponentProps {
  data?: BarData[];
  bars?: string[];
}

const defaultData = [
  { name: "January", value: 186 },
  { name: "February", value: 305 },
  { name: "March", value: 237 },
  { name: "April", value: 73 },
  { name: "May", value: 209 },
  { name: "June", value: 214 },
];

export default function BarChartComponent({
  data = defaultData,
  bars = ["value"],
}: BarChartComponentProps) {
  const chartConfig = bars.reduce((config, barName) => {
    return {
      ...config,
      [barName]: {
        label: barName,
        color: "#2563eb",
      },
    };
  }, {}) satisfies ChartConfig;

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[350px] overflow-x-auto"
      >
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ left: 10, right: 10, top: 10, bottom: 30 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            angle={0}
            height={40}
            tick={{ fontSize: 12 }}
            interval={0}
            textAnchor="middle"
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          {bars.map((barName) => (
            <Bar key={barName} dataKey={barName} fill="#2563eb" radius={8} />
          ))}
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
