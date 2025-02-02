export const filterEmotions = (
  data: any[] | null
): { name: string; emotions: number }[] => {
  if (!data) return [];

  const emotionsCount = data.reduce((acc: { [key: string]: number }, item) => {
    const emotion = item.Emotions;

    if (emotion) {
      acc[emotion] = (acc[emotion] || 0) + 1;
    }

    return acc;
  }, {});

  return Object.entries(emotionsCount).map(([name, count]) => ({
    name,
    emotions: count,
  }));
};
