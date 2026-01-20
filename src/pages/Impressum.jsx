// src/pages/Impressum.jsx
import Layout from "../components/Layout";

const Impressum = () => (
  <Layout>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-8">Impressum</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">Angaben gemäß § 5 TMG</h2>
          <div className="space-y-3 text-textMuted">
            <p><strong>ImmoInvent GmbH</strong></p>
            <p>Musterstraße 123</p>
            <p>70188 Stuttgart</p>
            <p>Deutschland</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">Vertreten durch</h2>
          <div className="space-y-3 text-textMuted">
            <p>Geschäftsführer: Max Mustermann</p>
            <p>Registergericht: Amtsgericht Stuttgart</p>
            <p>Registernummer: HRB 123456</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">Kontakt</h2>
          <div className="space-y-3 text-textMuted">
            <p>Telefon: +49 (0) 711 12345678</p>
            <p>E-Mail: info@immobilienbewertung.de</p>
            <p>Website: www.immobilienbewertung.de</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">Umsatzsteuer-ID</h2>
          <p className="text-textMuted">Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="text-textMuted">Max Mustermann, Musterstraße 123, 70188 Stuttgart</p>
        </section>
      </div>
    </div>
  </Layout>
);

export default Impressum;