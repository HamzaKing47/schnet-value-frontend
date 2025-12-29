const DetailedPricing = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-textDark mb-6">
          Lernen Sie unsere Tarife kennen
        </h2>
        <p className="text-textMuted max-w-3xl mx-auto">
          Wählen Sie zwischen unseren drei Tarifen – für jede Anforderung die passende Lösung.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Tarif Basic */}
        <div className="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Basic
            </span>
            <h3 className="text-2xl font-bold text-textDark mb-3">Tarif Basic</h3>
            <p className="text-textMuted">
              Das Einstiegspaket zur Erstellung von Kurzbewertungen
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-textMuted">
              Unser Basic-Tarif bietet Ihnen eine einfache Möglichkeit zur schnellen
              Immobilienbewertung, wenn Sie ausschließlich Immobilien-Kurzbewertungen
              oder Wertindikationen benötigen.
            </p>
            <p className="text-textMuted">
              Nach nur wenigen Minuten erhalten Sie ein professionelles und
              ansprechendes Dokument zum Immobilienwert.
            </p>
          </div>
          
          <a
            href="#basic"
            className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-all duration-200 shadow-sm hover:shadow"
          >
            Mehr erfahren →
          </a>
        </div>
        
        {/* Tarif Professional */}
        <div className="bg-white rounded-xl border-2 border-primary shadow-xl relative scale-105 z-10">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
              Beliebteste Wahl
            </span>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-sm font-semibold mb-4">
                Professional
              </span>
              <h3 className="text-2xl font-bold text-textDark mb-3">Tarif Professional</h3>
              <p className="text-textMuted">
                Das Profipaket für Verkehrswertermittlungen
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-textMuted">
                Unser Professional Paket beinhaltet den kompletten Funktionsumfang des
                Basic-Paketes.
              </p>
              <p className="text-textMuted">
                Darüber hinaus können mit diesem Paket Verkehrswertermittlungen nach
                ImmoWertV erstellt werden.
              </p>
            </div>
            
            <a
              href="#professional"
              className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-all duration-200 shadow-sm hover:shadow"
            >
              Mehr erfahren →
            </a>
          </div>
        </div>
        
        {/* Tarif Premium */}
        <div className="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Premium
            </span>
            <h3 className="text-2xl font-bold text-textDark mb-3">Tarif Premium</h3>
            <p className="text-textMuted">
              Das Premium Paket mit erweitertem Funktionsumfang
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-textMuted">
              Dieses Paket erweitert den Funktionsumfang des "Professional" Pakets
              um weitere Funktionen.
            </p>
            <p className="text-textMuted">
              So erhalten Sie die Möglichkeit der Bewertung von Erbbaurechten,
              Wohnrechten, Nießbrauch- oder Wegerechten. Zudem können mehrere
              Gebäude pro Grundstück bewertet werden.
            </p>
          </div>
          
          <a
            href="#premium"
            className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-all duration-200 shadow-sm hover:shadow"
          >
            Mehr erfahren →
          </a>
        </div>
      </div>
      
      {/* Comparison CTA */}
      <div className="text-center mt-16">
        <p className="text-textMuted mb-6">
          Unsicher welcher Tarif der richtige für Sie ist?
        </p>
        <a
          href="#vergleich"
          className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:text-primaryDark transition border-b-2 border-primary/20 hover:border-primary pb-1"
        >
          Tarif-Vergleich anzeigen
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default DetailedPricing;