import { useState } from "react";
import * as XLSX from "xlsx";

interface UploadResponse {
  id: string;
  name: string;
  size: number;
  extension: string;
  mime_type: string;
  created_by: string;
  created_at: number;
}

interface WorkflowResponse {
  data: {
    outputs: {
      output: [
        {
          url: string;
        }
      ];
    };
  };
}

interface useFileUpload {
  uploadFile: (file: File) => Promise<any[] | null>; // Retourne les données de l'Excel
  isLoading: boolean;
  error: string | null;
}

export default function useFileUpload(): useFileUpload {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadAndParseExcel = async (url: string): Promise<any[]> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Prend la première feuille du classeur
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convertit en tableau d'objets
    return XLSX.utils.sheet_to_json(worksheet);
  };

  const uploadFile = async (file: File): Promise<any[] | null> => {
    setIsloading(true);
    setError(null);

    try {
      // 1. Upload du fichier
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", "user-123");

      const uploadResponse = await fetch(
        "https://kalu.newgate-it.fr/v1/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer app-1cyZP7O3mUYH7kCXlXuYOvQB",
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }

      const uploadResult: UploadResponse = await uploadResponse.json();

      // 2. Exécution du workflow
      const workflowResponse = await fetch(
        "https://kalu.newgate-it.fr/v1/workflows/run",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer app-1cyZP7O3mUYH7kCXlXuYOvQB",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              excels: [
                {
                  transfer_method: "local_file",
                  upload_file_id: uploadResult.id,
                  type: "document",
                },
              ],
            },
            response_mode: "blocking",
            user: "user-123",
          }),
        }
      );

      if (!workflowResponse.ok) {
        throw new Error("Workflow execution failed");
      }

      const workflowResult: WorkflowResponse = await workflowResponse.json();

      // 3. Téléchargement et parsing du fichier Excel résultant
      const excelUrl = workflowResult.data.outputs.output[0].url;
      const excelData = await downloadAndParseExcel(excelUrl);

      console.log(excelData);
      return excelData;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsloading(false);
    }
  };

  return { uploadFile, isLoading, error };
}
