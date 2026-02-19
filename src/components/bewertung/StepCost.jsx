export default function StepCost({ data, setData, errors = {} }) {
  const cost = {
    plotArea: data?.cost?.plotArea ?? 0,
    landValueRate: data?.cost?.landValueRate ?? 400,
    grossFloorArea: data?.cost?.grossFloorArea ?? 0,
    standardConstructionCost: data?.cost?.standardConstructionCost ?? 870,
    constructionIndexCurrent: data?.cost?.constructionIndexCurrent ?? 160,
    constructionIndexBase: data?.cost?.constructionIndexBase ?? 100,
    age: data?.cost?.age ?? 20,
    totalUsefulLife: data?.cost?.totalUsefulLife ?? 80,
    externalFacilitiesRate: data?.cost?.externalFacilitiesRate ?? 0.04,
    marketAdjustmentFactor: data?.cost?.marketAdjustmentFactor ?? 1,
  };

  const update = (field, value, isPercent = false) => {
    const parsed = value === "" ? 0 : Number(value) || 0;
    setData((prev) => ({
      ...prev,
      cost: {
        ...(prev.cost || {}),
        [field]: isPercent ? parsed / 100 : parsed,
      },
    }));
  };

  // Calculations
  const landValue = cost.plotArea * cost.landValueRate;
  const indexedConstructionCost =
    cost.standardConstructionCost *
    (cost.constructionIndexBase > 0
      ? cost.constructionIndexCurrent / cost.constructionIndexBase
      : 1);
  const buildingCost = cost.grossFloorArea * indexedConstructionCost;
  const depreciationRate = Math.min(cost.age / (cost.totalUsefulLife || 80), 1);
  const residualBuildingValue = buildingCost * (1 - depreciationRate);
  const externalValue = residualBuildingValue * cost.externalFacilitiesRate;
  const preliminaryValue = landValue + residualBuildingValue + externalValue;
  const costValue = preliminaryValue * (cost.marketAdjustmentFactor || 1);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Sachwertverfahren</h3>
      <p className="text-textMuted text-sm">
        Für selbstgenutzte Objekte, Einfamilienhäuser und Grundstücke ohne Mietvergleich.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Grundstück</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Grundstücksfläche (m²) *
                </label>
                <input
                  type="number"
                  step="1"
                  value={cost.plotArea || ""}
                  onChange={(e) => update("plotArea", e.target.value)}
                  placeholder="z.B. 500"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Bodenrichtwert (€/m²) *
                </label>
                <input
                  type="number"
                  step="10"
                  value={cost.landValueRate || ""}
                  onChange={(e) => update("landValueRate", e.target.value)}
                  placeholder="z.B. 400"
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Gebäude</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Bruttogrundfläche (m²) *
                </label>
                <input
                  type="number"
                  step="1"
                  value={cost.grossFloorArea || ""}
                  onChange={(e) => update("grossFloorArea", e.target.value)}
                  placeholder="z.B. 180"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Normalherstellungskosten (€/m² NHK 2010) *
                </label>
                <input
                  type="number"
                  step="10"
                  value={cost.standardConstructionCost || ""}
                  onChange={(e) => update("standardConstructionCost", e.target.value)}
                  placeholder="870 (EFH mittel)"
                  className="input"
                />
                <p className="text-xs text-textMuted mt-1">
                  NHK 2010: 670 (einfach), 870 (mittel), 1150 (gehoben)
                </p>
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Baupreisindex aktuell (Basis 100)
                </label>
                <input
                  type="number"
                  step="1"
                  value={cost.constructionIndexCurrent || ""}
                  onChange={(e) => update("constructionIndexCurrent", e.target.value)}
                  placeholder="160"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Baupreisindex Basisjahr (üblich 100)
                </label>
                <input
                  type="number"
                  step="1"
                  value={cost.constructionIndexBase || ""}
                  onChange={(e) => update("constructionIndexBase", e.target.value)}
                  placeholder="100"
                  className="input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-textMuted mb-1">
                    Gebäudealter (Jahre)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={cost.age || ""}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="20"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-textMuted mb-1">
                    Gesamtnutzungsdauer (Jahre)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={cost.totalUsefulLife || ""}
                    onChange={(e) => update("totalUsefulLife", e.target.value)}
                    placeholder="80"
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Außenanlagen & Marktanpassung</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Außenanlagen (% vom Gebäuderestwert)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="20"
                  value={cost.externalFacilitiesRate * 100 || ""}
                  onChange={(e) => update("externalFacilitiesRate", e.target.value, true)}
                  placeholder="4.0"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Sachwertfaktor (Marktanpassung)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  max="1.5"
                  value={cost.marketAdjustmentFactor || ""}
                  onChange={(e) => update("marketAdjustmentFactor", e.target.value)}
                  placeholder="1.0"
                  className="input"
                />
                <p className="text-xs text-textMuted mt-1">
                  Üblich: 0,7 – 1,3 (laut Gutachterausschuss)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – RESULTS */}
        <div className="space-y-5">
          <div className="bg-primaryLighter border rounded-xl p-5">
            <h4 className="font-medium mb-4">Berechnungsschritte</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Bodenwert:</span>
                <span className="font-medium">
                  {landValue.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Indexierte NHK:</span>
                <span>{indexedConstructionCost.toFixed(2)} €/m²</span>
              </div>
              <div className="flex justify-between">
                <span>Gebäudeherstellungskosten:</span>
                <span>{buildingCost.toLocaleString("de-DE")} €</span>
              </div>
              <div className="flex justify-between">
                <span>Alterswertminderung:</span>
                <span>{(depreciationRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Gebäuderestwert:</span>
                <span>{residualBuildingValue.toLocaleString("de-DE")} €</span>
              </div>
              <div className="flex justify-between">
                <span>Außenanlagen:</span>
                <span>{externalValue.toLocaleString("de-DE")} €</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>Vorläufiger Sachwert:</span>
                <span className="font-semibold">
                  {preliminaryValue.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sachwertfaktor:</span>
                <span>{cost.marketAdjustmentFactor}</span>
              </div>
              <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-primary/30">
                <span>Sachwert:</span>
                <span className="text-primary">
                  {costValue > 0 ? costValue.toLocaleString("de-DE") + " €" : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Hinweise</h4>
            <ul className="text-xs text-textMuted space-y-1 list-disc pl-4">
              <li>NHK 2010 = Normalherstellungskosten 2010</li>
              <li>Baupreisindex aktuell: ca. 160 (2025)</li>
              <li>Gesamtnutzungsdauer: Massivbau 80 J., Holzbau 60-80 J.</li>
              <li>Alterswertminderung linear</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}