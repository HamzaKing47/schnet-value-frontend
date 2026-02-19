const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

/* -------------------- RESPONSE HANDLER -------------------- */
const handleResponse = async (response) => {
  const text = await response.text();

  if (!response.ok) {
    try {
      const data = JSON.parse(text);
      throw new Error(
        data.error ||
          data.message ||
          (Array.isArray(data.errors) ? data.errors.join(", ") : text),
      );
    } catch {
      throw new Error(text || `HTTP ${response.status}`);
    }
  }

  if (!text) return { success: true };
  return JSON.parse(text);
};

/* -------------------- AUTH -------------------- */
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(res);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.authUpdate?.(data.user, data.token);
    }

    return data;
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await handleResponse(res);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false };

  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleResponse(res);
  } catch {
    return { valid: false };
  }
};

/* -------------------- VALUATION -------------------- */

export const calculateValuation = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/valuation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

export const marketValue = async (payload) => {
  return calculateValuation(payload);
};

/* -------------------- STORAGE -------------------- */
export const getUserValuations = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE}/valuations`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleResponse(res);
  } catch {
    const local = JSON.parse(
      localStorage.getItem("savedValuations") || "[]",
    );
    return { success: true, valuations: local, fallback: true };
  }
};

export const saveValuation = async (valuation) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE}/valuations/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(valuation),
    });

    return await handleResponse(res);
  } catch {
    const saved = JSON.parse(
      localStorage.getItem("savedValuations") || "[]",
    );
    saved.push({
      ...valuation,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("savedValuations", JSON.stringify(saved));
    return { success: true, fallback: true };
  }
};

export const deleteValuation = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/valuations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

// ========== USER PROFILE ==========
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return await handleResponse(res);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const changeUserPassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    return await handleResponse(res);
  } catch (err) {
    return { success: false, error: err.message };
  }
};