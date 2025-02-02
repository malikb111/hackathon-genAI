import data from "@/public/mock/data.json";

export const countElements = (data: any[] | null): number => {
  if (!data) return 0;
  return data.length;
};
