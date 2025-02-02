"use client";
import { useState, useEffect } from "react";
import { useFilter } from "@/contexts/filter-context";
import { DataItem } from "@/types/data";
import { normalizeData } from "@/utils/normalize-data";

export const useFetchData = () => {
  const [rawData, setRawData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { filterData } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/data.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const jsonData = await response.json();
        const normalizedData = normalizeData(jsonData);
        setRawData(normalizedData);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = filterData(rawData);

  return { data: filteredData, isLoading, error };
};
