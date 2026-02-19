// src/pages/Kontakt.jsx - UPDATED WITH REAL DATA
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  company: "",
  phone: "",
  subject: "",
  message: "",
};

const Kontakt = () => {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const successTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || "Fehler beim Senden der Nachricht."
        );
      }

      setSuccess(true);

      successTimeoutRef.current = setTimeout(() => {
        setFormData({ ...INITIAL_FORM_DATA });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(
        err.message || "Serverfehler. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-textDark mb-8">Kontakt</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-textDark mb-6">
              Kontaktformular
            </h2>

            {success ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Nachricht gesendet!
                </h3>

                <p className="text-green-700 text-lg max-w-md mx-auto">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>

                <p className="text-gray-500 text-sm mt-6">
                  Sie werden in 3 Sekunden zurück zum Formular geleitet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <inputField
                    label="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ihr Name"
                  />

                  <inputField
                    label="E-Mail *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ihre@email.de"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <inputField
                    label="Unternehmen"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Ihr Unternehmen"
                  />

                  <inputField
                    label="Telefon"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Betreff *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="support">Technischer Support</option>
                    <option value="sales">Verkauf / Beratung</option>
                    <option value="demo">Demo-Termin vereinbaren</option>
                    <option value="partnership">Partnerschaft</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <p className="text-xs text-textMuted">
                  Mit * markierte Felder sind Pflichtfelder.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Wird gesendet..." : "Nachricht senden"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-primaryLighter border border-primary/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-textDark mb-6">
                Kontaktdaten
              </h2>
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
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-textDark mb-6">
                Öffnungszeiten
              </h2>
              <div className="space-y-2 text-textMuted">
                <p>Montag – Freitag: 9:00 – 18:00 Uhr</p>
                <p>Samstag – Sonntag: Geschlossen</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-textDark mb-6">
                Support
              </h2>
              <p className="text-textMuted mb-4">
                Technischer Support per E-Mail oder Telefon während der Geschäftszeiten.
              </p>
              <a
                href="mailto:support@immobilienbewertung.de"
                className="text-primary hover:underline"
              >
                support@immobilienbewertung.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/* -------- Reusable Input -------- */
const inputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-textDark mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />
  </div>
);

export default Kontakt;