// src/pages/Register.jsx
import Layout from "../components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    acceptTerms: false,
    acceptNewsletter: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.email.trim()) newErrors.email = "E-Mail ist erforderlich";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-Mail ist ungültig";
    
    if (!formData.password) newErrors.password = "Passwort ist erforderlich";
    else if (formData.password.length < 8) newErrors.password = "Mindestens 8 Zeichen erforderlich";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwörter stimmen nicht überein";
    }
    
    if (!formData.acceptTerms) newErrors.acceptTerms = "Sie müssen die AGB akzeptieren";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      // TODO: Implement actual registration API
      console.log("Registration data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success
      setSuccess(true);
      
      // In production: redirect to login or dashboard
      // navigate("/login?registered=true");
      
    } catch (err) {
      setErrors({ submit: "Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gray-50 py-12 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-textDark mb-4">Registrierung erfolgreich!</h2>
              <p className="text-textMuted mb-6">
                Vielen Dank für Ihre Registrierung. Sie können sich jetzt mit Ihren Zugangsdaten anmelden.
              </p>
              
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="inline-block w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primaryDark transition-colors"
                >
                  Zum Login
                </Link>
                <Link
                  to="/"
                  className="inline-block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-96px)] bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-textDark mb-4">Konto erstellen</h1>
            <p className="text-textMuted">
              Testen Sie unsere Software 6 Wochen kostenlos und unverbindlich
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {errors.submit && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-textDark mb-2">
                    Vorname *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Max"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-textDark mb-2">
                    Nachname *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Mustermann"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textDark mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="ihre@email.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-textDark mb-2">
                    Telefon (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-textDark mb-2">
                  Unternehmen (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Ihre Firma GmbH"
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-textDark mb-2">
                    Passwort *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-textMuted">Mindestens 8 Zeichen</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-textDark mb-2">
                    Passwort bestätigen *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms & Newsletter */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-textDark">
                    Ich akzeptiere die{" "}
                    <Link to="/agb" className="text-primary hover:text-primaryDark">
                      Allgemeinen Geschäftsbedingungen
                    </Link>{" "}
                    und die{" "}
                    <Link to="/datenschutz" className="text-primary hover:text-primaryDark">
                      Datenschutzerklärung
                    </Link> *
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                )}

                <div className="flex items-start">
                  <input
                    id="acceptNewsletter"
                    name="acceptNewsletter"
                    type="checkbox"
                    checked={formData.acceptNewsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  />
                  <label htmlFor="acceptNewsletter" className="ml-2 block text-sm text-textDark">
                    Ich möchte per E-Mail über neue Funktionen und Angebote informiert werden
                  </label>
                </div>
              </div>

              {/* Submit Button */}
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
                    Registrierung läuft...
                  </>
                ) : (
                  "Kostenlos registrieren & testen"
                )}
              </button>
            </form>

            {/* Already have account */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-textMuted">
                Bereits ein Konto?{" "}
                <Link to="/login" className="text-primary font-medium hover:text-primaryDark">
                  Hier anmelden
                </Link>
              </p>
            </div>
          </div>

          {/* Trial Information */}
          <div className="mt-6 bg-primaryLighter border border-primary/20 rounded-xl p-6 text-center">
            <h3 className="font-semibold text-textDark mb-2">6 Wochen kostenlos testen</h3>
            <p className="text-sm text-textMuted">
              Ihre Testphase startet sofort nach der Registrierung. Keine Kreditkarte erforderlich.
              Sie können jederzeit kündigen.
            </p>
          </div> 
        </div>
      </div>
    </Layout>
  );
};

export default Register;