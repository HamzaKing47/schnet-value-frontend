// src/pages/Datenschutz.jsx
import Layout from "../components/Layout";

const Datenschutz = () => (
  <Layout>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-8">Datenschutzerklärung</h1>
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-textMuted">
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten bei der Nutzung unserer Website und Dienste.
        </p>
        <h2 className="text-xl font-semibold text-textDark">1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung ist:<br />
          ImmoInvent GmbH<br />
          Musterstraße 123<br />
          70188 Stuttgart<br />
          E-Mail: info@immobilienbewertung.de
        </p>
        <h2 className="text-xl font-semibold text-textDark">2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>
          Bei der Nutzung unserer Website erheben wir folgende Daten:
        </p>
        <ul className="list-disc pl-6">
          <li>Name, E-Mail-Adresse, Telefonnummer (bei Registrierung und Kontaktaufnahme)</li>
          <li>Immobiliendaten, die Sie im Rahmen der Bewertung eingeben</li>
          <li>Technische Daten wie IP-Adresse, Browsertyp, Zugriffszeiten</li>
        </ul>
        <h2 className="text-xl font-semibold text-textDark">3. Zweck der Datenverarbeitung</h2>
        <p>
          Die Daten werden verwendet, um:
        </p>
        <ul className="list-disc pl-6">
          <li>Ihnen die Nutzung unserer Software zu ermöglichen</li>
          <li>Ihre Anfragen zu bearbeiten</li>
          <li>Die Sicherheit unserer Systeme zu gewährleisten</li>
          <li>Sie über Änderungen und neue Funktionen zu informieren (mit Ihrer Einwilligung)</li>
        </ul>
        <h2 className="text-xl font-semibold text-textDark">4. Weitergabe an Dritte</h2>
        <p>
          Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn dies zur Vertragserfüllung erforderlich ist oder Sie eingewilligt haben.
        </p>
        <h2 className="text-xl font-semibold text-textDark">5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.
        </p>
        <p className="text-sm text-gray-500 mt-8">Stand: Januar 2024</p>
      </div>
    </div>
  </Layout>
);

export default Datenschutz;