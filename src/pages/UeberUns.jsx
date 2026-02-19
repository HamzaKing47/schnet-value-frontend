// src/pages/UeberUns.jsx - CLEANED VERSION
import Layout from "../components/Layout";

const UeberUns = () => (
  <Layout>
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-8">Über uns</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Company Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-textDark mb-6">Unsere Mission</h2>
            <p className="text-textMuted mb-4">
              Seit 2009 entwickeln wir Software für die Immobilienwirtschaft. Unsere Mission ist es,
              komplexe Wertermittlungen einfach und zugänglich zu machen.
            </p>
            <p className="text-textMuted">
              Mit über 15 Jahren Erfahrung haben wir uns als führender Anbieter von Software für
              Immobilienbewertungen etabliert. Unsere Kunden reichen von privaten Eigentümern über
              Immobilienmakler bis hin zu Sachverständigen.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-textDark mb-6">Unsere Werte</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-textDark mb-2">Präzision</h3>
                  <p className="text-textMuted text-sm">Unsere Software basiert auf der gültigen ImmoWertV und wird regelmäßig aktualisiert.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-textDark mb-2">Benutzerfreundlichkeit</h3>
                  <p className="text-textMuted text-sm">Komplexe Berechnungen einfach gemacht – auch für Einsteiger.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-textDark mb-2">Zuverlässigkeit</h3>
                  <p className="text-textMuted text-sm">99,9% Verfügbarkeit und deutscher Serverstandort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact */}
        <div className="space-y-8">
          <div className="bg-primaryLighter border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-textDark mb-6">Kontaktieren Sie uns</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-textMuted">Adresse</p>
                  <p className="font-medium text-textDark">Musterstraße 123, 70188 Stuttgart</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-textMuted">Telefon</p>
                  <p className="font-medium text-textDark">+49 (0) 711 12345678</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-textMuted">E-Mail</p>
                  <p className="font-medium text-textDark">info@immobilienbewertung.de</p>
                </div>
              </div>
            </div>

            <a 
              href="/kontakt"
              className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-colors"
            >
              Zum Kontaktformular
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-textDark mb-6">Rechtliches</h2>
            <p className="text-textMuted">
              <strong>ImmoInvent GmbH</strong><br />
              Musterstraße 123<br />
              70188 Stuttgart<br />
              Handelsregister: HRB 123456, Amtsgericht Stuttgart<br />
              Geschäftsführer: Max Mustermann<br />
              USt-ID: DE123456789
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default UeberUns;