// src/pages/Dashboard.jsx
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data
  const savedValuations = [
    { id: 1, address: "Musterstraße 12, Stuttgart", date: "2024-01-15", value: "€342.700" },
    { id: 2, address: "Hauptstraße 45, München", date: "2024-01-10", value: "€489.500" },
    { id: 3, address: "Parkweg 8, Berlin", date: "2024-01-05", value: "€612.300" },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-textDark mb-8">Dashboard</h1>
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-primary to-primaryDark text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Willkommen zurück!</h2>
          <p>Sie haben Zugriff auf alle Funktionen Ihres Tarifs.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/bewertung" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-textDark mb-2">Neue Bewertung</h3>
            <p className="text-sm text-textMuted">Starten Sie eine neue Immobilienbewertung</p>
          </Link>

          <Link to="/profile" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-textDark mb-2">Ihr Profil</h3>
            <p className="text-sm text-textMuted">Verwalten Sie Ihre Kontodaten</p>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-textDark mb-2">API-Zugriff</h3>
            <p className="text-sm text-textMuted">API-Schlüssel verwalten</p>
          </div>
        </div>

        {/* Recent Valuations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-textDark">Zuletzt erstellte Bewertungen</h2>
            <Link to="/saved-valuations" className="text-primary hover:text-primaryDark text-sm font-medium">
              Alle anzeigen
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-textDark font-medium">Adresse</th>
                  <th className="text-left py-3 px-4 text-textDark font-medium">Datum</th>
                  <th className="text-left py-3 px-4 text-textDark font-medium">Wert</th>
                  <th className="text-left py-3 px-4 text-textDark font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {savedValuations.map((valuation) => (
                  <tr key={valuation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{valuation.address}</td>
                    <td className="py-3 px-4">{valuation.date}</td>
                    <td className="py-3 px-4 font-medium">{valuation.value}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primaryDark text-sm">
                          Ansehen
                        </button>
                        <button className="text-primary hover:text-primaryDark text-sm">
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {savedValuations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-textMuted">Noch keine Bewertungen gespeichert.</p>
              <Link to="/bewertung" className="text-primary hover:text-primaryDark font-medium mt-2 inline-block">
                Erste Bewertung starten
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;