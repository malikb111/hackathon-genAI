import { DataItem } from "@/types/data";

export function filterSentimentPositif(data: DataItem[] | null): number {
  if (!data) return 0;
  return data.filter(
    (item) => item["Sentiment global"]?.toLowerCase() === "positif"
  ).length;
}

export function filterSentimentNegatif(data: DataItem[] | null): number {
  if (!data) return 0;
  return data.filter(
    (item) => item["Sentiment global"]?.toLowerCase() === "negatif"
  ).length;
}

export function filterSentimentNeutre(data: DataItem[] | null): number {
  if (!data) return 0;
  return data.filter(
    (item) => item["Sentiment global"]?.toLowerCase() === "neutre"
  ).length;
}
