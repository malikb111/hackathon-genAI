export const filterQualiteRetour = (data: any[] | null) => {
  if (!data) return [];

  const colors = {
    Négatif: "hsl(var(--chart-blue-1))",
    Factuel: "hsl(var(--chart-blue-2))",
    Positif: "hsl(var(--chart-blue-3))",
  };

  const qualiteRetourCount = data.reduce(
    (acc: { [key: string]: number }, item) => {
      const qualiteRetour = item["Qualité du retour"];

      if (qualiteRetour) {
        acc[qualiteRetour] = (acc[qualiteRetour] || 0) + 1;
      }

      return acc;
    },
    {}
  );

  return Object.entries(qualiteRetourCount).map(([name, count], index) => ({
    name,
    value: count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};
