// Convertit une date Excel (nombre de jours depuis 1900) en Date JS
export const excelDateToJsDate = (excelDate: number): Date => {
  // Excel commence à compter à partir du 1er janvier 1900
  // et compte le 29 février 1900 qui n'existait pas (bug Excel)
  // donc on doit soustraire un jour pour les dates après le 28 février 1900
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date;
};

// Vérifie si une date est dans une période donnée
export const isDateInRange = (date: number, rangeType: string): boolean => {
  const jsDate = excelDateToJsDate(date);
  const today = new Date();

  switch (rangeType) {
    case "last30":
      return jsDate >= new Date(today.setDate(today.getDate() - 30));
    case "last60":
      return jsDate >= new Date(today.setDate(today.getDate() - 60));
    case "last90":
      return jsDate >= new Date(today.setDate(today.getDate() - 90));
    case "last180":
      return jsDate >= new Date(today.setDate(today.getDate() - 180));
    case "2024Q1":
      return (
        jsDate >= new Date("2024-01-01") && jsDate <= new Date("2024-03-31")
      );
    case "2023Q4":
      return (
        jsDate >= new Date("2023-10-01") && jsDate <= new Date("2023-12-31")
      );
    case "2023Q3":
      return (
        jsDate >= new Date("2023-07-01") && jsDate <= new Date("2023-09-30")
      );
    case "2023Q2":
      return (
        jsDate >= new Date("2023-04-01") && jsDate <= new Date("2023-06-30")
      );
    case "2024":
      const isIn2024 = jsDate.getFullYear() === 2024;
      return isIn2024;
    case "2023":
      return jsDate.getFullYear() === 2023;
    default:
      return true;
  }
};
