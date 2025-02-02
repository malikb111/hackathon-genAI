export const convertToCSV = (data: any[]): string => {
	console.log("is converting to csv");
	if (data.length === 0) return '';
	
	// Obtenir les en-têtes à partir des clés du premier objet
	const headers = Object.keys(data[0]);
	
	// Créer la ligne d'en-tête
	const csvRows = [headers.join(',')];
	
	// Ajouter les lignes de données
	for (const row of data) {
	  const values = headers.map(header => {
		const val = row[header];
		// Échapper les virgules et les guillemets si nécessaire
		return `"${String(val).replace(/"/g, '""')}"`;
	  });
	  csvRows.push(values.join(','));
	}
	
	return csvRows.join('\n');
  };
  
  export const downloadCSV = (data: any[], filename: string = 'export.csv') => {
	  const csv = convertToCSV(data);
	  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
	  const link = document.createElement('a');
  
	  link.href = URL.createObjectURL(blob);
	  link.setAttribute('download', filename);
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
  };