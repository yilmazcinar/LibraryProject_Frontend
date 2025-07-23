import axios from "axios";

// Backend API base URL - Render üzerindeki canlı URL
// Canlı: 'https://libraryproject-backend.onrender.com/api/v1'
// Geliştirme için: 'http://localhost:8080/api/v1'
const API_BASE_URL = import.meta.env.PROD
  ? "https://libraryproject-backend.onrender.com/api/v1"
  : "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
