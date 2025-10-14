import api from './api.js';
import { ENDPOINTS } from '../scripts/apiConfig.js';

// Servicio de menús
export const menuService = {
  // Obtener todos los menús
  getAllMenus: async () => {
    const response = await api.get(ENDPOINTS.MENUS);
    return response.data;
  },

  // Obtener menú por ID
  getMenuById: async (id) => {
    const response = await api.get(ENDPOINTS.MENU(id));
    return response.data;
  },

  // Obtener menús por fecha
  getMenusByDate: async (fecha) => {
    const response = await api.get(ENDPOINTS.MENUS_POR_FECHA(fecha));
    return response.data;
  },

  // Obtener menús por tipo
  getMenusByType: async (tipo) => {
    const response = await api.get(ENDPOINTS.MENUS_POR_TIPO(tipo));
    return response.data;
  },

  // Obtener menús por escuela
  getMenusBySchool: async (escuelaId) => {
    const response = await api.get(ENDPOINTS.MENUS_POR_ESCUELA(escuelaId));
    return response.data;
  },

  // Crear menú
  createMenu: async (menuData) => {
    const response = await api.post(ENDPOINTS.MENUS, menuData);
    return response.data;
  },

  // Actualizar menú
  updateMenu: async (id, menuData) => {
    const response = await api.put(ENDPOINTS.MENU(id), menuData);
    return response.data;
  },

  // Eliminar menú
  deleteMenu: async (id) => {
    const response = await api.delete(ENDPOINTS.MENU(id));
    return response.data;
  },


};

// Servicio de comidas
export const foodService = {
  // Obtener todas las comidas
  getAllFoods: async () => {
    const response = await api.get(ENDPOINTS.COMIDAS);
    return response.data;
  },

  // Obtener comida por ID
  getFoodById: async (id) => {
    const response = await api.get(ENDPOINTS.COMIDA(id));
    return response.data;
  },

  // Obtener comidas por categoría
  getFoodsByCategory: async (categoria) => {
    const response = await api.get(ENDPOINTS.COMIDAS_POR_CATEGORIA(categoria));
    return response.data;
  },

  // Obtener comidas activas
  getActiveFoods: async () => {
    const response = await api.get(ENDPOINTS.COMIDAS_ACTIVAS);
    return response.data;
  },

  // Crear comida
  createFood: async (foodData) => {
    const response = await api.post(ENDPOINTS.COMIDAS, foodData);
    return response.data;
  },

  // Actualizar comida
  updateFood: async (id, foodData) => {
    const response = await api.put(ENDPOINTS.COMIDA(id), foodData);
    return response.data;
  },

  // Eliminar comida
  deleteFood: async (id) => {
    const response = await api.delete(ENDPOINTS.COMIDA(id));
    return response.data;
  }
};