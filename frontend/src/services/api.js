import axios from 'axios';
import { API_CONFIG, ENDPOINTS } from '../scripts/apiConfig.js';
import { getAuthToken } from '../scripts/storage.js';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Solo manejar errores 401 si no estamos en rutas de autenticación
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      
      // Si ya estamos en login o en rutas públicas, no hacer nada
      if (currentPath === '/login' || currentPath === '/register' || currentPath === '/') {
        return Promise.reject(error);
      }
      
      // Solo limpiar localStorage, dejar que el contexto maneje la redirección
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Emitir evento personalizado para que el contexto lo maneje
      window.dispatchEvent(new CustomEvent('auth-error', { detail: 'Token expired' }));
    }
    return Promise.reject(error);
  }
);

export default api;