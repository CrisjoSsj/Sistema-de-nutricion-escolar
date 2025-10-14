// Constantes de roles de usuario
export const USER_ROLES = {
  ADMINISTRADOR: 'Administrador',
  NUTRICIONISTA: 'Nutricionista',
  PADRE: 'Padre',
  ESTUDIANTE: 'Estudiante'
};

// Tipos de menú
export const MENU_TYPES = {
  DESAYUNO: 'Desayuno',
  ALMUERZO: 'Almuerzo',
  MERIENDA: 'Merienda'
};

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  
  // Rutas de Administrador
  USUARIOS: '/usuarios',
  ESCUELAS: '/escuelas',
  REPORTES_ADMIN: '/reportes-admin',
  
  // Rutas de Nutricionista
  MENUS: '/menus',
  COMIDAS: '/comidas',
  CREAR_MENU: '/crear-menu',
  EDITAR_MENU: (id) => `/editar-menu/${id}`,
  FEEDBACK_NUTRICIONISTA: '/feedback-nutricionista',
  
  // Rutas de Padre
  CONSULTAR_MENUS: '/consultar-menus',
  ENVIAR_FEEDBACK: '/enviar-feedback',
  MIS_COMENTARIOS: '/mis-comentarios',
  
  // Rutas de Estudiante
  MENU_DIARIO: '/menu-diario',
  INFO_NUTRICIONAL: '/info-nutricional'
};

// Estados de la aplicación
export const APP_STATES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle'
};

// Mensajes de la aplicación
export const MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGIN_ERROR: 'Credenciales incorrectas',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  SAVE_SUCCESS: 'Guardado exitosamente',
  DELETE_SUCCESS: 'Eliminado exitosamente',
  ERROR_GENERAL: 'Ha ocurrido un error. Inténtalo de nuevo.',
  NO_DATA: 'No hay datos disponibles',
  LOADING: 'Cargando...'
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
};

// Colores para calificaciones
export const RATING_COLORS = {
  1: '#ef4444', // rojo
  2: '#f97316', // naranja
  3: '#eab308', // amarillo
  4: '#84cc16', // verde claro
  5: '#22c55e'  // verde
};

// Configuración de validaciones
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  MAX_COMMENT_LENGTH: 500
};