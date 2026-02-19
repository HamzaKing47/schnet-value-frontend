// src/pages/AdminDashboard.jsx - ENHANCED WITH USEFUL METRICS
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../utils/format";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [valuations, setValuations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    fetchAdminData();
  }, [isAuthenticated, user]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, valuationsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers }),
        fetch(`${API_BASE}/admin/valuations`, { headers }),
        fetch(`${API_BASE}/admin/stats`, { headers }),
      ]);

      const usersData = await usersRes.json();
      const valuationsData = await valuationsRes.json();
      const statsData = await statsRes.json();

      if (usersData.success) setUsers(usersData.users);
      if (valuationsData.success) setValuations(valuationsData.valuations);
      if (statsData.success) setStats(statsData.stats);
    } catch (error) {
      console.error("Admin data error:", error);
      toast.error("Fehler beim Laden der Admin-Daten");
    } finally {
      setLoading(false);
    }
  };

  // Compute monthly stats
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const newUsersThisMonth = users.filter(u => {
    const created = new Date(u.createdAt);
    return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
  }).length;

  const valuationsThisMonth = valuations.filter(v => {
    const created = new Date(v.createdAt);
    return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
  }).length;

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u._id === userId ? data.user : u));
        toast.success("Rolle aktualisiert");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Fehler beim Aktualisieren");
    }
  };

  const handleToggleActive = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/users/${userId}/toggle-active`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u._id === userId ? { ...u, isActive: data.isActive } : u));
        toast.success(`Benutzer ${data.isActive ? "aktiviert" : "deaktiviert"}`);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Fehler beim Ändern des Status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Möchten Sie diesen Benutzer wirklich löschen? Alle seine Bewertungen werden ebenfalls gelöscht.")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u._id !== userId));
        toast.success("Benutzer gelöscht");
        // Refresh stats
        fetchAdminData();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Fehler beim Löschen");
    }
  };

  const handleDeleteValuation = async (id) => {
    if (!window.confirm("Möchten Sie diese Bewertung wirklich löschen?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/valuations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setValuations(valuations.filter(v => v._id !== id));
        toast.success("Bewertung gelöscht");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Fehler beim Löschen");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-textMuted">Lade Admin-Daten...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-8">
          {["overview", "users", "valuations"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-textMuted hover:text-textDark"
              }`}
            >
              {tab === "overview" && "Übersicht"}
              {tab === "users" && "Benutzer"}
              {tab === "valuations" && "Bewertungen"}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Benutzer (gesamt)" value={stats.totalUsers || 0} icon="👥" />
            <StatCard title="Bewertungen (gesamt)" value={stats.totalValuations || 0} icon="📋" />
            <StatCard title="Neue Benutzer (diesen Monat)" value={newUsersThisMonth} icon="📈" />
            <StatCard title="Bewertungen (diesen Monat)" value={valuationsThisMonth} icon="📊" />
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Alle Benutzer</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">E-Mail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Unternehmen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Rolle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Registriert</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{u.company || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          u.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {u.isActive ? "Aktiv" : "Inaktiv"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-textMuted">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleToggleActive(u._id)}
                          className={`text-xs px-2 py-1 rounded ${
                            u.isActive
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          {u.isActive ? "Deaktivieren" : "Aktivieren"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Valuations */}
        {activeTab === "valuations" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Alle Bewertungen</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Benutzer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Adresse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Typ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Marktwert</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Datum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {valuations.map((v) => (
                    <tr key={v._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {v.userId?.firstName} {v.userId?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {v.summary?.address || v.address || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.propertyType}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        {formatCurrency(v.result?.marketValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-textMuted">
                        {formatDate(v.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteValuation(v._id)}
                          className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-textMuted">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);