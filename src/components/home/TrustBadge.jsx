const TrustBadge = () => (
  <section className="py-16 bg-white border-y border-gray-100">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Wertermittlungssoftware seit über 16 Jahren
        </h2>
        <p className="text-textMuted">
          Vertrauen Sie unserer langjährigen Erfahrung, wie es auch unsere Kunden tun.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {[
          "Raiffeisenbank",
          "Sparkasse",
          "Century 21",
          "Immobilien Partner",
          "Wüstenrot",
          "Bank Logo"
        ].map((client, index) => (
          <div key={index} className="h-12 w-32 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 font-medium text-sm">{client}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadge;