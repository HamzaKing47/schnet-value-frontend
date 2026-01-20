// src/pages/Pricing.jsx
import Layout from "../components/Layout";
import DetailedPricing from "../components/home/DetailedPricing";

// Define the comparison features data
const comparisonFeatures = [
  { name: "Schnelle Bewertungen", basic: true, pro: true, premium: true },
  { name: "Standard-Dokumente", basic: true, pro: true, premium: true },
  { name: "Einfache Bedienung", basic: true, pro: true, premium: true },
  { name: "ImmoWertV konform", basic: false, pro: true, premium: true },
  { name: "Premium-Dokumente", basic: false, pro: true, premium: true },
  { name: "Vollständiger Funktionsumfang", basic: false, pro: true, premium: true },
  { name: "Spezialfunktionen", basic: false, pro: false, premium: true },
  { name: "Priority Support", basic: false, pro: false, premium: true },
  { name: "Individuelle Anpassungen", basic: false, pro: false, premium: true },
  { name: "Bewertung von Erbbaurechten", basic: false, pro: false, premium: true },
  { name: "Mehrere Gebäude pro Grundstück", basic: false, pro: false, premium: true },
  { name: "API-Zugriff", basic: false, pro: false, premium: true },
  { name: "Team-Management", basic: false, pro: false, premium: true },
  { name: "Datenexport", basic: false, pro: true, premium: true },
];

const Pricing = () => {
  const scrollToComparison = () => {
    const element = document.getElementById('tarif-vergleich');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-textDark mb-6">Preise</h1>
        <p className="text-textMuted mb-8">
          Wählen Sie den passenden Tarif für Ihre Anforderungen.
        </p>
        
        <DetailedPricing />
        
        {/* Detailed Comparison Table */}
        <div id="tarif-vergleich" className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-textDark mb-6 text-center">
            Detaillierter Tarifvergleich
          </h2>
          <p className="text-textMuted text-center mb-8 max-w-3xl mx-auto">
            Alle Funktionen im direkten Vergleich. Wählen Sie das Paket, das am besten zu Ihren Anforderungen passt.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 pl-4 font-semibold text-textDark">Funktion</th>
                  <th className="text-center py-4 font-semibold text-textDark">
                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Basic</div>
                  </th>
                  <th className="text-center py-4 font-semibold text-textDark">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Professional</div>
                  </th>
                  <th className="text-center py-4 font-semibold text-textDark">
                    <div className="inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">Premium</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-4 pl-4 text-textDark">{feature.name}</td>
                    <td className="text-center py-4">
                      {feature.basic ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="text-center py-4">
                      {feature.pro ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="text-center py-4">
                      {feature.premium ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pricing Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-textDark mb-2">Basic</h3>
              <div className="text-2xl font-bold text-textDark">€29<span className="text-base text-textMuted">/Monat</span></div>
              <p className="text-sm text-textMuted mt-2">Jährliche Zahlung</p>
              <button 
                onClick={() => window.location.href = "/register?plan=basic"}
                className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Basic wählen
              </button>
            </div>
            
            <div className="bg-primaryLighter p-6 rounded-lg text-center border-2 border-primary/20">
              <div className="inline-block mb-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                Beliebteste Wahl
              </div>
              <h3 className="font-semibold text-textDark mb-2">Professional</h3>
              <div className="text-2xl font-bold text-textDark">€79<span className="text-base text-textMuted">/Monat</span></div>
              <p className="text-sm text-textMuted mt-2">Jährliche Zahlung</p>
              <button 
                onClick={() => window.location.href = "/register?plan=professional"}
                className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primaryDark transition-colors"
              >
                Professional wählen
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-textDark mb-2">Premium</h3>
              <div className="text-2xl font-bold text-textDark">€149<span className="text-base text-textMuted">/Monat</span></div>
              <p className="text-sm text-textMuted mt-2">Jährliche Zahlung</p>
              <button 
                onClick={() => window.location.href = "/register?plan=premium"}
                className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Premium wählen
              </button>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-textDark mb-6 text-center">Häufig gestellte Fragen</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h4 className="font-semibold text-textDark mb-2">Kann ich meinen Tarif später wechseln?</h4>
                <p className="text-textMuted text-sm">
                  Ja, Sie können jederzeit zwischen den Tarifen wechseln. Bei einem Upgrade wird der Differenzbetrag anteilig berechnet, bei einem Downgrade erhalten Sie eine Gutschrift.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-textDark mb-2">Gibt es eine Vertragslaufzeit?</h4>
                <p className="text-textMuted text-sm">
                  Nein, alle Tarife sind monatlich kündbar. Die 6-wöchige kostenlose Testphase ist unverbindlich und kann ohne Angabe von Gründen beendet werden.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-textDark mb-2">Für wen ist der Basic-Tarif geeignet?</h4>
                <p className="text-textMuted text-sm">
                  Der Basic-Tarif ist perfekt für Immobilienmakler, die schnelle Kurzbewertungen für Erstgespräche benötigen oder für private Eigentümer, die eine erste Wertschätzung wünschen.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-textDark mb-2">Brauche ich für den Professional-Tarif Vorkenntnisse?</h4>
                <p className="text-textMuted text-sm">
                  Nein, unsere Software führt Sie mit Assistenten Schritt für Schritt durch die Wertermittlung. Alle notwendigen Berechnungen werden automatisch durchgeführt.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-12 bg-gradient-to-r from-primaryLighter to-white border border-primary/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-textDark mb-4">Noch unentschlossen?</h3>
          <p className="text-textMuted mb-6 max-w-2xl mx-auto">
            Testen Sie alle Funktionen 6 Wochen lang kostenlos. Keine Kreditkarte erforderlich, jederzeit kündbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = "/register"}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-colors"
            >
              Jetzt kostenlos testen
            </button>
            <button 
              onClick={scrollToComparison}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Tarife vergleichen
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;