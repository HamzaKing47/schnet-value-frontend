export default function StepIncome({ data, setData, errors = {} }) {
  const income = {
    plotArea: data?.income?.plotArea ?? 0,
    landValueRate: data?.income?.landValueRate ?? 400,
    livingArea: data?.income?.livingArea ?? 0,
    rentPerSqm: data?.income?.rentPerSqm ?? 0,
    capitalizationRate: data?.income?.capitalizationRate ?? 3.5,
    remainingUsefulLife: data?.income?.remainingUsefulLife ?? 50,
    operatingCosts: {
      administration: data?.income?.operatingCosts?.administration ?? 300,
      maintenancePerSqm: data?.income?.operatingCosts?.maintenancePerSqm ?? 10,
      vacancyRate: data?.income?.operatingCosts?.vacancyRate ?? 0.03,
    },
    marketAdjustmentFactor: data?.income?.marketAdjustmentFactor ?? 1,
  };

  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      income: {
        ...(prev.income || {}),
        [field]: value === "" ? 0 : Number(value) || 0,
      },
    }));
  };

  const updateOperatingCosts = (field, value, isPercent = false) => {
    const parsed = value === "" ? 0 : Number(value) || 0;
    setData((prev) => ({
      ...prev,
      income: {
        ...(prev.income || {}),
        operatingCosts: {
          ...(prev.income?.operatingCosts || {}),
          [field]: isPercent ? parsed / 100 : parsed,
        },
      },
    }));
  };

  // Calculations
  const landValue = income.plotArea * income.landValueRate;
  const annualRent = income.livingArea * income.rentPerSqm * 12;
  const maintenanceCost = income.operatingCosts.maintenancePerSqm * income.livingArea;
  const vacancyLoss = annualRent * income.operatingCosts.vacancyRate;
  const totalOperatingCosts =
    income.operatingCosts.administration + maintenanceCost + vacancyLoss;
  const netIncome = annualRent - totalOperatingCosts;
  const landDeduction = landValue * (income.capitalizationRate / 100);
  const buildingNetIncome = netIncome - landDeduction;
  const q = 1 + income.capitalizationRate / 100;
  const n = income.remainingUsefulLife;
  const multiplier = n > 0 ? (Math.pow(q, n) - 1) / (Math.pow(q, n) * (q - 1)) : 0;
  const buildingValue = buildingNetIncome * multiplier;
  const preliminaryValue = landValue + buildingValue;
  const incomeValue = preliminaryValue * income.marketAdjustmentFactor;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Ertragswertverfahren</h3>
      <p className="text-textMuted text-sm">
        Für vermietete Objekte und Renditeimmobilien. Alle Angaben in Euro.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Grundstücksdaten</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Grundstücksfläche (m²) *
                </label>
                <input
                  type="number"
                  step="1"
                  value={income.plotArea || ""}
                  onChange={(e) => update("plotArea", e.target.value)}
                  className="input"
                  placeholder="z.B. 500"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Bodenrichtwert (€/m²) *
                </label>
                <input
                  type="number"
                  step="10"
                  value={income.landValueRate || ""}
                  onChange={(e) => update("landValueRate", e.target.value)}
                  className="input"
                  placeholder="z.B. 400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Gebäudedaten</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Wohnfläche (m²) *
                </label>
                <input
                  type="number"
                  step="1"
                  value={income.livingArea || ""}
                  onChange={(e) => update("livingArea", e.target.value)}
                  className="input"
                  placeholder="z.B. 120"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Nettokaltmiete pro m²/Monat (€) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={income.rentPerSqm || ""}
                  onChange={(e) => update("rentPerSqm", e.target.value)}
                  className="input"
                  placeholder="z.B. 12"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Finanzparameter</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Liegenschaftszinssatz (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={income.capitalizationRate || ""}
                  onChange={(e) => update("capitalizationRate", e.target.value)}
                  className="input"
                  placeholder="3.5"
                />
                <p className="text-xs text-textMuted mt-1">Üblich: 2,5% – 5,0%</p>
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Restnutzungsdauer (Jahre) *
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  value={income.remainingUsefulLife || ""}
                  onChange={(e) => update("remainingUsefulLife", e.target.value)}
                  className="input"
                  placeholder="50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <div className="bg-white border rounded-xl p-5">
            <h4 className="font-medium mb-4">Bewirtschaftungskosten</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Verwaltungskosten (€/Jahr)
                </label>
                <input
                  type="number"
                  step="10"
                  value={income.operatingCosts.administration || ""}
                  onChange={(e) =>
                    updateOperatingCosts("administration", e.target.value)
                  }
                  className="input"
                  placeholder="300"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Instandhaltungskosten (€/m²/Jahr)
                </label>
                <input
                  type="number"
                  step="1"
                  value={income.operatingCosts.maintenancePerSqm || ""}
                  onChange={(e) =>
                    updateOperatingCosts("maintenancePerSqm", e.target.value)
                  }
                  className="input"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-xs text-textMuted mb-1">
                  Mietausfallwagnis (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={income.operatingCosts.vacancyRate * 100 || ""}
                  onChange={(e) =>
                    updateOperatingCosts("vacancyRate", e.target.value, true)
                  }
                  className="input"
                  placeholder="3.0"
                />
              </div>
            </div>
          </div>

          <div className="bg-primaryLighter border rounded-xl p-5">
            <h4 className="font-medium mb-4">Ergebnisvorschau</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Jahresrohertrag:</span>
                <span className="font-medium">
                  {annualRent.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bewirtschaftungskosten:</span>
                <span className="font-medium">
                  {totalOperatingCosts.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>Jahresreinertrag:</span>
                <span className="font-semibold">
                  {netIncome.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bodenwertverzinsung:</span>
                <span>
                  {landDeduction.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gebäudereinertrag:</span>
                <span>
                  {buildingNetIncome.toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span>Barwertfaktor ({n} Jahre):</span>
                <span>{multiplier.toFixed(3)}</span>
              </div>
              <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-primary/30">
                <span>Ertragswert:</span>
                <span className="text-primary">
                  {incomeValue > 0 ? incomeValue.toLocaleString("de-DE") + " €" : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}