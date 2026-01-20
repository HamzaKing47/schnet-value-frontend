// src/pages/Login.jsx
import Layout from "../components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: Implement actual login API
      console.log("Login attempt:", { email, password, rememberMe });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success message
      alert("Login erfolgreich! (Demo-Modus)");
      // In production: redirect to dashboard
      // navigate("/dashboard");
      
    } catch (err) {
      setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-textDark">Anmelden</h2>
            <p className="text-textMuted mt-2">
              Bitte melden Sie sich mit Ihren Zugangsdaten an
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textDark mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-textDark mb-2">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-textDark">
                    Angemeldet bleiben
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-primary hover:text-primaryDark">
                  Passwort vergessen?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Anmeldung läuft...
                  </>
                ) : (
                  "Anmelden"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-textMuted">
                Noch kein Konto?{" "}
                <Link to="/register" className="text-primary font-medium hover:text-primaryDark">
                  Jetzt registrieren
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-textMuted mb-2">
                <strong>Demo-Zugang (keine Registrierung nötig):</strong>
              </p>
              <div className="text-xs text-textMuted space-y-1">
                <p>E-Mail: <span className="font-mono">demo@immobilienbewertung.de</span></p>
                <p>Passwort: <span className="font-mono">demo123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;