const StepOne = ({ data, setData, errors = {} }) => {
  const propertyTypes = [
    { value: "Condominium", label: "Wohnung", description: "Eigentumswohnung" },
    { value: "SingleFamilyHome", label: "Einfamilienhaus", description: "Freistehendes Einfamilienhaus" },
    { value: "MultiFamilyBuilding", label: "Mehrfamilienhaus", description: "Mehrparteien-Gebäude" },
    { value: "Land", label: "Bauland", description: "Unbebautes Grundstück" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-textDark mb-2">
          Willkommen zur Immobilienbewertung
        </h3>
        <p className="text-textMuted">
          Bitte geben Sie zunächst die grundlegenden Objektdaten ein.
        </p>
      </div>

      <div className="space-y-6">
        {/* Property Type Selection */}
        <div>
          <label className="block text-sm font-medium text-textDark mb-3">
            Objekttyp <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setData({ ...data, propertyType: type.value })}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  data.propertyType === type.value
                    ? "border-primary bg-primaryLighter shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-textDark">{type.label}</div>
                <div className="text-sm text-textMuted mt-1">{type.description}</div>
                {data.propertyType === type.value && (
                  <div className="mt-2 inline-flex items-center text-primary text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Ausgewählt
                  </div>
                )}
              </button>
            ))}
          </div>
          {errors.propertyType && (
            <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>
          )}
        </div>

        {/* SPF Input */}
        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Sonderposten-Faktor (SPF) in €
            <span className="text-xs text-textMuted ml-2">(Optional: z.B. für Außenanlagen, Altlasten)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                errors.spf ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="z. B. -10000 für Abzüge"
              value={data.spf}
              onChange={(e) =>
                setData({ ...data, spf: Number(e.target.value) || 0 })
              }
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              €
            </div>
          </div>
          {errors.spf && (
            <p className="mt-1 text-sm text-red-600">{errors.spf}</p>
          )}
          <p className="mt-2 text-xs text-textMuted">
            Negative Werte für Abzüge (z.B. Sanierungsbedarf), positive für Zuschläge (z.B. Luxusausstattung)
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700">
              <strong>Hinweis:</strong> Der Objekttyp bestimmt, welche Bewertungsverfahren für Ihre Immobilie angewendet werden.
              Für Bauland steht nur das Vergleichswertverfahren zur Verfügung.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;