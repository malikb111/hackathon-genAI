import { DonutData } from "@/components/charts/DonutChart";

export const filterFrequence = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  // Compter le nombre total d'événements
  const totalEvents = data.length;

  // Calculer la moyenne par jour (sur 365 jours)
  const averagePerDay = totalEvents / 365;

  // Arrondir à 2 décimales
  const roundedAverage = Math.round(averagePerDay * 100) / 100;

  // Retourner le résultat au format DonutData
  return [
    {
      name: `${roundedAverage} / jour`,
      value: roundedAverage,
      fill: "hsl(var(--chart-1))",
    },
  ];
};
