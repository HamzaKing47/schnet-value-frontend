import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateValuationPDF(result, data) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Immobilienbewertung (ImmoWertV)", 14, 20);

  doc.setFontSize(12);
  doc.text(`Objekttyp: ${data.propertyType}`, 14, 32);
  doc.text(`Bewertungsdatum: ${new Date().toLocaleDateString("de-DE")}`, 14, 40);

  autoTable(doc, {
    startY: 50,
    head: [["Bewertungsmethode", "Wert (€)"]],
    body: [
      ["Vergleichswert", format(result.breakdown?.comparativeValue)],
      ["Ertragswert", format(result.breakdown?.incomeValue)],
      ["Sachwert", format(result.breakdown?.costValue)],
      ["Marktwert", format(result.marketValue)],
    ],
  });

  doc.setFontSize(10);
  doc.text(
    "Hinweis: Diese Bewertung wurde gemäß ImmoWertV automatisiert berechnet.",
    14,
    doc.lastAutoTable.finalY + 15
  );

  doc.save("Immobilienbewertung.pdf");
}

function format(value) {
  if (!value || isNaN(value)) return "—";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
