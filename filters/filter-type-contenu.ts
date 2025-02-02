import { DonutData } from "@/components/charts/DonutChart";

export const filterTypeContenu = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  const typeContenuCount = data.reduce(
    (acc: { [key: string]: number }, item) => {
      const typeContenu = item["Type de Contenu"];

      if (typeContenu) {
        acc[typeContenu] = (acc[typeContenu] || 0) + 1;
      }

      return acc;
    },
    {}
  );

  return Object.entries(typeContenuCount).map(([name, count], index) => ({
    name,
    value: count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};
