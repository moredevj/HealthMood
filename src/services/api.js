// src/services/api.js
import axios from 'axios';

// Configurar la instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    // Verificar token en tiempo real para cada petición
    const token = localStorage.getItem('authToken');
    
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
    return response.data;
  },
  (error) => {
    // Si es error 401, limpiar token
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('auth_user');
      // Opcional: redirigir a login
      window.location.href = '/login';
    }
    
    // Manejo de errores específicos
    if (error.code === 'ERR_NETWORK') {
      throw new Error('No se puede conectar al servidor. Verificar que el backend esté ejecutándose en puerto 8080.');
    }
    
    if (error.response) {
      throw new Error(error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`);
    }
    
    throw new Error(error.message || 'Error de conexión');
  }
);

// Funciones de la API
export const apiService = {
  // Autenticación
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Extraer datos de la respuesta
      const responseData = response.data || response;
      const token = responseData.token || responseData.accessToken || responseData.jwt || response.token;
      const user = responseData.user || responseData.customer || responseData;
      
      if (token) {
        localStorage.setItem('authToken', token);
      }
      
      return { 
        token, 
        user, 
        data: responseData,
        ...response 
      };
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('auth_user');
  },
  
  // Productos
  getProducts: () => {
    return api.get('/products/list');
  },
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },
  
  // Blog
  getPosts: () => api.get('/blog/posts'),
  getPost: (id) => api.get(`/blog/posts/${id}`),
  
  // Órdenes
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Perfil de usuario
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  updateUserProfile: (userId, userData) => api.put(`/users/${userId}`, userData),
  
  // Health check
  healthCheck: () => api.get('/health'),
  
  // Verificar autenticación
  isAuthenticated: () => !!localStorage.getItem('authToken'),
  getToken: () => localStorage.getItem('authToken'),
};

export default apiService;
