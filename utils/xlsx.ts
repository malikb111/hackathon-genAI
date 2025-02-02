import * as XLSX from 'xlsx';

export const downloadXLSX = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  // Générer le fichier et le télécharger
  XLSX.writeFile(workbook, filename);
};