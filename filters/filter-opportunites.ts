export const filterOpportunites = (
  data: any[] | null
): { [key: string]: number } => {
  if (!data) return {};

  // Créer un objet pour stocker les opportunités et leur nombre d'occurrences
  const opportunitesCount = data.reduce(
    (acc: { [key: string]: number }, item) => {
      const opportunite = item.opportunite;

      // Si l'opportunité existe déjà, incrémenter le compteur
      // Sinon, initialiser à 1
      if (opportunite) {
        acc[opportunite] = (acc[opportunite] || 0) + 1;
      }

      return acc;
    },
    {}
  );

  return opportunitesCount;
};
