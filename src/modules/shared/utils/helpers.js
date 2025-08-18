// Formateo de moneda
export const formatCurrency = (value, locale = 'es-CL', currency = 'CLP') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(value);
};

// Validaciones comunes
export const validations = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingresa un email válido'
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
  },
  phone: {
    pattern: /^\+?569\d{8}$/,
    message: 'Ingresa un número de teléfono válido (ej: +56912345678)'
  }
};

// Helpers para el carrito
export const cartHelpers = {
  calculateTotal: (items) => {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  },
  
  calculateDiscount: (total, discountPercent) => {
    return total * (discountPercent / 100);
  }
};

// Helpers para fechas
export const dateHelpers = {
  formatDate: (date, locale = 'es-CL') => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  timeAgo: (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      año: 31536000,
      mes: 2592000,
      semana: 604800,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1
    };
    
    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval > 1) {
        return `hace ${interval} ${unit}${interval === 1 ? '' : 's'}`;
      }
    }
    return 'hace un momento';
  }
};
