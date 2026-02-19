const StepOne = ({ data, setData, errors = {} }) => {
  const propertyTypes = [
    { value: "Condominium", label: "Wohnung", description: "Eigentumswohnung" },
    {
      value: "SingleFamilyHome",
      label: "Einfamilienhaus",
      description: "Freistehendes Einfamilienhaus",
    },
    {
      value: "MultiFamilyBuilding",
      label: "Mehrfamilienhaus",
      description: "Mehrparteien-Gebäude",
    },
    { value: "Land", label: "Bauland", description: "Unbebautes Grundstück" },
  ];

  const handleSpfChange = (e) => {
    const value = e.target.value;
    setData({ ...data, spf: value === "" ? 0 : parseInt(value, 10) || 0 });
  };

  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

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

      {/* Address Field */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Adresse <span className="text-xs text-textMuted">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="z.B. Musterstraße 1, 12345 Berlin"
          value={data.address || ""}
          onChange={handleAddressChange}
        />
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Objekttyp <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setData({ ...data, propertyType: type.value })}
              className={`p-4 rounded-lg border-2 text-left transition ${
                data.propertyType === type.value
                  ? "border-primary bg-primaryLighter"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">{type.label}</div>
              <div className="text-sm text-textMuted mt-1">
                {type.description}
              </div>
              {data.propertyType === type.value && (
                <div className="mt-2 inline-flex items-center text-primary text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
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

      {/* SPF */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Sonderposten-Faktor (SPF) – Zu- oder Abschläge
          <span className="text-xs text-textMuted ml-2">(optional)</span>
        </label>
        <input
          type="number"
          step="1000"
          className={`w-full px-4 py-3 border rounded-lg ${
            errors.spf ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="z. B. -10000 für Abzüge, +5000 für Zuschläge"
          value={data.spf ?? 0}
          onChange={handleSpfChange}
        />
        <p className="mt-2 text-xs text-textMuted">
          Negative Werte für Wertminderungen (z.B. Baumängel), positive für
          Werterhöhungen. Typische Werte liegen zwischen -50.000 € und +50.000
          €.
        </p>
      </div>

      {data.propertyType === "Land" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Hinweis:</strong> Für Bauland steht ausschließlich das
            Vergleichswertverfahren zur Verfügung.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepOne;
