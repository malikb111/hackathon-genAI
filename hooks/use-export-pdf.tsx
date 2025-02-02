import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportPDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export const useExportPDF = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportToPDF = async (
    elementId: string,
    options: ExportPDFOptions = {}
  ) => {
    const { filename = "export.pdf", quality = 2, scale = 2 } = options;

    try {
      setIsExporting(true);
      setError(null);

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error("Élément non trouvé");
      }

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
      });

      const imgData = canvas.toDataURL("image/jpeg", quality);
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'export PDF"
      );
      console.error("Erreur lors de l'export PDF:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToPDF,
    isExporting,
    error,
  };
};
