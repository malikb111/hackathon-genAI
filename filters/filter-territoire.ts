import { DonutData } from "@/components/charts/DonutChart";

export const filterTerritoire = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  // Créer un objet pour compter les occurrences de chaque territoire
  const territoireCount: { [key: string]: number } = {};

  // Compter les occurrences
  data.forEach((item) => {
    const territoire = item.Territoire;
    if (territoire) {
      territoireCount[territoire] = (territoireCount[territoire] || 0) + 1;
    }
  });

  // Convertir les données au format DonutData
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  return Object.entries(territoireCount).map(([territoire, count], index) => ({
    name: territoire,
    value: count,
    fill: colors[index % colors.length],
  }));
};
