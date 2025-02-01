import { useState, useEffect } from "react";

type MediaTypes = {
  [key: string]: string[];
};

export function useFetchMediaTypes() {
  const [mediaTypes, setMediaTypes] = useState<MediaTypes>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMediaTypes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/mock/media-types.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des médias");
        }
        const data = await response.json();
        setMediaTypes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Une erreur est survenue")
        );
        console.error("Erreur lors du chargement des médias:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaTypes();
  }, []);

  return { mediaTypes, isLoading, error };
}
