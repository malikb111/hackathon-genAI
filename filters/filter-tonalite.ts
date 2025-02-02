export const filterTonalite = (data: any[] | null) => {
  if (!data) return [];

  const tonaliteCount = data.reduce((acc: { [key: string]: number }, item) => {
    const tonalite = item.Tonalite;

    if (tonalite) {
      acc[tonalite] = (acc[tonalite] || 0) + 1;
    }

    return acc;
  }, {});

  return Object.entries(tonaliteCount).map(([name, count]) => ({
    name,
    count,
  }));
};
