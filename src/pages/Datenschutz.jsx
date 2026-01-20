// src/pages/Datenschutz.jsx
import Layout from "../components/Layout";

const Datenschutz = () => (
  <Layout>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textDark mb-8">Datenschutzerklärung</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">1. Datenschutz auf einen Blick</h2>
          <div className="space-y-4 text-textMuted">
            <p>
              Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung
              von personenbezogenen Daten (nachfolgend kurz "Daten") innerhalb unseres Onlineangebotes
              und der mit ihm verbundenen Webseiten, Funktionen und Inhalte auf.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">2. Verantwortlicher</h2>
          <div className="space-y-3 text-textMuted">
            <p>ImmoInvent GmbH</p>
            <p>Musterstraße 123</p>
            <p>70188 Stuttgart</p>
            <p>E-Mail: datenschutz@immobilienbewertung.de</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">3. Erfassung allgemeiner Daten und Informationen</h2>
          <div className="space-y-4 text-textMuted">
            <p>
              Beim Aufruf unserer Website werden automatisch allgemeine Daten und Informationen erfasst.
              Diese Daten werden in den Logfiles des Servers gespeichert. Erfasst werden können:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">4. Cookies</h2>
          <div className="space-y-4 text-textMuted">
            <p>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem
              Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver
              und sicherer zu machen.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden
              und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
              ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">5. Kontaktformular und E-Mail-Kontakt</h2>
          <div className="space-y-4 text-textMuted">
            <p>
              Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben
              aus der Anfrage inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">6. Ihre Rechte</h2>
          <div className="space-y-4 text-textMuted">
            <p>Sie haben das Recht:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
              <li>auf Berichtigung unrichtiger personenbezogener Daten</li>
              <li>auf Löschung Ihrer bei uns gespeicherten personenbezogenen Daten</li>
              <li>auf Einschränkung der Datenverarbeitung</li>
              <li>auf Datenübertragbarkeit</li>
              <li>auf Widerruf Ihrer Einwilligung zur Datenverarbeitung</li>
              <li>auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-textDark mb-4">7. SSL- bzw. TLS-Verschlüsselung</h2>
          <div className="space-y-4 text-textMuted">
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
              wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine
              SSL- bzw. TLS-Verschlüsselung.
            </p>
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default Datenschutz;