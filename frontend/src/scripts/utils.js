// Funciones de utilidad para formateo y validación

// Formatear fecha
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formatear fecha corta
export const formatDateShort = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-ES');
};

// Formatear fecha para input de tipo date
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

// Obtener fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar contraseña
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Capitalizar primera letra
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncar texto
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Formatear número con decimales
export const formatNumber = (number, decimals = 2) => {
  if (number === null || number === undefined) return '0';
  return Number(number).toFixed(decimals);
};

// Calcular promedio
export const calculateAverage = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + Number(num), 0);
  return sum / numbers.length;
};

// Generar colores aleatorios para gráficos
export const generateColors = (count) => {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
  ];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

// Debounce function para búsquedas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Función para manejar errores de API
export const handleApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de error
    return error.response.data.detail || error.response.data.message || 'Error del servidor';
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    return 'No se pudo conectar con el servidor';
  } else {
    // Algo pasó al configurar la petición
    return 'Error inesperado';
  }
};

// Función para obtener el saludo según la hora
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

// Función para obtener el color según la calificación
export const getRatingColor = (rating) => {
  const colors = {
    1: '#ef4444', // rojo
    2: '#f97316', // naranja
    3: '#eab308', // amarillo
    4: '#84cc16', // verde claro
    5: '#22c55e'  // verde
  };
  return colors[rating] || '#6b7280';
};

// Función para renderizar estrellas
export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '☆');
  }
  return stars.join('');
};

// Función para limpiar datos de formulario
export const sanitizeFormData = (data) => {
  const sanitized = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].trim();
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};