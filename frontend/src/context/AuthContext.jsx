import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { 
  getAuthToken, 
  getUserData, 
  saveAuthToken, 
  saveUserData, 
  clearSessionData 
} from '../scripts/storage.js';

// Estado inicial
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Tipos de acciones
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    default:
      return state;
  }
};

// Crear contexto
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = getAuthToken();
    const userData = getUserData();

    if (token && userData) {
      try {
        // Verificar que el token sigue siendo válido obteniendo el perfil
        const response = await authService.getProfile();
        
        // Normalizar el rol a minúsculas si no lo está
        const normalizedUserData = {
          ...response,
          rol: response.rol ? response.rol.toLowerCase() : response.rol
        };
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: normalizedUserData,
            token: token
          }
        });
      } catch (error) {
        // Token inválido, limpiar datos
        clearSessionData();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await authService.login(credentials);
      
      // Guardar datos en localStorage
      saveAuthToken(response.access_token);
      
      // El backend ya incluye los datos del usuario en la respuesta
      const userInfo = response.user;
      
      // Normalizar los datos del usuario
      const normalizedUser = {
        id: userInfo.id,
        nombre: userInfo.nombre,
        email: userInfo.email,
        rol: userInfo.rol.toLowerCase(), // Normalizar rol a minúsculas
        escuela_id: userInfo.escuela_id,
        activo: userInfo.activo
      };
      
      saveUserData(normalizedUser);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: normalizedUser,
          token: response.access_token
        }
      });

      return { success: true, user: normalizedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error al iniciar sesión';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_ERROR,
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      clearSessionData();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    saveUserData(updatedUser);
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData
    });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};