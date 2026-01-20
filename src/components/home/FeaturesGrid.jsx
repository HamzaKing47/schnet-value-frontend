const FeaturesGrid = () => {
  const features = [
    {
      title: "Wertermittlung nach ImmoWertV",
      description: "Wir bilden mit unserer Software die gültige Wertermittlungsverordnung ImmoWertV inklusive aller definierten Gebäudetypen ab.",
      link: "Weitere Screenshots ansehen"
    },
    {
      title: "Übersichtliche Datenerfassung",
      description: "Sie werden Schritt für Schritt durch die Datenerfassung geführt. Durch die strukturierte Gliederung behalten Sie stets den Überblick.",
      link: "Weitere Screenshots ansehen"
    },
    {
      title: "Bewertungsdokument mit Ihrem Logo",
      description: "Mit einem Klick wird eine Wertermittlung erstellt, die Sie mit Word öffnen und nachbearbeiten können. Mit Ihrem Logo und CI.",
      link: "Weitere Screenshots ansehen"
    },
    {
      title: "Assistenten",
      description: "An vielen Stellen unterstützen Sie unsere Assistentenfelder, indem Ihnen Werte anhand Ihrer bisherigen Eingaben vorgeschlagen werden.",
      link: "Weitere Screenshots ansehen"
    },
    {
      title: "Bodenrichtwerte",
      description: "Für weite Teile Deutschlands ermitteln wir die aktuellen Bodenrichtwerte inkl. der zugehörigen Anpassungsfaktoren für Sie.",
      link: "Weitere Screenshots ansehen"
    },
    {
      title: "Textvorgaben",
      description: "Anhand Ihrer bisherigen Eingaben geben wir Ihnen Standardtexte vor, um z.B. die verwendeten Wertermittlungsverfahren zu begründen.",
      link: "Weitere Screenshots ansehen"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-softBg rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg font-bold text-textDark mb-3">{feature.title}</h3>
              <p className="text-textMuted text-sm sm:text-base mb-4">{feature.description}</p>
              <a 
                href="#more"
                className="inline-flex items-center gap-1 text-primary font-medium hover:text-primaryDark transition text-xs sm:text-sm"
              >
                {feature.link}
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;