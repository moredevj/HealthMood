// src/modules/auth/hook/useAuth.jsx
import { useEffect, useState, createContext, useContext } from 'react';
import { users as seedUsers } from '../utils/dummyData.js';
import apiService from '../../../services/api.js';

const USERS_KEY = 'auth_users';
const AUTH_KEY = 'auth_user';

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  return seedUsers;
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    readUsers(); // asegura semilla
  }, []);

  const login = async (email, password) => {
    try {
      // Intentar login con backend usando Axios
      console.log('🔐 useAuth: Intentando login con backend...');
      const response = await apiService.login({ email, password });
      console.log('📦 useAuth: Respuesta completa del backend:', response);
      
      // Verificar múltiples estructuras de respuesta
      const responseData = response.data || response;
      const token = responseData.token || responseData.accessToken || responseData.jwt || response.token;
      const user = responseData.user || responseData.customer || responseData;
      
      console.log('🔍 useAuth: Token extraído:', token ? 'PRESENTE' : 'AUSENTE');
      console.log('🔍 useAuth: Usuario extraído:', user);
      
      if (token || user || response.status === 200) {
        // Construir userData con la información disponible
        const userData = user && typeof user === 'object' ? user : { 
          email, 
          token,
          firstName: responseData.firstName || user?.firstName,
          lastName: responseData.lastName || user?.lastName,
          id: responseData.id || user?.id
        };
        
        // Guardar token si existe
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('� useAuth: Token guardado en localStorage');
        }
        
        // Guardar usuario en sesión
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        setUser(userData);
        console.log('✅ useAuth: Usuario autenticado exitosamente:', userData);
        
        // Disparar evento de autenticación
        setTimeout(() => {
          const event = new CustomEvent('auth-changed', { 
            detail: { user: userData, token: token || localStorage.getItem('authToken') } 
          });
          window.dispatchEvent(event);
        }, 100);
        
        return { ok: true, user: userData };
      } else {
        console.warn('⚠️ useAuth: Respuesta del backend sin token ni usuario válidos');
        return { ok: false, message: 'Respuesta del servidor inválida.' };
      }
    } catch (error) {
      console.error('❌ useAuth: Error en login:', error);
      
      // Si es error de autenticación específico (401, 403)
      if (error.response?.status === 401 || error.response?.status === 403) {
        return { 
          ok: false, 
          message: 'Credenciales incorrectas. Verifica tu email y contraseña.' 
        };
      }
      
      // Si es error de conexión, usar fallback local
      if (!error.response) {
        console.log('🔄 useAuth: Error de conexión, usando autenticación local...');
        const db = readUsers();
        const found = db.find(u => u.email === email && u.password === password);
        if (found) {
          sessionStorage.setItem(AUTH_KEY, JSON.stringify(found));
          setUser(found);
          return { ok: true, user: found };
        }
      }
      
      return { 
        ok: false, 
        message: error.response?.data?.message || error.message || 'Error de conexión.' 
      };
    }
  };

  const register = async (email, password) => {
    try {
      // Intentar registro con backend usando Axios
      const response = await apiService.register({ email, password });
      if (response && (response.user || response.token)) {
        const userData = response.user || { email, token: response.token };
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        setUser(userData);
        return { ok: true, user: userData };
      }
    } catch (error) {
      console.warn('Backend register failed:', error.message);
      
      // Fallback a registro local
      const db = readUsers();
      const exists = db.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) return { ok: false, message: 'El usuario ya existe.' };

      const newUser = { id: Date.now(), email, password };
      const updated = [...db, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return { ok: true, user: newUser };
    }
    return { ok: false, message: 'Error al registrar usuario.' };
  };

  const logout = () => {
    apiService.logout();
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
