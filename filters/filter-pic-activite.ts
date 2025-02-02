import { DonutData } from "@/components/charts/DonutChart";

export const filterPicActivite = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  // Convertir les dates Excel en dates JavaScript et compter par mois
  const monthCount = data.reduce((acc: { [key: string]: number }, item) => {
    // La date Excel commence à partir du 1er janvier 1900
    // Pour convertir en timestamp JavaScript : (date_excel - 25569) * 86400 * 1000
    const date = new Date((item.Date - 25569) * 86400 * 1000);
    const month = date.toLocaleString("fr-FR", { month: "long" });
    const monthYear = `${month.charAt(0).toUpperCase()}${month.slice(
      1
    )} ${date.getFullYear()}`;

    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Convertir en format DonutData et trier par nombre d'occurrences
  return Object.entries(monthCount)
    .sort(([, a], [, b]) => b - a) // Trier par ordre décroissant
    .slice(0, 1) // Ne garder que le mois le plus actif
    .map(([name, count], index) => ({
      name,
      value: count,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
};
