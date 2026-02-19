import Layout from "../Layout";
import ValuationCharts from "./ValuationCharts.jsx";
import { saveValuation } from "../../api/valuation.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Result({ result, onReset }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!result) {
    return (
      <Layout>
        <div className="text-center text-gray-500">
          Kein Bewertungsergebnis verfügbar.
        </div>
      </Layout>
    );
  }

  const {
    marketValue = null,
    breakdown = {},
    weights = {},
    methods = {},
    inputData = {},
  } = result;

  const usedMethodsCount = Object.values(methods).filter(Boolean).length;

  const handleSave = async () => {
    try {
      const payload = {
        propertyType: inputData.propertyType,
        address: inputData.address || "Unbekannte Adresse",
        data: inputData,
        result: {
          marketValue,
          breakdown,
          weights,
          methods,
        },
      };
      const res = await saveValuation(payload);
      if (res.success) {
        toast.success("Bewertung gespeichert!");
        navigate("/dashboard");
      } else {
        toast.error("Fehler beim Speichern");
      }
    } catch (err) {
      toast.error("Fehler beim Speichern");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-textDark mb-2">
            Bewertungsergebnis
          </h1>
          <p className="text-textMuted">Marktwertermittlung gemäß ImmoWertV</p>
        </div>

        {/* Market Value */}
        <div className="bg-primary text-white rounded-2xl p-8 mb-10 shadow-xl text-center">
          <p className="text-sm uppercase tracking-wide opacity-80">
            Ermittelter Marktwert
          </p>
          <p className="text-4xl font-extrabold mt-2">
            {formatCurrency(marketValue)}
          </p>
        </div>

        {/* Methods Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <MethodCard
            title="Vergleichswertverfahren"
            value={methods?.comparative ? breakdown?.comparativeValue : null}
            weight={methods?.comparative ? weights?.comparative : null}
            active={methods?.comparative === true}
          />

          <MethodCard
            title="Ertragswertverfahren"
            value={methods?.income ? breakdown?.incomeValue : null}
            weight={methods?.income ? weights?.income : null}
            active={methods?.income === true}
          />

          <MethodCard
            title="Sachwertverfahren"
            value={methods?.cost ? breakdown?.costValue : null}
            weight={methods?.cost ? weights?.cost : null}
            active={methods?.cost === true}
          />
        </div>

        {/* Charts (only if at least one method used) */}
        {usedMethodsCount > 0 && (
          <div className="w-full min-h-[400px] h-[400px] relative mb-10">
            <ValuationCharts result={result} />
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 text-sm text-gray-700">
          <p className="mb-2 font-semibold">Hinweis</p>
          <p>
            Der Marktwert wurde durch gewichtete Zusammenführung der anwendbaren
            Bewertungsverfahren ermittelt. Nicht relevante Verfahren wurden
            automatisch ausgeschlossen.
          </p>
        </div>

        {/* Quality */}
        <div className="mb-10">
          <p className="font-semibold mb-1">Bewertungsqualität</p>
          <p className="text-sm text-textMuted mb-2">
            Verwendete Verfahren: <strong>{usedMethodsCount} von 3</strong>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(usedMethodsCount / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                  `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/pdf/valuation`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/pdf",
                      ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify({
                      marketValue,
                      breakdown,
                      weights,
                      propertyType: inputData.propertyType,
                      spf: inputData.spf || 0,
                    }),
                  },
                );

                if (!res.ok) {
                  let errorMsg = "PDF generation failed";
                  try {
                    const errorData = await res.json();
                    errorMsg = errorData.error || errorMsg;
                  } catch {
                    // response not JSON
                  }
                  throw new Error(errorMsg);
                }

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Immobilienbewertung.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("PDF download error:", err);
                alert(`Fehler: ${err.message}`);
              }
            }}
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            PDF herunterladen
          </button>

          <button
            onClick={handleSave}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Speichern
          </button>

          <button
            onClick={onReset}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors"
          >
            Neue Bewertung starten
          </button>
        </div>
      </div>
    </Layout>
  );
}

function MethodCard({ title, value, weight, active }) {
  return (
    <div
      className={`rounded-xl p-6 shadow-md transition-all ${
        active ? "bg-white border border-gray-200" : "bg-gray-100 opacity-50"
      }`}
    >
      <h3 className="font-semibold text-textDark mb-4">{title}</h3>

      <div className="mb-2">
        <span className="text-sm text-textMuted">Ergebnis</span>
        <p className="text-xl font-bold">
          {active && typeof value === "number"
            ? formatCurrency(value)
            : "Nicht angewendet"}
        </p>
      </div>

      <div className="text-sm text-textMuted">
        Gewichtung:{" "}
        <span className="font-medium">
          {active && typeof weight === "number"
            ? `${Math.round(weight * 100)} %`
            : "—"}
        </span>
      </div>
    </div>
  );
}