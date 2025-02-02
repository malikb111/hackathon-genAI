"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { DataItem } from "@/types/data";
import { isDateInRange } from "@/utils/date-utils";

interface FilterContextType {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedMedia: string[];
  setSelectedMedia: React.Dispatch<React.SetStateAction<string[]>>;
  filterData: (data: any[]) => any[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const filterData = useCallback(
    (data: DataItem[]): DataItem[] => {
      const filtered = data.filter((item) => {
        const dateMatch =
          !selectedDate || isDateInRange(String(item.Date), selectedDate);
        const mediaMatch =
          selectedMedia.length === 0 || selectedMedia.includes(item.Média);

        return dateMatch && mediaMatch;
      });
      return filtered;
    },
    [selectedDate, selectedMedia]
  );

  return (
    <FilterContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedMedia,
        setSelectedMedia,
        filterData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
