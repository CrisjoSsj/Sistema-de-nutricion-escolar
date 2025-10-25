import api from './api.js';
import { ENDPOINTS } from '../scripts/apiConfig.js';

// Servicio de autenticación
export const authService = {
  // Login
  login: async (credentials) => {
    // FastAPI espera form data para OAuth2
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    const response = await api.post(ENDPOINTS.LOGIN, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    return response.data;
  },

  // Logout (limpiar token localmente y notificar al servidor)
  logout: async () => {
    try {
      // Intentar notificar al servidor (opcional, no crítico si falla)
      await api.post(ENDPOINTS.LOGOUT || '/logout');
    } catch (error) {
      // No es crítico si el servidor no responde
      console.log('Logout del servidor no disponible, continuando con logout local');
    } finally {
      // Siempre limpiar datos locales
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
    return Promise.resolve({ success: true });
  },

  // Registrar usuario
  register: async (userData) => {
    const response = await api.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await api.get(ENDPOINTS.PROFILE);
    return response.data;
  }
};

// Servicio de usuarios
export const userService = {
  // Obtener todos los usuarios
  getAllUsers: async () => {
    const response = await api.get(ENDPOINTS.USUARIOS);
    return response.data;
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    const response = await api.get(ENDPOINTS.USUARIO(id));
    return response.data;
  },

  // Crear usuario
  createUser: async (userData) => {
    const response = await api.post(ENDPOINTS.USUARIOS, userData);
    return response.data;
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    const response = await api.put(ENDPOINTS.USUARIO(id), userData);
    return response.data;
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    const response = await api.delete(ENDPOINTS.USUARIO(id));
    return response.data;
  }
};

// Servicio de escuelas
export const schoolService = {
  // Obtener todas las escuelas
  getAllSchools: async () => {
    const response = await api.get(ENDPOINTS.ESCUELAS);
    return response.data;
  },

  // Obtener escuela por ID
  getSchoolById: async (id) => {
    const response = await api.get(ENDPOINTS.ESCUELA(id));
    return response.data;
  },

  // Crear escuela
  createSchool: async (schoolData) => {
    const response = await api.post(ENDPOINTS.ESCUELAS, schoolData);
    return response.data;
  },

  // Actualizar escuela
  updateSchool: async (id, schoolData) => {
    const response = await api.put(ENDPOINTS.ESCUELA(id), schoolData);
    return response.data;
  },

  // Eliminar escuela
  deleteSchool: async (id) => {
    const response = await api.delete(ENDPOINTS.ESCUELA(id));
    return response.data;
  }
};