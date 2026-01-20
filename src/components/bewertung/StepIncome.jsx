export default function StepIncome({ data, setData, errors = {} }) {
  // Ensure income data always exists with defaults
  const income = data?.income || {
    plotArea: 0,
    landValueRate: 400,
    livingArea: 0,
    rentPerSqm: 0,
    capitalizationRate: 0.035,
    remainingUsefulLife: 50,
    operatingCosts: {
      administration: 300,
      maintenancePerSqm: 10,
      vacancyRate: 0.03,
    },
    marketAdjustmentFactor: 1.0,
  };

  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      income: {
        ...(prev.income || {}),
        [field]: value === "" ? 0 : Number(value) || 0,
      },
    }));
  };

  const updateOperatingCosts = (field, value) => {
    setData(prev => ({
      ...prev,
      income: {
        ...(prev.income || {}),
        operatingCosts: {
          ...(prev.income?.operatingCosts || {}),
          [field]: value === "" ? 0 : Number(value) || 0,
        },
      },
    }));
  };

  // Calculate annual income
  const calculateAnnualIncome = () => {
    if (!income.livingArea || !income.rentPerSqm) return 0;
    return income.livingArea * income.rentPerSqm * 12;
  };

  // Calculate operating costs
  const calculateAnnualOperatingCosts = () => {
    const admin = income.operatingCosts?.administration || 0;
    const maintenance = (income.livingArea || 0) * (income.operatingCosts?.maintenancePerSqm || 0);
    const vacancyLoss = calculateAnnualIncome() * (income.operatingCosts?.vacancyRate || 0);
    return admin + maintenance + vacancyLoss;
  };

  const annualIncome = calculateAnnualIncome();
  const annualCosts = calculateAnnualOperatingCosts();
  const netIncome = annualIncome - annualCosts;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-textDark">
          Ertragswertverfahren
        </h3>
        <p className="text-textMuted mt-1">
          Bewertung basierend auf den zukünftigen Erträgen der Immobilie
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Inputs */}
        <div className="space-y-5">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Grundstücksdaten</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Grundstücksfläche (m²)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 500"
                  value={income.plotArea || 0}
                  onChange={e => update("plotArea", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Bodenrichtwert (€/m²)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 400"
                  value={income.landValueRate || 400}
                  onChange={e => update("landValueRate", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Building Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Gebäudedaten</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Wohn-/Nutzfläche (m²) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 120"
                  value={income.livingArea || 0}
                  onChange={e => update("livingArea", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.livingArea ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.livingArea && (
                  <p className="mt-1 text-sm text-red-600">{errors.livingArea}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Kaltmiete pro m² (€/Monat) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 10"
                  value={income.rentPerSqm || 0}
                  onChange={e => update("rentPerSqm", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.rentPerSqm ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.rentPerSqm && (
                  <p className="mt-1 text-sm text-red-600">{errors.rentPerSqm}</p>
                )}
              </div>
            </div>
          </div>

          {/* Financial Parameters */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Finanzparameter</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Kapitalisierungszinssatz (%) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    placeholder="z.B. 3.5"
                    value={income.capitalizationRate || 0.035}
                    onChange={e => update("capitalizationRate", e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.capitalizationRate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </div>
                </div>
                {errors.capitalizationRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.capitalizationRate}</p>
                )}
                <p className="mt-1 text-xs text-textMuted">
                  Üblich: 3% - 5% je nach Lage und Objekt
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Restnutzungsdauer (Jahre) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 50"
                  value={income.remainingUsefulLife || 50}
                  onChange={e => update("remainingUsefulLife", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Operating Costs & Preview */}
        <div className="space-y-5">
          {/* Operating Costs */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Betriebskosten (jährlich)</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Verwaltungskosten (€)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 300"
                  value={income.operatingCosts?.administration || 300}
                  onChange={e => updateOperatingCosts("administration", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Instandhaltung pro m² (€)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 10"
                  value={income.operatingCosts?.maintenancePerSqm || 10}
                  onChange={e => updateOperatingCosts("maintenancePerSqm", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Leerstandsquote (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="z.B. 3.0"
                    value={income.operatingCosts?.vacancyRate || 0.03}
                    onChange={e => updateOperatingCosts("vacancyRate", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Income Preview */}
          <div className="bg-primaryLighter border border-primary/20 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Ertragsübersicht</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="text-textDark">Jahresbruttoertrag</span>
                <span className="font-medium">{annualIncome.toLocaleString("de-DE")} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="text-textDark">- Betriebskosten</span>
                <span className="text-red-600">-{annualCosts.toLocaleString("de-DE")} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-textDark">Jahresreinertrag</span>
                <span className="font-bold text-lg text-primary">
                  {netIncome.toLocaleString("de-DE")} €
                </span>
              </div>

              {/* Quick Ertragswert Calculation */}
              {income.capitalizationRate && income.capitalizationRate > 0 && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="text-sm text-textMuted mb-2">Geschätzter Ertragswert:</div>
                  <div className="text-xl font-bold text-textDark">
                    {Math.round(netIncome / (income.capitalizationRate / 100)).toLocaleString("de-DE")} €
                  </div>
                  <div className="text-xs text-textMuted mt-1">
                    Reinertrag / {income.capitalizationRate}% Kapitalisierungszinssatz
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-700">
                <strong>Tipp:</strong> Der Kapitalisierungszinssatz ist der wichtigste Parameter. 
                Er spiegelt das Risiko und die erwartete Rendite der Immobilie wider. 
                Für moderne Objekte in Top-Lagen sind 3-4% üblich, für ältere Objekte 4-6%.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}