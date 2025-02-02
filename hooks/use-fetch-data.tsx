import { useState, useEffect } from "react";

interface DataItem {
  date: string;
  territoire: string;
  sujet: string;
  theme: string;
  sous_theme: string;
  qualite_retour: string;
  media: string;
  articles: string;
  auteur_nom: string;
  auteur_autorite: string;
  partage: number;
  likes: number;
  mentions: number;
  commentaires: number;
  contenu_type: string;
  global_sentiment: string;
  tonalite: string;
  emotions: string;
  opportunite: string;
}

interface DataResponse {
  data: DataItem[];
}

export function useFetchData() {
  const [data, setData] = useState<DataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/data.json");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Une erreur est survenue")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}
