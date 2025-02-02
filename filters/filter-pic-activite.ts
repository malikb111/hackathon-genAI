import { DonutData } from "@/components/charts/DonutChart";

export const filterPicActivite = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  console.log(data);

  const monthCount = data.reduce((acc: { [key: string]: number }, item) => {
    try {
      const date = new Date(item.Date);

      if (isNaN(date.getTime())) {
        return acc;
      }

      const month = date.toLocaleString("fr-FR", { month: "long" });
      const monthYear = `${month.charAt(0).toUpperCase()}${month.slice(
        1
      )} ${date.getFullYear()}`;

      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    } catch (error) {
      console.error("Erreur lors de la conversion de la date:", error);
      return acc;
    }
  }, {});

  return Object.entries(monthCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 1)
    .map(([name, count], index) => ({
      name,
      value: count,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
};
