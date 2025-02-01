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
import { Input } from "@/components/ui/input"
import { DialogDescription } from "@radix-ui/react-dialog";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
  } from "@/components/ui/context-menu"

export function AddDataModal() {
  // tu utilise ici le custom hook que t'aura fais genre useUploadData

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
				<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
					{({getRootProps, getInputProps}) => (
						<section>
							<div {...getRootProps()}>
        						<input {...getInputProps()} />
        						<p className="text-center text-gray-600">Veuillez glisser et déposez votre fichier CSV ou PDF </p>
		      				</div>
						</section>
					)}
				</Dropzone>
			</ContextMenuTrigger>
		</ContextMenu>
		<Button >Générer</Button>
      </DialogContent>
    </Dialog>
  );
}
