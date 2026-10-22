import axios from 'axios';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

if (import.meta.env.PROD && !apiBaseUrl) {
  throw new Error(
    'Missing VITE_API_BASE_URL. Configure the deployed API URL before building the frontend.',
  );
}

const API = axios.create({
  baseURL: apiBaseUrl || 'http://localhost:5000/api',
  withCredentials: true, // Required if sending cookies/session data across domains
});

// Automatically append JWT token if it exists in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;