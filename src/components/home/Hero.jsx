import heroImg from "../../assets/hero-doc.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const { user } = useAuth();
  const buttonLink = user ? "/bewertung" : "/register";

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-primaryLighter to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6">
              Software zur<br />
              <span className="text-primary">Immobilienbewertung</span>
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-textMuted mb-8">
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
              <p className="text-textDark font-semibold text-sm sm:text-base">
                Mit über 15 Jahren Erfahrung können wir auch Ihnen die passende Lösung anbieten.
                <span className="text-primary"> Testen Sie uns – 6 Wochen kostenlos.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to={buttonLink}
                className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md font-bold hover:bg-primaryDark transition-all duration-200 shadow-lg hover:shadow-xl text-center text-sm sm:text-base"
              >
                Try it now for free!
              </Link>
            </div>
          </div>

          <div className="relative mt-8 sm:mt-0">
            <div className="absolute -inset-2 sm:-inset-6 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl"></div>
            <img
              src={heroImg}
              alt="Immobilienbewertung Software"
              className="relative rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;