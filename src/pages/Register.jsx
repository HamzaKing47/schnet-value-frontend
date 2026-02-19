// src/pages/Register.jsx - UPDATED LAYOUT
import Layout from "../components/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/valuation.api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  company: "",
  phone: "",
  acceptTerms: false,
  acceptNewsletter: true,
};

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
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
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwörter stimmen nicht überein";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Sie müssen die AGB akzeptieren";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        company: formData.company.trim() || null,
        phone: formData.phone.trim() || null,
        acceptTerms: formData.acceptTerms,
        acceptNewsletter: formData.acceptNewsletter,
      };

      const res = await registerUser(payload);
      if (!res?.user || !res?.token) throw new Error("Ungültige Serverantwort");

      login(res.user, res.token);
      toast.success("Registrierung erfolgreich! Ihre 6-wöchige Testphase beginnt jetzt.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registrierung fehlgeschlagen.");
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center bg-gray-50 py-12 px-4 relative overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23058996' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-textDark">Kostenloses Konto erstellen</h2>
            <p className="text-textMuted mt-2">6 Wochen kostenlos testen – keine Kreditkarte erforderlich</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">Vorname *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Max"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">Nachname *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Mustermann"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">E-Mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="ihre@email.de"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">Passwort *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.password ? "border-red-500" : "border-gray-300"}`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">Passwort bestätigen *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Unternehmen (optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ihre Firma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Telefon (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+49 123 456789"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-textDark">
                    Ich habe die <Link to="/agb" className="text-primary hover:underline">AGB</Link> und die <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> gelesen und akzeptiere sie. *
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-xs text-red-600">{errors.acceptTerms}</p>}

                <div className="flex items-start">
                  <input
                    id="acceptNewsletter"
                    name="acceptNewsletter"
                    type="checkbox"
                    checked={formData.acceptNewsletter}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="acceptNewsletter" className="ml-2 block text-sm text-textDark">
                    Ich möchte den Newsletter erhalten (optional, jederzeit abbestellbar)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primaryDark transition-colors disabled:opacity-50"
              >
                {loading ? "Konto wird erstellt..." : "Kostenlos registrieren"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-textMuted">
                Bereits registriert?{" "}
                <Link to="/login" className="text-primary font-medium hover:text-primaryDark">
                  Hier anmelden
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;