export const normalizeString = (str: string): string => {
  return str
    .trim() // Enlève les espaces début/fin
    .toLowerCase() // Met tout en minuscules
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/[^a-z0-9\s-]/g, "") // Garde uniquement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, " ") // Remplace multiples espaces par un seul
    .trim(); // Enlève encore les espaces début/fin au cas où
};

export const normalizeDataItem = (item: any) => {
  // Crée une copie de l'objet pour ne pas modifier l'original
  const normalizedItem = { ...item };

  // Normalise le champ Média
  if (normalizedItem.Média) {
    // Garde la version originale et ajoute une version normalisée
    normalizedItem.originalMedia = normalizedItem.Média;
    normalizedItem.Média = normalizeString(normalizedItem.Média);
  }

  // Normalise le champ Territoire
  if (normalizedItem.Territoire) {
    normalizedItem.Territoire = normalizedItem.Territoire.trim();
  }

  // Ajoute d'autres champs à normaliser si nécessaire

  return normalizedItem;
};

export const normalizeData = (data: any[]): any[] => {
  return data.map(normalizeDataItem);
};
