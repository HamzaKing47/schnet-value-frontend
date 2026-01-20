export default function StepCost({ data, setData, errors = {} }) {
  // Ensure cost data always exists with defaults
  const cost = data?.cost || {
    plotArea: 0,
    landValueRate: 400,
    grossFloorArea: 0,
    standardConstructionCost: 870,
    constructionIndexCurrent: 160,
    constructionIndexBase: 100,
    age: 20,
    totalUsefulLife: 80,
    externalFacilitiesRate: 0.04,
    marketAdjustmentFactor: 1.0,
  };

  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      cost: {
        ...(prev.cost || {}),
        [field]: value === "" ? 0 : Number(value) || 0,
      },
    }));
  };

  // Calculate land value
  const calculateLandValue = () => {
    return (cost.plotArea || 0) * (cost.landValueRate || 0);
  };

  // Calculate building value
  const calculateBuildingValue = () => {
    const adjustedConstructionCost = (cost.standardConstructionCost || 0) * 
      ((cost.constructionIndexCurrent || 100) / (cost.constructionIndexBase || 100));
    
    const ageFactor = Math.max(0, 1 - ((cost.age || 0) / (cost.totalUsefulLife || 80)));
    
    return (cost.grossFloorArea || 0) * adjustedConstructionCost * ageFactor;
  };

  // Calculate external facilities value
  const calculateExternalFacilitiesValue = () => {
    return calculateBuildingValue() * (cost.externalFacilitiesRate || 0);
  };

  // Calculate total cost value
  const calculateTotalValue = () => {
    const landValue = calculateLandValue();
    const buildingValue = calculateBuildingValue();
    const externalValue = calculateExternalFacilitiesValue();
    const total = (landValue + buildingValue + externalValue) * (cost.marketAdjustmentFactor || 1);
    return total;
  };

  const landValue = calculateLandValue();
  const buildingValue = calculateBuildingValue();
  const externalValue = calculateExternalFacilitiesValue();
  const totalValue = calculateTotalValue();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-textDark">
          Sachwertverfahren
        </h3>
        <p className="text-textMuted mt-1">
          Bewertung basierend auf den Herstellungskosten der Immobilie
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Land & Building */}
        <div className="lg:col-span-2 space-y-6">
          {/* Land Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Grundstückswert
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Grundstücksfläche (m²) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 500"
                  value={cost.plotArea || 0}
                  onChange={e => update("plotArea", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.plotArea ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.plotArea && (
                  <p className="mt-1 text-sm text-red-600">{errors.plotArea}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Bodenrichtwert (€/m²)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 400"
                  value={cost.landValueRate || 400}
                  onChange={e => update("landValueRate", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-textDark">Grundstückswert:</span>
                <span className="font-semibold text-lg">{landValue.toLocaleString("de-DE")} €</span>
              </div>
            </div>
          </div>

          {/* Building Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              Gebäudewert
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Bruttogrundfläche (m²) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 180"
                  value={cost.grossFloorArea || 0}
                  onChange={e => update("grossFloorArea", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.grossFloorArea ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.grossFloorArea && (
                  <p className="mt-1 text-sm text-red-600">{errors.grossFloorArea}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Standardherstellungskosten (€/m²) *
                </label>
                <input
                  type="number"
                  placeholder="z.B. 870"
                  value={cost.standardConstructionCost || 870}
                  onChange={e => update("standardConstructionCost", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.standardConstructionCost ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.standardConstructionCost && (
                  <p className="mt-1 text-sm text-red-600">{errors.standardConstructionCost}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Baukostenindex (aktuell)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 160"
                  value={cost.constructionIndexCurrent || 160}
                  onChange={e => update("constructionIndexCurrent", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Baukostenindex (Basis)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 100"
                  value={cost.constructionIndexBase || 100}
                  onChange={e => update("constructionIndexBase", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Gebäudealter (Jahre)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 20"
                  value={cost.age || 20}
                  onChange={e => update("age", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Gesamtnutzungsdauer (Jahre)
                </label>
                <input
                  type="number"
                  placeholder="z.B. 80"
                  value={cost.totalUsefulLife || 80}
                  onChange={e => update("totalUsefulLife", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-textDark">Gebäudewert (abgezinst):</span>
                <span className="font-semibold text-lg">{buildingValue.toLocaleString("de-DE")} €</span>
              </div>
              <div className="text-xs text-textMuted mt-1">
                {cost.age ? `${cost.age} Jahre von ${cost.totalUsefulLife || 80} Jahren abgenutzt` : "Kein Alterungsabzug"}
              </div>
            </div>
          </div>

          {/* External Facilities */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Außenanlagen</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Außenanlagen-Faktor
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="z.B. 0.04"
                    value={cost.externalFacilitiesRate || 0.04}
                    onChange={e => update("externalFacilitiesRate", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </div>
                </div>
                <p className="mt-1 text-xs text-textMuted">
                  Üblich: 4% des Gebäudewertes für Einfriedung, Wege, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Marktanpassungsfaktor
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="z.B. 1.0"
                    value={cost.marketAdjustmentFactor || 1.0}
                    onChange={e => update("marketAdjustmentFactor", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <p className="mt-1 text-xs text-textMuted">
                  1.0 = neutral, {'>'}1.0 = Aufschlag, {'<'}1.0 = Abschlag
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-textDark">Außenanlagen-Wert:</span>
                <span className="font-semibold text-lg">{externalValue.toLocaleString("de-DE")} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Total Value Summary */}
          <div className="bg-primaryLighter border border-primary/20 rounded-xl p-5">
            <h4 className="font-medium text-textDark mb-4">Sachwert-Berechnung</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="text-textDark">Grundstückswert</span>
                <span className="font-medium">{landValue.toLocaleString("de-DE")} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="text-textDark">+ Gebäudewert</span>
                <span className="font-medium">{buildingValue.toLocaleString("de-DE")} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="text-textDark">+ Außenanlagen</span>
                <span className="font-medium">{externalValue.toLocaleString("de-DE")} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-textDark">Zwischensumme</span>
                <span className="font-bold text-lg">
                  {(landValue + buildingValue + externalValue).toLocaleString("de-DE")} €
                </span>
              </div>
            </div>

            {/* Market Adjustment */}
            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-textDark">× Marktanpassung</span>
                  <span className="font-medium">{cost.marketAdjustmentFactor || 1.0}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-primary/10">
                  <span className="font-bold text-lg text-textDark">Sachwert</span>
                  <span className="font-bold text-2xl text-primary">
                    {totalValue.toLocaleString("de-DE")} €
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Wichtige Hinweise
            </h5>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Standardherstellungskosten variieren je nach Bauweise und Region</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Baukostenindex für aktuelle Preise (Stand: 2024 ~160)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Lineare Alterswertminderung wird automatisch berechnet</span>
              </li>
            </ul>
          </div>

          {/* Quick Reference */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-textDark mb-2">Standardkosten (€/m²)</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-textMuted">Einfachbauweise</div>
              <div className="text-right font-medium">700-900 €</div>
              <div className="text-textMuted">Standardbauweise</div>
              <div className="text-right font-medium">900-1.200 €</div>
              <div className="text-textMuted">Gehobene Ausstattung</div>
              <div className="text-right font-medium">1.200-1.600 €</div>
              <div className="text-textMuted">Luxusausstattung</div>
              <div className="text-right font-medium">1.600-2.500+ €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}