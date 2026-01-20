// src/components/home/LeadGeneration.jsx
const LeadGeneration = ({ onDetailsClick = () => alert("Lead generator!") }) => (
  <section className="py-12 sm:py-20 bg-softBg">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold uppercase text-xs sm:text-sm tracking-wider">
            Leadgenerierung
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-textDark mb-6">
          Neukundengewinnung für Immobilienmakler
        </h2>
        
        <div className="space-y-4 text-textMuted text-sm sm:text-base">
          <p>
            Speziell für Immobilienmakler bieten wir die Möglichkeit der
            Neukundengewinnung durch eine Einbindung unseres Leadgenerators in
            Ihre Homepage.
          </p>
          <p>
            Dadurch können Sie potentiellen Kunden eine kostenlose
            Immobilienbewertung in Ihrem Namen anbieten und qualifizierte Leads
            generieren.
          </p>
        </div>
        
        <button 
          onClick={onDetailsClick}
          className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-primary font-semibold hover:text-primaryDark transition text-sm sm:text-base"
        >
          Details zum Leadgenerator
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 sm:p-6 rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold text-textDark mb-4">So funktioniert's:</h3>
          <ol className="space-y-4">
            {[
              "Widget auf Ihrer Website einbinden",
              "Besucher erhalten kostenlose Werteinschätzung",
              "Kontaktdaten werden gesammelt",
              "Qualifizierte Leads für Ihr Team"
            ].map((step, index) => (
              <li key={index} className="flex items-start gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </span>
                <span className="text-textDark text-sm sm:text-base">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default LeadGeneration;