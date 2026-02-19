// src/components/bewertung/StepComparative.jsx - FINAL
import { useState, useMemo } from "react";
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
  const comparables = data?.comparative?.comparables ?? [
    { ...DEFAULT_COMPARABLE },
  ];
  const [showHelp, setShowHelp] = useState(false);

  const updateComparable = (index, field, value) => {
    const updated = [...comparables];
    if (field === "purchasePrice") {
      // Remove any non-digit characters except minus and decimal point
      const cleaned = value.replace(/[^\d.-]/g, "");
      const num = cleaned === "" ? 0 : Number(cleaned);
      updated[index][field] = isNaN(num) ? 0 : num;
    } else {
      updated[index][field] = value === "" ? 1.0 : parseFloat(value) || 1.0;
    }
    setData((prev) => ({
      ...prev,
      comparative: {
        ...(prev.comparative || {}),
        comparables: updated,
      },
    }));
  };

  const addComparable = () => {
    if (comparables.length >= 5) return;
    setData((prev) => ({
      ...prev,
      comparative: {
        ...(prev.comparative || {}),
        comparables: [...comparables, { ...DEFAULT_COMPARABLE }],
      },
    }));
  };

  const removeComparable = (index) => {
    if (comparables.length <= 1) return;
    setData((prev) => ({
      ...prev,
      comparative: {
        ...(prev.comparative || {}),
        comparables: comparables.filter((_, i) => i !== index),
      },
    }));
  };

  const { adjustedPrices, comparativeValue, validComparables } = useMemo(() => {
    const prices = comparables.map((comp) => {
      const price = Number(comp.purchasePrice) || 0;
      if (price <= 0) return 0;
      const factor =
        (comp.afLocation || 1.0) *
        (comp.afSize || 1.0) *
        (comp.afCondition || 1.0) *
        (comp.afEquipment || 1.0) *
        (comp.afTime || 1.0);
      return Math.round(price * factor);
    });
    const valid = prices.filter((v) => v > 0);
    const avg =
      valid.length > 0
        ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
        : 0;
    return {
      adjustedPrices: prices,
      comparativeValue: avg,
      validComparables: valid.length,
    };
  }, [comparables]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Vergleichswertverfahren</h3>
          <p className="text-textMuted mt-1">
            Erfassen Sie vergleichbare Immobilien aus Ihrer Region
          </p>
        </div>
        <ValidationBadge valid={validComparables > 0} />
      </div>

      {/* HELP */}
      <div className="bg-gray-50 rounded-lg p-4">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex justify-between w-full"
        >
          <span className="font-medium">
            ℹ️ Wie funktionieren die Anpassungsfaktoren?
          </span>
          <span>{showHelp ? "▲" : "▼"}</span>
        </button>
        {showHelp && (
          <div className="mt-3 text-sm text-textMuted space-y-1">
            <p>
              <strong>1.0</strong> = durchschnittlich / vergleichbar
            </p>
            <p>
              <strong>&gt;1.0</strong> = besser (erhöht den Preis)
            </p>
            <p>
              <strong>&lt;1.0</strong> = schlechter (mindert den Preis)
            </p>
            <p className="mt-2 text-xs">Erlaubter Bereich: 0.5 – 2.0</p>
          </div>
        )}
      </div>

      {/* COMPARABLES */}
      {comparables.map((comp, index) => (
        <div key={index} className="border rounded-xl p-5 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Vergleichsobjekt {index + 1}</h4>
            {comparables.length > 1 && (
              <button
                onClick={() => removeComparable(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Entfernen
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Kaufpreis (€) *
              </label>
              <input
                type="number"
                step="1000"
                value={comp.purchasePrice || ""}
                onChange={(e) =>
                  updateComparable(index, "purchasePrice", e.target.value)
                }
                className="input"
                placeholder="z.B. 350000"
              />
            </div>
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Lagefaktor
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="2"
                value={comp.afLocation}
                onChange={(e) =>
                  updateComparable(index, "afLocation", e.target.value)
                }
                className="input"
                placeholder="1.0"
              />
            </div>
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Größenfaktor
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="2"
                value={comp.afSize}
                onChange={(e) =>
                  updateComparable(index, "afSize", e.target.value)
                }
                className="input"
                placeholder="1.0"
              />
            </div>
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Zustandsfaktor
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="2"
                value={comp.afCondition}
                onChange={(e) =>
                  updateComparable(index, "afCondition", e.target.value)
                }
                className="input"
                placeholder="1.0"
              />
            </div>
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Ausstattungsfaktor
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="2"
                value={comp.afEquipment}
                onChange={(e) =>
                  updateComparable(index, "afEquipment", e.target.value)
                }
                className="input"
                placeholder="1.0"
              />
            </div>
            <div>
              <label className="block text-xs text-textMuted mb-1">
                Zeitfaktor (Preisentwicklung)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="2"
                value={comp.afTime}
                onChange={(e) =>
                  updateComparable(index, "afTime", e.target.value)
                }
                className="input"
                placeholder="1.0"
              />
            </div>
          </div>

          <div className="mt-4 text-sm bg-gray-50 p-3 rounded">
            Angepasster Vergleichspreis:{" "}
            <strong className="text-primary">
              {adjustedPrices[index]?.toLocaleString("de-DE") || 0} €
            </strong>
          </div>
        </div>
      ))}

      {/* ADD BUTTON */}
      {comparables.length < 5 && (
        <button
          onClick={addComparable}
          className="text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          + Weiteres Vergleichsobjekt hinzufügen
        </button>
      )}

      {/* SUMMARY */}
      {validComparables > 0 && (
        <div className="bg-primaryLighter p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Vergleichswert (Mittelwert)</span>
            <span className="text-xl font-bold text-primary">
              {comparativeValue.toLocaleString("de-DE")} €
            </span>
          </div>
          <p className="text-xs text-textMuted mt-1">
            Basierend auf {validComparables} Vergleichsobjekt(en)
          </p>
        </div>
      )}
    </div>
  );
}
