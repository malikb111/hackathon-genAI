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
    normalizedItem.originalMedia = normalizedItem.Média;
    normalizedItem.Média = normalizeString(normalizedItem.Média);
  }

  // Normalise le champ Territoire
  if (normalizedItem.Territoire) {
    normalizedItem.originalTerritoire = normalizedItem.Territoire;
    normalizedItem.Territoire = normalizeString(normalizedItem.Territoire);
  }

  // Normalise le champ Sentiment global
  if (normalizedItem["Sentiment global"]) {
    normalizedItem.originalSentiment = normalizedItem["Sentiment global"];
    normalizedItem["Sentiment global"] = normalizeString(
      normalizedItem["Sentiment global"]
    );
  }

  // Normalise le champ Sujet
  if (normalizedItem.Sujet) {
    normalizedItem.originalSujet = normalizedItem.Sujet;
    normalizedItem.Sujet = normalizeString(normalizedItem.Sujet);
  }

  // Normalise le champ Sujet Gen
  if (normalizedItem["Sujet Gen"]) {
    normalizedItem.originalSujetGen = normalizedItem["Sujet Gen"];
    normalizedItem["Sujet Gen"] = normalizeString(normalizedItem["Sujet Gen"]);
  }

  // Normalise le champ Thème
  if (normalizedItem.Thème) {
    normalizedItem.originalTheme = normalizedItem.Thème;
    normalizedItem.Thème = normalizeString(normalizedItem.Thème);
  }

  // Normalise le champ Qualité du retour
  if (normalizedItem["Qualité du retour"]) {
    normalizedItem.originalQualite = normalizedItem["Qualité du retour"];
    normalizedItem["Qualité du retour"] = normalizeString(
      normalizedItem["Qualité du retour"]
    );
  }

  // Normalise le champ Type de Contenu
  if (normalizedItem["Type de Contenu"]) {
    normalizedItem.originalTypeContenu = normalizedItem["Type de Contenu"];
    normalizedItem["Type de Contenu"] = normalizeString(
      normalizedItem["Type de Contenu"]
    );
  }

  // Normalise le champ Tendance
  if (normalizedItem.Tendance) {
    normalizedItem.originalTendance = normalizedItem.Tendance;
    normalizedItem.Tendance = normalizeString(normalizedItem.Tendance);
  }

  // Normalise le champ Tonalite
  if (normalizedItem.Tonalite) {
    normalizedItem.originalTonalite = normalizedItem.Tonalite;
    normalizedItem.Tonalite = normalizeString(normalizedItem.Tonalite);
  }

  // Normalise le champ Emotions
  if (normalizedItem.Emotions) {
    normalizedItem.originalEmotions = normalizedItem.Emotions;
    normalizedItem.Emotions = normalizeString(normalizedItem.Emotions);
  }

  // Normalise le champ Opportunite
  if (normalizedItem.Opportunite) {
    normalizedItem.originalOpportunite = normalizedItem.Opportunite;
    normalizedItem.Opportunite = normalizeString(normalizedItem.Opportunite);
  }

  // Normalise le champ Articles
  if (normalizedItem.Articles) {
    normalizedItem.originalArticles = normalizedItem.Articles;
    normalizedItem.Articles = normalizeString(normalizedItem.Articles);
  }

  // Normalise le champ Typologie
  if (normalizedItem.Typologie) {
    normalizedItem.originalTypologie = normalizedItem.Typologie;
    normalizedItem.Typologie = normalizeString(normalizedItem.Typologie);
  }

  return normalizedItem;
};

export const normalizeData = (data: any[]): any[] => {
  return data.map(normalizeDataItem);
};
