// ── API Utility — connects React frontend to Express/MongoDB backend ───────

const BASE_URL = "https://perth-numerology-backendd.onrender.com/api";

// ── Helpers ────────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem("perth_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// ── Auth API ───────────────────────────────────────────────────────────────

export async function apiRegister(name, email, password) {
  const data = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  // Store token
  localStorage.setItem("perth_token", data.token);
  return data.user;
}

export async function apiLogin(email, password) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // Store token
  localStorage.setItem("perth_token", data.token);
  return data.user;
}

export function apiLogout() {
  localStorage.removeItem("perth_token");
}

export async function apiGetMe() {
  const data = await request("/auth/me");
  return data.user;
}

// ── History API ────────────────────────────────────────────────────────────

export async function apiGetHistory() {
  const data = await request("/history");
  return data.history;
}

export async function apiSaveReading(entry) {
  const data = await request("/history", {
    method: "POST",
    body: JSON.stringify(entry),
  });
  return data.reading;
}

export async function apiDeleteReading(id) {
  return request(`/history/${id}`, { method: "DELETE" });
}

export async function apiClearHistory() {
  return request("/history", { method: "DELETE" });
}
