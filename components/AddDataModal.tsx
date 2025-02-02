"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from 'react'
import Dropzone from 'react-dropzone'
import {
	ContextMenu,
	ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import useFileUpload from "@/hooks/use-upload-data";
import { useState } from "react";
import { downloadCSV } from "@/utils/csv";
import { downloadXLSX } from "@/utils/xlsx";
import { Download } from "lucide-react";

export function AddDataModal() {
	// tu utilise ici le custom hook que t'aura fais genre useUploadData
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);
	const [data, setData] = useState<any[] | null>(null);
	const { uploadFile, isLoading } = useFileUpload();

	const handleFileDrop = (droppedFile: Array<File>) => {
		const file = droppedFile[0];
		if (file && (file.type === 'application/pdf' || file.name.endsWith('.xlsx'))) {
		  setFile(file);
		  setFileError(null);
		  setData(null); // Réinitialiser les données lors du dépôt d'un nouveau fichier
		} else {
		  setFileError('Veuillez déposer un fichier XLSX ou PDF');
		}
	};

	const handleUpload = async () => {
	  if (file) {
		const result = await uploadFile(file);
		console.log("Upload result:", result); // Pour déboguer
		if (result) {
		  setData(result);
		}
		else
			console.log("No file ligne 48")
	  }
	};

	const handleDownload = () => {
		if (data) {
			console.log("Call downloadCsv ligne 54");
			downloadCSV(data, `export-${new Date().toISOString()}.csv`);
		}
		else
			console.log("No data ligne 58");
	};

	const handleDownloadXLSX = () => {
		if (data) {
			console.log("Call downloadXLSX");
			downloadXLSX(data, `export-${new Date().toISOString()}.xlsx`);
		} else {
			console.log("No data for XLSX export");
		}
	};

	const handleRemoveFile = () => {
		setFile(null);
		setFileError(null);
		setData(null);
	}

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
						{({getRootProps, getInputProps}) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p className="text-center text-gray-600">Veuillez glisser et déposez votre fichier CSV ou PDF </p>
									{file && (
											<p className="text-center text-green-600">Fichier sélectionné : {file.name}</p>
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
			<div className="flex gap-2">
				<Button onClick={handleUpload} disabled={isLoading} className="flex-1">
					{isLoading ? 'Analyse en cours...' : 'Analyser'}
				</Button>
				{data && data.length > 0 && (
					<div className="flex gap-2">
						<Button
							onClick={handleDownload}
							variant="outline"
							className="gap-2"
						>
							<Download className="w-4 h-4" />
							CSV
						</Button>
						<Button 
							onClick={handleDownloadXLSX}
							variant="outline"
							className="gap-2"
						>
						<Download className="w-4 h-4" />
							XLS
						</Button>
					</div>
				)}
			</div>
		</DialogContent>
	</Dialog>
  );
}
