const items = [
  "Lauffähig ohne Installation",
  "Alle Geräte unterstützt (PC, Tablet, …)",
  "Alle Betriebssysteme unterstützt",
  "Arbeiten von überall",
  "Mehrplatzsoftware – Teamfähig",
  "Immer neueste Version",
  "Technik übernehmen wir",
  "24/7 Verfügbarkeit",
];

const OnlineSoftware = () => (
  <section className="py-12 sm:py-24 bg-gradient-to-b from-white to-primaryLight/20">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-textDark">
          Moderne <span className="text-primary">Online-Software</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-textMuted text-sm sm:text-base max-w-2xl mx-auto">
          Nutzen Sie unsere cloud-basierte Lösung von überall aus – ohne Installation und mit ständigen Updates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium text-textDark text-sm sm:text-base">{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OnlineSoftware;