import { DonutData } from "@/components/charts/DonutChart";

export const filterTendance = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  const tendanceCount = data.reduce((acc: { [key: string]: number }, item) => {
    const tendance = item["Tendance"];

    if (tendance && !tendance.toLowerCase().startsWith("non identifi")) {
      acc[tendance] = (acc[tendance] || 0) + 1;
    }

    return acc;
  }, {});

  return Object.entries(tendanceCount)
    .sort(([, a], [, b]) => b - a) // Trier par ordre décroissant
    .slice(0, 4) // Ne garder que les 5 premiers
    .map(([name, count], index) => ({
      name,
      value: count,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
};
