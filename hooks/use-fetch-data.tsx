"use client";
import { useState, useEffect } from "react";
import mockData from "@/public/mock/data.json";

interface DataItem {
  Date: number;
  Territoire: string;
  Sujet: string;
  "Sujet Gen": string;
  Thème: string;
  Articles: string;
  "Type de Contenu": string;
  "Sentiment global": string;
  Tonalite: string;
  Emotions: string;
  Opportunite: string;
  Média: string;
  Typologie: string;
  Tendance: string;
  "Qualité du retour": string;
}

interface DataResponse {
  data: DataItem[];
}

const useFetchData = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setData({ data: mockData });
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
};

export default useFetchData;
