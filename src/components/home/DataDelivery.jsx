const DataDelivery = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">
              Datenzulieferung
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-textDark mb-6">
            Aktuelle Daten automatisch bezogen
          </h2>
          
          <div className="space-y-4 text-textMuted">
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
        
        <div className="bg-gradient-to-br from-primaryLighter to-white rounded-xl p-8 border border-primary/10">
          <div className="grid grid-cols-2 gap-4">
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
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-textDark font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DataDelivery;