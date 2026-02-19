// src/context/AuthContext.jsx - FIXED
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          const res = await fetch(`${API_BASE}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 401) {
            // Token invalid – clear storage and log out
            console.log("Token invalid (401), logging out");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } else if (res.status === 403) {
            // 403 – possibly server misconfiguration, keep user but warn
            console.warn("Received 403 from verify endpoint – keeping user for now");
            setUser(JSON.parse(savedUser));
          } else if (!res.ok) {
            // Other HTTP error (500, 502, etc.) – keep user, but log
            console.error(`Verify endpoint returned ${res.status} – keeping user`);
            setUser(JSON.parse(savedUser));
          } else {
            const data = await res.json();
            if (data.valid) {
              setUser(JSON.parse(savedUser));
            } else {
              // valid: false from server (should not happen with 200, but just in case)
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }
          }
        } catch (error) {
          // Network error – keep user, but log
          console.error("Network error during token verification:", error);
          setUser(JSON.parse(savedUser));
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    // Use the user data as returned from the backend (no role override)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};