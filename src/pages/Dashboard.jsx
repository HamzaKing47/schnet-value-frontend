// src/pages/Dashboard.jsx - UPDATED VERSION
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserValuations, deleteValuation } from "../api/valuation.api";
import { formatCurrency, formatDate } from "../utils/format";

export default function Dashboard() {
  const { user } = useAuth();
  const [valuations, setValuations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadValuations();
  }, []);

  const loadValuations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getUserValuations();
      if (res.success) {
        setValuations(res.valuations || []);
      } else {
        setError("Bewertungen konnten nicht geladen werden.");
      }
    } catch (err) {
      setError("Fehler beim Laden der Bewertungen.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Möchten Sie diese Bewertung wirklich löschen?")) return;
    try {
      const res = await deleteValuation(id);
      if (res.success) {
        setValuations(valuations.filter((v) => v._id !== id));
      }
    } catch (err) {
      alert("Löschen fehlgeschlagen.");
    }
  };

  const handleExportAll = () => {
    const blob = new Blob([JSON.stringify(valuations, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bewertungen_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Willkommen{user?.firstName && `, ${user.firstName}`}!
            </h1>
            <p className="text-textMuted mt-1">
              Ihre gespeicherten Immobilienbewertungen
            </p>
          </div>
          <Link
            to="/bewertung"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition whitespace-nowrap"
          >
            + Neue Bewertung
          </Link>
        </div>

        {/* Valuations Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ihre Bewertungen</h2>
            {valuations.length > 0 && (
              <button
                onClick={handleExportAll}
                className="text-primary hover:text-primaryDark text-sm font-medium"
              >
                ⬇ Alle exportieren
              </button>
            )}
          </div>

          {error && (
            <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-textMuted">
              Lade Bewertungen...
            </div>
          ) : valuations.length === 0 ? (
            <div className="py-16 text-center">
              <svg
                className="w-20 h-20 text-gray-300 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-textMuted text-lg mb-4">
                Sie haben noch keine Bewertungen gespeichert.
              </p>
              <Link
                to="/bewertung"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition"
              >
                Erste Bewertung starten
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                      Objekttyp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                      Marktwert
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-textMuted uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {valuations.map((val) => (
                    <tr key={val._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {val.summary?.address || val.address || "Unbekannt"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {val.propertyType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-textMuted">
                        {formatDate(val.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        {formatCurrency(val.result?.marketValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                        <Link
                          to={`/bewertung?load=${val._id}`}
                          className="text-primary hover:text-primaryDark text-sm font-medium"
                        >
                          Ansehen
                        </Link>
                        <button
                          onClick={() => handleDelete(val._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Tips (optional) */}
        {valuations.length > 0 && (
          <div className="mt-8 bg-primaryLighter border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Tipp</h3>
            <p className="text-textMuted">
              Klicken Sie auf "Ansehen", um eine gespeicherte Bewertung zu laden und weiterzubearbeiten. Sie können auch jederzeit eine <Link to="/bewertung" className="text-primary font-medium">neue Bewertung</Link> starten.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}