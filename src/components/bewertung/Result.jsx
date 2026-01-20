import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ValuationCharts from "./ValuationCharts";
import { generateValuationPDF } from "../../utils/pdfGenerator";
import { getWeights } from "../../utils/valuationWeights";
import { formatCurrency } from "../../utils/format";

const COLORS = ["#058996", "#16a34a", "#f59e0b", "#8b5cf6"];

export default function Result({ result, onReset }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  if (!result || !result.marketValue) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>No valuation results available.</strong> Please go back and ensure you've entered data in at least one valuation method.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    marketValue,
    breakdown: {
      comparativeValue,
      incomeValue,
      costValue,
    } = {},
    inputData,
  } = result;

  const weights = getWeights(inputData?.propertyType, inputData);
  const confidence = calculateConfidence(result);

  // Prepare data for charts - only include methods with actual values
  const methodValues = [
    { name: "Vergleichswert", value: comparativeValue || 0, color: COLORS[0] },
    { name: "Ertragswert", value: incomeValue || 0, color: COLORS[1] },
    { name: "Sachwert", value: costValue || 0, color: COLORS[2] },
  ].filter(item => item.value > 0);

  const barChartData = [
    { method: "Vergleich", value: comparativeValue || 0 },
    { method: "Ertrag", value: incomeValue || 0 },
    { method: "Sachwert", value: costValue || 0 },
    { method: "Marktwert", value: marketValue || 0 },
  ].filter(item => item.value > 0);

  // If all values are 0 or negative, show a fallback
  const hasValidData = barChartData.some(item => item.value > 0);

  const handleGeneratePDF = async () => {
    setGeneratingPDF(true);
    try {
      await generateValuationPDF(result, inputData);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.");
    } finally {
      setGeneratingPDF(false);
    }
  };

  const getRecommendation = () => {
    const values = methodValues.map(v => v.value);
    if (values.length === 0) return "";
    
    const maxValue = Math.max(...values);
    const maxMethod = methodValues.find(v => v.value === maxValue);
    
    if (maxMethod.name === "Vergleichswert") {
      return "Die Bewertung stützt sich hauptsächlich auf Vergleichspreise aus der Region. Dies ist typisch für Wohnungen und Häuser in etablierten Gebieten.";
    } else if (maxMethod.name === "Ertragswert") {
      return "Die Ertragswertermittlung dominiert die Bewertung, was bei vermieteten Objekten üblich ist. Die Mieteinnahmen sind entscheidend.";
    } else {
      return "Der Sachwert ist führend, typisch für Einfamilienhäuser oder spezielle Objekte. Die Baukosten und das Grundstück sind ausschlaggebend.";
    }
  };

  if (!hasValidData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Keine gültigen Bewertungsergebnisse.</strong> Die Berechnung ergab keine positiven Werte. Bitte überprüfen Sie Ihre Eingabedaten.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-textDark mb-2">
          Bewertungsergebnis
        </h1>
        <p className="text-textMuted">
          Professionelle Immobilienbewertung nach ImmoWertV
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {["summary", "details", "charts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-textMuted hover:text-textDark hover:border-gray-300"
              }`}
            >
              {tab === "summary" && "Zusammenfassung"}
              {tab === "details" && "Detailauswertung"}
              {tab === "charts" && "Diagramme"}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="p-6 md:p-8">
            {/* Market Value Highlight */}
            <div className="bg-gradient-to-r from-primaryLighter to-white border border-primary/20 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary mb-1">ERMITTELTER MARKTWERT</div>
                  <div className="text-3xl md:text-4xl font-bold text-textDark mb-2">
                    {formatCurrency(marketValue)}
                  </div>
                  <div className="text-textMuted">
                    Berechnet am {new Date().toLocaleDateString("de-DE")}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium ${
                    confidence === "High" ? "bg-green-500" :
                    confidence === "Medium" ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}>
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    {confidence === "High" ? "Hohe Aussagekraft" :
                     confidence === "Medium" ? "Mittlere Aussagekraft" :
                     "Eingeschränkte Aussagekraft"}
                  </div>
                </div>
              </div>
            </div>

            {/* Method Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {comparativeValue > 0 && (
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-[#058996] rounded-full mr-3"></div>
                    <h3 className="font-semibold text-textDark">Vergleichswert</h3>
                  </div>
                  <div className="text-2xl font-bold text-textDark mb-2">
                    {formatCurrency(comparativeValue)}
                  </div>
                  <div className="text-sm text-textMuted">
                    {weights.comparative > 0 ? `${Math.round(weights.comparative * 100)}% Gewichtung` : "Nicht berücksichtigt"}
                  </div>
                </div>
              )}

              {incomeValue > 0 && (
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-[#16a34a] rounded-full mr-3"></div>
                    <h3 className="font-semibold text-textDark">Ertragswert</h3>
                  </div>
                  <div className="text-2xl font-bold text-textDark mb-2">
                    {formatCurrency(incomeValue)}
                  </div>
                  <div className="text-sm text-textMuted">
                    {weights.income > 0 ? `${Math.round(weights.income * 100)}% Gewichtung` : "Nicht berücksichtigt"}
                  </div>
                </div>
              )}

              {costValue > 0 && (
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-[#f59e0b] rounded-full mr-3"></div>
                    <h3 className="font-semibold text-textDark">Sachwert</h3>
                  </div>
                  <div className="text-2xl font-bold text-textDark mb-2">
                    {formatCurrency(costValue)}
                  </div>
                  <div className="text-sm text-textMuted">
                    {weights.cost > 0 ? `${Math.round(weights.cost * 100)}% Gewichtung` : "Nicht berücksichtigt"}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Bewertungshinweis
              </h3>
              <p className="text-blue-700">{getRecommendation()}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGeneratePDF}
                disabled={generatingPDF}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-colors flex items-center justify-center"
              >
                {generatingPDF ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PDF wird erstellt...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF Bericht herunterladen
                  </>
                )}
              </button>
              
              <button
                onClick={onReset}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Neue Bewertung starten
              </button>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === "details" && (
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Summary */}
              <div>
                <h3 className="font-semibold text-textDark mb-4">Eingabedaten</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-textMuted">Objekttyp</span>
                    <span className="font-medium">{getPropertyTypeLabel(inputData?.propertyType)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-textMuted">Sonderposten-Faktor</span>
                    <span className="font-medium">{formatCurrency(inputData?.spf || 0)}</span>
                  </div>
                  {inputData?.comparative && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-textMuted">Vergleichsobjekte</span>
                      <span className="font-medium">{inputData.comparative.comparables?.length || 0}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Weight Distribution */}
              <div>
                <h3 className="font-semibold text-textDark mb-4">Bewertungsgewichtung</h3>
                <div className="space-y-3">
                  {weights.comparative > 0 && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-textDark">Vergleichswertverfahren</span>
                        <span className="text-sm font-medium">{Math.round(weights.comparative * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#058996] h-2 rounded-full"
                          style={{ width: `${weights.comparative * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {weights.income > 0 && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-textDark">Ertragswertverfahren</span>
                        <span className="text-sm font-medium">{Math.round(weights.income * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#16a34a] h-2 rounded-full"
                          style={{ width: `${weights.income * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {weights.cost > 0 && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-textDark">Sachwertverfahren</span>
                        <span className="text-sm font-medium">{Math.round(weights.cost * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#f59e0b] h-2 rounded-full"
                          style={{ width: `${weights.cost * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === "charts" && (
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart - Only show if we have multiple methods */}
              {methodValues.length > 1 && (
                <div>
                  <h3 className="font-semibold text-textDark mb-4">Verfahrensanteile</h3>
                  <div style={{ height: '300px', minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                      <PieChart>
                        <Pie
                          data={methodValues}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {methodValues.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Bar Chart */}
              <div>
                <h3 className="font-semibold text-textDark mb-4">Wertvergleich</h3>
                <div style={{ height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="method" />
                      <YAxis 
                        tickFormatter={(value) => 
                          value >= 1000000 
                            ? `${(value / 1000000).toFixed(1)}M €` 
                            : value >= 1000 
                              ? `${(value / 1000).toFixed(0)}k €` 
                              : `${value} €`
                        }
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), "Wert"]}
                        labelFormatter={(label) => `${label}verfahren`}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]}
                        fill="#058996"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Additional Charts - Only show if we have data */}
            {methodValues.length > 0 && (
              <div className="mt-8">
                <ValuationCharts result={result} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-sm text-textMuted">
        <p>
          Diese Bewertung erfolgte gemäß Immobilienwertermittlungsverordnung (ImmoWertV) und dient als erste Orientierung.
          Für eine rechtsverbindliche Bewertung konsultieren Sie bitte einen zertifizierten Sachverständigen.
        </p>
      </div>
    </div>
  );
}

function calculateConfidence(result) {
  let score = 0;
  const { breakdown } = result;

  if (breakdown?.comparativeValue && breakdown.comparativeValue > 0) score += 40;
  if (breakdown?.incomeValue && breakdown.incomeValue > 0) score += 35;
  if (breakdown?.costValue && breakdown.costValue > 0) score += 25;

  if (score >= 80) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

function getPropertyTypeLabel(type) {
  const labels = {
    Condominium: "Wohnung",
    SingleFamilyHome: "Einfamilienhaus",
    MultiFamilyBuilding: "Mehrfamilienhaus",
    Land: "Bauland",
  };
  return labels[type] || type;
}