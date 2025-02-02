import { FileDown, Loader2 } from "lucide-react";
import { useExportPDF } from "@/hooks/use-export-pdf";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ExportPDFButtonProps {
  elementId: string;
  filename?: string;
  className?: string;
}

export function ExportPDFButton({
  elementId,
  filename = "export.pdf",
  className,
}: ExportPDFButtonProps) {
  const { exportToPDF, isExporting, error } = useExportPDF();
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await exportToPDF(elementId, { filename });
      toast({
        title: "Export réussi",
        description: "Le PDF a été généré avec succès",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className={className}
      variant="default"
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Export en cours...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
}
