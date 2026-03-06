import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dipcoder_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  profile: () => api.get("/auth/profile"),
  health: () => api.get("/health"),
};

export const inquiryApi = {
  create: (payload) => api.post("/inquiries", payload),
  mine: () => api.get("/inquiries/my"),
};

export const adminApi = {
  metrics: () => api.get("/admin/metrics"),
  inquiries: (params = {}) => api.get("/admin/inquiries", { params }),
  updateInquiry: (id, payload) => api.patch(`/admin/inquiries/${id}`, payload),
};

export const fetchEnquiry = () => fetch(`${import.meta.env.VITE_API_URL}/api/enquiry`);
