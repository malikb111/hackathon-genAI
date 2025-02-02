"use client";
import { useState, useEffect } from "react";
import mockData from "@/public/mock/data.json";
import { useFilter } from "@/contexts/filter-context";
import { DataItem } from "@/types/data";
import { normalizeData } from "@/utils/normalize-data";

export const useFetchData = () => {
  const [rawData, setRawData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { filterData } = useFilter();

  useEffect(() => {
    try {
      const normalizedData = normalizeData(mockData);
      setRawData(normalizedData);
      console.log(normalizedData);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, []);

  const filteredData = filterData(rawData);

  return { data: filteredData, isLoading, error };
};
