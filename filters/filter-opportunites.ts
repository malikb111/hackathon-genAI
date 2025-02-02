export const filterOpportunites = (
  data: any[] | null
): { name: string; opportunites: number }[] => {
  if (!data) return [];

  const opportunitesCount = data.reduce(
    (acc: { [key: string]: number }, item) => {
      const opportunite = item.Opportunite;

      if (opportunite) {
        acc[opportunite] = (acc[opportunite] || 0) + 1;
      }

      return acc;
    },
    {}
  );

  return Object.entries(opportunitesCount).map(([name, count]) => ({
    name,
    opportunites: count,
  }));
};
