import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, changeUserPassword } from "../api/valuation.api";
import toast from "react-hot-toast";

const INITIAL_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
};

const INITIAL_PASSWORD = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  const [passwordData, setPasswordData] = useState(INITIAL_PASSWORD);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      company: user.company || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChangeField = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await updateUserProfile(profileData);
      if (res.success) {
        updateUser(res.user);
        toast.success("Profil erfolgreich aktualisiert!");
      } else {
        toast.error(res.error || "Aktualisierung fehlgeschlagen");
        setErrors({ submit: res.error });
      }
    } catch (error) {
      toast.error("Aktualisierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrors({});

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
      setErrors({ confirmPassword: "Passwörter stimmen nicht überein" });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Mindestens 8 Zeichen erforderlich");
      setErrors({ newPassword: "Mindestens 8 Zeichen erforderlich" });
      return;
    }

    setLoading(true);
    try {
      const res = await changeUserPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.success) {
        toast.success("Passwort erfolgreich geändert!");
        setPasswordData(INITIAL_PASSWORD);
      } else {
        toast.error(res.error || "Passwortänderung fehlgeschlagen");
        setErrors({ submit: res.error });
      }
    } catch (error) {
      toast.error("Passwortänderung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
      )
    ) {
      logout();
      navigate("/");
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-textDark">Nicht angemeldet</h2>
          <p className="text-textMuted mt-2">
            Bitte melden Sie sich an, um Ihr Profil zu sehen.
          </p>
        </div>
      </Layout>
    );
  }

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}` || "U";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-textDark mb-8">Mein Profil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">
                  {initials}
                </span>
              </div>
              <h3 className="font-bold text-textDark">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-textMuted mt-1">{user.email}</p>
            </div>

            <nav className="space-y-1">
              {["profile", "password", "subscription", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab === "profile"
                    ? "Persönliche Daten"
                    : tab === "password"
                    ? "Passwort ändern"
                    : tab === "subscription"
                    ? "Abonnement"
                    : "Einstellungen"}
                </button>
              ))}
            </nav>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full mt-6 text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              Abmelden
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                {errors.submit}
              </div>
            )}

            {activeTab === "profile" && (
              <form
                onSubmit={handleProfileUpdate}
                className="bg-white rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-bold">Persönliche Daten</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Vorname</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nachname</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">E-Mail</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <p className="text-xs text-textMuted mt-1">E-Mail kann nicht geändert werden</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Unternehmen</label>
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? "Wird gespeichert..." : "Daten speichern"}
                </button>
              </form>
            )}

            {activeTab === "password" && (
              <form
                onSubmit={handlePasswordChange}
                className="bg-white rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-bold">Passwort ändern</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Aktuelles Passwort</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChangeField}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Neues Passwort</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChangeField}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Passwort bestätigen</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChangeField}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? "Wird geändert..." : "Passwort ändern"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;