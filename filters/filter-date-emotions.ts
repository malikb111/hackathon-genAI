interface SentimentData {
  date: number;
  sentiment: string;
}

export const filterDateSentiments = (data: any[] | null): SentimentData[] => {
  if (!data) return [];

  // Filtrer et transformer les données
  return data
    .filter((item) => item.Date && item["Sentiment global"]) // Vérifier que les champs existent
    .map((item) => ({
      date: item.Date,
      sentiment: item["Sentiment global"],
    }))
    .sort((a, b) => a.date - b.date); // Trier par date croissante
};
