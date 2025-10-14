// Funciones para manejar localStorage de manera segura

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Guardar en localStorage
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Obtener de localStorage
export const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Remover de localStorage
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Limpiar todo el localStorage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Funciones específicas para autenticación
export const saveAuthToken = (token) => {
  return setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = () => {
  return getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const removeAuthToken = () => {
  return removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Funciones específicas para datos de usuario
export const saveUserData = (userData) => {
  return setStorageItem(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = () => {
  return getStorageItem(STORAGE_KEYS.USER_DATA);
};

export const removeUserData = () => {
  return removeStorageItem(STORAGE_KEYS.USER_DATA);
};

// Función para limpiar datos de sesión
export const clearSessionData = () => {
  removeAuthToken();
  removeUserData();
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

export { STORAGE_KEYS };