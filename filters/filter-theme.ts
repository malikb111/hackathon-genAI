import { DonutData } from "@/components/charts/DonutChart";

export const filterTheme = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  const themeCount = data.reduce((acc: { [key: string]: number }, item) => {
    const theme = item["Thème"];

    if (theme) {
      acc[theme] = (acc[theme] || 0) + 1;
    }

    return acc;
  }, {});

  return Object.entries(themeCount).map(([name, count], index) => ({
    name,
    value: count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};
