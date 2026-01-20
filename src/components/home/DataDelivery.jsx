const DataDelivery = () => (
  <section className="py-12 sm:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold uppercase text-xs sm:text-sm tracking-wider">
            Datenzulieferung
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-textDark mb-6">
          Aktuelle Daten automatisch bezogen
        </h2>
        
        <div className="space-y-4 text-textMuted text-sm sm:text-base">
          <p>
            Im Rahmen von Wertermittlungen werden unterschiedlichste externe Daten
            wie Anpassungsfaktoren oder Bodenrichtwerte benötigt, die sich regelmäßig
            ändern.
          </p>
          <p>
            Wir beziehen den Großteil dieser Daten automatisch und aktuell für Sie,
            oder leiten entsprechende Werte ab.
          </p>
          <p>
            Zudem ermöglichen wir für weite Teile Deutschlands den Bezug von externen
            Unterlagen wie Orthofotos, Liegenschaftskarten, Lärm oder
            Hochwasserrisikokarten.
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-primaryLighter to-white rounded-xl p-4 sm:p-6 md:p-8 border border-primary/10 mt-8 lg:mt-0">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            "Bodenrichtwerte",
            "Anpassungsfaktoren",
            "Orthofotos",
            "Liegenschaftskarten",
            "Lärmkarten",
            "Hochwasserrisiko",
            "Bebauungspläne",
            "Verkehrsdaten"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-textDark font-medium text-xs sm:text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default DataDelivery;