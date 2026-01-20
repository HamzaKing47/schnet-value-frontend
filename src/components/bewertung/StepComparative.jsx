import { useState } from "react";
import ValidationBadge from "./ValidationBadge";

const DEFAULT_COMPARABLE = {
  purchasePrice: 0,
  afLocation: 1.0,
  afSize: 1.0,
  afCondition: 1.0,
  afEquipment: 1.0,
  afTime: 1.0,
};

export default function StepComparative({ data, setData, errors = {} }) {
  const comparables = data?.comparative?.comparables || [{ ...DEFAULT_COMPARABLE }];
  const [showHelp, setShowHelp] = useState(false);

  const updateComparable = (index, field, value) => {
    const updated = [...comparables];
    updated[index] = {
      ...updated[index],
      [field]: value === "" ? 0 : Number(value) || 0, // Ensure always a number
    };

    setData(prev => ({
      ...prev,
      comparative: { comparables: updated },
    }));
  };

  const addComparable = () => {
    if (comparables.length >= 5) return;
    setData(prev => ({
      ...prev,
      comparative: {
        comparables: [...comparables, { ...DEFAULT_COMPARABLE }],
      },
    }));
  };

  const removeComparable = (index) => {
    if (comparables.length <= 1) return;
    setData(prev => ({
      ...prev,
      comparative: {
        comparables: comparables.filter((_, i) => i !== index),
      },
    }));
  };

  const isComparableValid = (comp) => {
    return comp.purchasePrice && comp.purchasePrice > 0;
  };

  const validComparables = comparables.filter(isComparableValid).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-textDark">
            Vergleichswertverfahren
          </h3>
          <p className="text-textMuted mt-1">
            Erfassen Sie vergleichbare Immobilien aus Ihrer Region
          </p>
        </div>
        <ValidationBadge valid={validComparables > 0} />
      </div>

      {/* Help Toggle */}
      <div className="bg-gray-50 rounded-lg p-4">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-textDark">
            ℹ️ Wie funktionieren die Anpassungsfaktoren?
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              showHelp ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showHelp && (
          <div className="mt-4 space-y-3 text-sm text-textMuted">
            <p><strong>Lagefaktor:</strong> 1.0 = vergleichbar, {'>'}1.0 = bessere Lage, {'<'}1.0 = schlechtere Lage</p>
            <p><strong>Größenfaktor:</strong> Berücksichtigt Größenunterschiede</p>
            <p><strong>Zustandsfaktor:</strong> 1.0 = vergleichbarer Zustand, {'>'}1.0 = besserer Zustand</p>
            <p><strong>Ausstattungsfaktor:</strong> Unterschiede in der Ausstattung</p>
            <p><strong>Zeitfaktor:</strong> Marktentwicklung seit Kauf (z.B. 1.02 für 2% Steigung)</p>
          </div>
        )}
      </div>

      {/* Comparables List */}
      <div className="space-y-6">
        {comparables.map((comp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-textDark">
                Vergleichsobjekt {index + 1}
              </h4>
              {comparables.length > 1 && (
                <button
                  onClick={() => removeComparable(index)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Entfernen
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Kaufpreis (€) *
                </label>
                <input
                  type="number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors[`comp_${index}_price`] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="350.000"
                  value={comp.purchasePrice || 0}
                  onChange={(e) =>
                    updateComparable(index, "purchasePrice", e.target.value)
                  }
                />
                {errors[`comp_${index}_price`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`comp_${index}_price`]}</p>
                )}
              </div>

              {/* Adjustment Factors */}
              {["afLocation", "afSize", "afCondition", "afEquipment", "afTime"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    {getFactorLabel(field)}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    max="2.0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="1.0"
                    value={comp[field] || 1.0}
                    onChange={(e) =>
                      updateComparable(index, field, e.target.value)
                    }
                  />
                  <div className="text-xs text-textMuted mt-1">
                    {getFactorDescription(field)}
                  </div>
                </div>
              ))}
            </div>

            {/* Factor visualization */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-textMuted">
                <div className="flex items-center justify-between">
                  <span>Angepasster Preis:</span>
                  <span className="font-medium text-textDark">
                    {calculateAdjustedPrice(comp).toLocaleString("de-DE")} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add comparable button */}
      <button
        onClick={addComparable}
        disabled={comparables.length >= 5}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-textMuted hover:border-gray-400 hover:text-textDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Weitere Vergleichsimmobilie hinzufügen
          <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
            {comparables.length}/5
          </span>
        </div>
      </button>

      {/* Summary */}
      <div className="bg-primaryLighter border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-textDark">
              {validComparables} von {comparables.length} Vergleichsobjekten vollständig
            </p>
            <p className="text-sm text-textMuted mt-1">
              Mindestens 1 Vergleichsobjekt wird für eine aussagekräftige Bewertung benötigt.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {validComparables > 0 ? "✓ Bereit" : "⚠ Fehlend"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getFactorLabel(field) {
  const labels = {
    afLocation: "Lagefaktor",
    afSize: "Größenfaktor",
    afCondition: "Zustandsfaktor",
    afEquipment: "Ausstattungsfaktor",
    afTime: "Zeitfaktor",
  };
  return labels[field] || field;
}

function getFactorDescription(field) {
  const descriptions = {
    afLocation: "1.0 = vergleichbare Lage",
    afSize: "1.0 = vergleichbare Größe",
    afCondition: "1.0 = vergleichbarer Zustand",
    afEquipment: "1.0 = vergleichbare Ausstattung",
    afTime: "1.0 = gleicher Zeitpunkt",
  };
  return descriptions[field] || "";
}

function calculateAdjustedPrice(comp) {
  if (!comp.purchasePrice || comp.purchasePrice <= 0) return 0;
  
  const factors = comp.afLocation * comp.afSize * comp.afCondition * comp.afEquipment * comp.afTime;
  return Math.round(comp.purchasePrice / factors);
}