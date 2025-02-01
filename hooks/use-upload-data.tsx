// code ici la logique d'upload de donnees
// tu fais un custom hook
import { useState } from "react";

interface useFileUpload {
	uploadFile: (file: File) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

export default function useFileUpload(apiEndpoint: string) : useFileUpload{
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	
	const uploadFile = async (file: File) => {
		setIsloading(true);
		setError(null);

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				body: formData,
			});
			if (!response.ok)
				throw new Error('Failed to upload file');
			console.log('File uploaded successfully');
		} catch (err) {
			setError ((err as Error).message);
		} finally {
			setIsloading(false);
		}
	};
	return { uploadFile, isLoading, error};
}