const TariffLevels = () => (
  <section className="py-20 bg-softBg">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold uppercase text-sm tracking-wider">
            Leistungsstufen/Tarife
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-textDark mb-6">
          Für jeden Anwendungsfall die passende Lösung
        </h2>
        
        <p className="text-textMuted max-w-3xl mx-auto">
          Wir richten uns an alle gewerblichen Teilnehmer der Immobilienwirtschaft, die
          eine belastbare und nachvollziehbare Wertermittlung nach ImmoWertV benötigen.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Tarif Basic",
            description: "Perfekt für Kurzbewertungen und schnelle Wertindikationen",
            features: ["Schnelle Bewertungen", "Standard-Dokumente", "Einfache Bedienung"]
          },
          {
            title: "Tarif Professional",
            description: "Umfassende Lösung für vollständige Verkehrswertermittlungen",
            features: ["ImmoWertV konform", "Premium-Dokumente", "Vollständiger Funktionsumfang"]
          },
          {
            title: "Tarif Premium",
            description: "Erweiterte Funktionen für komplexe Bewertungsfälle",
            features: ["Spezialfunktionen", "Priority Support", "Individuelle Anpassungen"]
          }
        ].map((tariff, index) => (
          <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-textDark mb-3">{tariff.title}</h3>
              <p className="text-textMuted">{tariff.description}</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {tariff.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-textDark">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <a 
              href="#tariffs"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primaryDark transition"
            >
              Unterschiede der Tarife
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TariffLevels;