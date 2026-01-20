// src/pages/AGB.jsx
import Layout from "../components/Layout";

const AGB = () => (
  <Layout>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 1 Geltungsbereich</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der
              ImmoInvent GmbH (nachfolgend "Anbieter") und seinen Kunden (nachfolgend "Kunde")
              über die Nutzung der Software zur Immobilienbewertung.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 2 Vertragsgegenstand</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Der Anbieter stellt dem Kunden eine Software zur Immobilienbewertung zur Verfügung.
              Der genaue Funktionsumfang richtet sich nach dem gewählten Tarif (Basic, Professional, Premium).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 3 Testphase</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Der Kunde kann die Software 6 Wochen lang kostenlos testen. Während der Testphase
              steht der volle Funktionsumfang des gewählten Tarifs zur Verfügung.
            </p>
            <p>
              Die Testphase endet automatisch nach 6 Wochen. Der Kunde erhält eine Benachrichtigung
              7 Tage vor Ende der Testphase.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 4 Vergütung</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Nach Ende der kostenlosen Testphase wird die Nutzung der Software kostenpflichtig.
              Die aktuellen Preise sind auf unserer Website unter www.immobilienbewertung.de/preise
              einsehbar.
            </p>
            <p>
              Die Zahlung erfolgt monatlich im Voraus per Lastschrift oder Kreditkarte.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 5 Kündigung</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Das Abonnement kann monatlich gekündigt werden. Die Kündigung muss schriftlich
              oder per E-Mail an den Anbieter erfolgen.
            </p>
            <p>
              Während der 6-wöchigen Testphase kann der Kunde jederzeit ohne Angabe von Gründen
              kündigen. Es entstehen dann keine Kosten.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 6 Haftung</h2>
          <div className="space-y-3 text-textMuted">
            <p>
              Die Software dient als Hilfsmittel zur Immobilienbewertung. Der Anbieter übernimmt
              keine Gewähr für die Richtigkeit der berechneten Werte. Für Entscheidungen, die
              auf Basis der Software-Ergebnisse getroffen werden, übernimmt der Anbieter keine Haftung.
            </p>
            <p>
              Die Haftung des Anbieters ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">§ 7 Schlussbestimmungen</h2>
          <div className="space-y-3 text-textMuted">
            <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
            <p>Erfüllungsort und Gerichtsstand ist Stuttgart.</p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-primaryLighter rounded-lg">
          <p className="text-sm text-textMuted">
            <strong>Stand:</strong> Januar 2024<br />
            <strong>Letzte Aktualisierung:</strong> 15.01.2024
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default AGB;