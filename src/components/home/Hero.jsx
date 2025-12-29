import heroImg from "../../assets/hero-doc.png";

const Hero = () => (
  <section className="pt-32 pb-20 bg-gradient-to-b from-primaryLighter to-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-textDark leading-tight mb-6">
            Software zur<br />
            <span className="text-primary">Immobilienbewertung</span>
          </h1>
          
          <div className="space-y-4 text-lg text-textMuted mb-8">
            <p>
              Mit unserer Komplettlösung zur Immobilienbewertung decken
              wir sämtliche Anforderungen der Immobilienwirtschaft ab.
            </p>
            <p>
              Angefangen bei Kurzbewertungen für Immobilienmakler bis hin
              zu komplexen Verkehrswertgutachten für Sachverständige
              bieten wir die passende Software für Ihre individuellen
              Anforderungen.
            </p>
          </div>
          
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mb-8">
            <p className="text-textDark font-semibold">
              Mit über 15 Jahren Erfahrung können wir auch Ihnen die passende Lösung anbieten. 
              <span className="text-primary"> Testen Sie uns - 6 Wochen kostenlos.</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="#testen"
              className="bg-primary text-white px-8 py-3.5 rounded-md font-bold
  hover:bg-primaryDark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Jetzt testen
            </a>
            <a
              href="#demo"
              className="bg-white text-primary border-2 border-primary px-8 py-3.5 rounded-md font-bold
  hover:bg-primaryLighter transition-all duration-200"
            >
              Demo anfragen
            </a>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl"></div>
          <img
            src={heroImg}
            alt="Immobilienbewertung Software"
            className="relative rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;