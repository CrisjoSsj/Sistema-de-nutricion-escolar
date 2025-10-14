import api from './api.js';
import { ENDPOINTS } from '../scripts/apiConfig.js';

// Servicio de feedback
export const feedbackService = {
  // Obtener todo el feedback
  getAllFeedback: async () => {
    const response = await api.get(ENDPOINTS.FEEDBACK);
    return response.data;
  },

  // Obtener feedback por ID
  getFeedbackById: async (id) => {
    const response = await api.get(ENDPOINTS.FEEDBACK_BY_ID(id));
    return response.data;
  },

  // Obtener feedback por menú
  getFeedbackByMenu: async (menuId) => {
    const response = await api.get(ENDPOINTS.FEEDBACK_POR_MENU(menuId));
    return response.data;
  },



  // Crear feedback
  createFeedback: async (feedbackData) => {
    const response = await api.post(ENDPOINTS.FEEDBACK, feedbackData);
    return response.data;
  },

  // Actualizar feedback
  updateFeedback: async (id, feedbackData) => {
    const response = await api.put(ENDPOINTS.FEEDBACK_BY_ID(id), feedbackData);
    return response.data;
  },

  // Eliminar feedback
  deleteFeedback: async (id) => {
    const response = await api.delete(ENDPOINTS.FEEDBACK_BY_ID(id));
    return response.data;
  },

  // Obtener estadísticas de feedback
  getFeedbackStats: async (menuId) => {
    const response = await api.get(ENDPOINTS.FEEDBACK_ESTADISTICAS(menuId));
    return response.data;
  }
};

// Servicio de estadísticas del dashboard
export const dashboardService = {
  // Obtener estadísticas del dashboard
  getDashboardStats: async () => {
    const response = await api.get(ENDPOINTS.DASHBOARD_STATS);
    return response.data;
  }
};