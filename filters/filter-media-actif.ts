import { DonutData } from "@/components/charts/DonutChart";

export const filterMediaActif = (data: any[] | null): DonutData[] => {
  if (!data) return [];

  // Créer un objet pour compter les occurrences de chaque média
  const mediaCount: { [key: string]: number } = {};

  // Compter les occurrences
  data.forEach((item) => {
    const media = item.Média;
    if (media) {
      mediaCount[media] = (mediaCount[media] || 0) + 1;
    }
  });

  // Trouver le média avec le plus d'occurrences
  let maxMedia = "";
  let maxCount = 0;

  Object.entries(mediaCount).forEach(([media, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxMedia = media;
    }
  });

  // Retourner le résultat au format DonutData
  return [
    {
      name: maxMedia,
      value: maxCount,
      fill: "hsl(var(--chart-1))",
    },
  ];
};
