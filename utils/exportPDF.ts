import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportDivsToPDF = async (urls: string[], tag: string) => {
  const pdf = new jsPDF();

  for (const url of urls) {
	console.log(url)
    // Récupérer le contenu de la page
    const response = await fetch(url);
    const html = await response.text();

    // Créer un conteneur temporaire pour le contenu récupéré
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;

    // Sélectionner les divs avec le tag spécifié
    const elements = tempContainer.querySelectorAll(tag);

    for (let i = 0; i < elements.length; i++) {
      const canvas = await html2canvas(elements[i] as HTMLElement);
      const imgData = canvas.toDataURL('image/png');

      if (i > 0 || url !== urls[0]) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    }
  }

  pdf.save('exported_elements.pdf');
};