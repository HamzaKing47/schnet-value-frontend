import valuationImg from "../../assets/valuation-preview.jpg";

const ValuationSection = () => (
  <section className="py-12 sm:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
      <div className="order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold uppercase text-xs sm:text-sm tracking-wider">
            Wertermittlung
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-textDark mb-6">
          Professionelle Wertermittlungen in kürzester Zeit
        </h2>
        
        <div className="space-y-4 text-sm sm:text-base text-textMuted">
          <p>
            Mit unserer Software erstellen Sie in kürzester Zeit professionelle
            Wertermittlungen und Bewertungsdokumente für sich oder Ihre Kunden.
          </p>
          <p>
            Trotz großem Funktionsumfang ist unsere Software übersichtlich aufgebaut,
            und führt Sie mittels digitaler Assistenten durch alle nötigen Eingaben.
          </p>
          <p>
            Von automatisierten Werteinschätzungen über Kurzbewertungen bis hin zu
            vollumfanglichen Verkehrswertermittlungen nach ImmoWertV bieten wir alle
            Möglichkeiten zur Immobilienbewertung.
          </p>
        </div>
        
        <a 
          href="#more"
          className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-primary font-semibold hover:text-primaryDark transition text-sm sm:text-base"
        >
          Mehr erfahren
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
      
      <div className="order-1 lg:order-2">
        <div className="relative">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
          <img 
            src={valuationImg} 
            alt="Wertermittlung Software"
            className="relative rounded-lg shadow-xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ValuationSection;