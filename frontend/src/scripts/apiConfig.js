// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Endpoints de la API
export const ENDPOINTS = {
  // Autenticación
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout', 
  REGISTER: '/api/auth/register',
  PROFILE: '/api/auth/me',
  
  // Usuarios
  USUARIOS: '/api/usuarios',
  USUARIO: (id) => `/api/usuarios/${id}`,
  
  // Escuelas
  ESCUELAS: '/api/escuelas',
  ESCUELA: (id) => `/api/escuelas/${id}`,
  
  // Menús
  MENUS: '/api/menus',
  MENU: (id) => `/api/menus/${id}`,
  MENUS_POR_ESCUELA: (escuelaId) => `/api/menus?escuela_id=${escuelaId}`,
  MENUS_POR_FECHA: (fecha) => `/api/menus?fecha=${fecha}`,
  MENUS_POR_TIPO: (tipo) => `/api/menus?tipo=${tipo}`,
  
  // Comidas
  COMIDAS: '/api/comidas',
  COMIDA: (id) => `/api/comidas/${id}`,
  COMIDAS_POR_CATEGORIA: (categoria) => `/api/comidas?categoria=${categoria}`,
  COMIDAS_ACTIVAS: '/api/comidas?activa=true',
  
  // Feedback
  FEEDBACK: '/api/feedback',
  FEEDBACK_BY_ID: (id) => `/api/feedback/${id}`,
  FEEDBACK_POR_MENU: (menuId) => `/api/feedback?menu_id=${menuId}`,
  FEEDBACK_ESTADISTICAS: (menuId) => `/api/feedback/estadisticas/${menuId}`,
  
  // Estadísticas y reportes
  DASHBOARD_STATS: '/api/dashboard/stats',
};