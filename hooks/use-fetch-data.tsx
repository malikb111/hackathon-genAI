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
        const response = await fetch(
          "https://kalu-api.newgate-it.fr/enedis-analysis",
          {
            method: "GET",
            headers: {
              "x-api-key":
                "ImqxB02LFPW2OpeRWF667xWqjWImGKehfocj4gd2LcoDRj667zBtRatzxXIJHCYt4lZZmT02LFPW2OpeRWFxWqjWImGKehfoc",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const jsonData = await response.json();
        console.log(jsonData);
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
