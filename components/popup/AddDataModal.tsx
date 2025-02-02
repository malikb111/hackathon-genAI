"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import Dropzone from "react-dropzone";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import useFileUpload from "@/hooks/use-upload-data";
import { useState } from "react";
import Link from "next/link";
import { Upload } from "lucide-react";

export function AddDataModal() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { uploadFile, isLoading } = useFileUpload();

  const handleFileDrop = (droppedFile: Array<File>) => {
    const file = droppedFile[0];
    if (
      file &&
      (file.type === "application/pdf" || file.name.endsWith(".xlsx"))
    ) {
      setFile(file);
      setFileError(null);
    } else {
      setFileError("Veuillez déposer un fichier XLSX ou PDF");
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadFile(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          Ajouter Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter des données</DialogTitle>
        </DialogHeader>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-gray-400 text-sm bg-gray-50">
            <Dropzone
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="text-center text-gray-600">
                      Veuillez glisser et déposez votre fichier CSV ou PDF{" "}
                    </p>
                    {file && (
                      <p className="text-center text-green-600">
                        Fichier sélectionné : {file.name}
                      </p>
                    )}
                    {fileError && (
                      <p className="text-center text-red-600">{fileError}</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </ContextMenuTrigger>
        </ContextMenu>
        <Button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? "Analyse en cours..." : "Analyser"}
        </Button>
        <div className="flex justify-center mt-4">
          <Link href="/workflow">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
