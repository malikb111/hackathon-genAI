// Vérifie si une date est dans une période donnée
export const isDateInRange = (dateStr: string, rangeType: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();

  switch (rangeType) {
    case "last30":
      return date >= new Date(today.setDate(today.getDate() - 30));
    case "last60":
      return date >= new Date(today.setDate(today.getDate() - 60));
    case "last90":
      return date >= new Date(today.setDate(today.getDate() - 90));
    case "last180":
      return date >= new Date(today.setDate(today.getDate() - 180));
    case "2024Q1":
      return date >= new Date("2024-01-01") && date <= new Date("2024-03-31");
    case "2023Q4":
      return date >= new Date("2023-10-01") && date <= new Date("2023-12-31");
    case "2023Q3":
      return date >= new Date("2023-07-01") && date <= new Date("2023-09-30");
    case "2023Q2":
      return date >= new Date("2023-04-01") && date <= new Date("2023-06-30");
    case "2024":
      const isIn2024 = date.getFullYear() === 2024;
      return isIn2024;
    case "2023":
      return date.getFullYear() === 2023;
    default:
      return true;
  }
};
