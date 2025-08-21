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
      console.log('🔐 Intentando login con:', email);
      const response = await apiService.login({ email, password });
      console.log('✅ Respuesta de login:', response);
      
      if (response && (response.user || response.customer || response.token)) {
        // Manejar diferentes estructuras de respuesta del backend
        const userData = response.user || response.customer || { 
          email, 
          token: response.token,
          firstName: response.firstName,
          lastName: response.lastName 
        };
        
        // Verificar que el token esté en localStorage
        const savedToken = localStorage.getItem('authToken');
        console.log('🔑 Token verificado en localStorage:', savedToken ? 'PRESENTE' : 'AUSENTE');
        
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        setUser(userData);
        console.log('✅ Usuario autenticado y guardado:', userData);
        
        // Forzar re-render para que los hooks detecten la autenticación
        setTimeout(() => {
          console.log('🔄 Forzando actualización de productos...');
          console.log('📢 Disparando evento auth-changed...');
          const event = new CustomEvent('auth-changed', { detail: { user: userData, token: localStorage.getItem('authToken') } });
          window.dispatchEvent(event);
        }, 100);
        
        return { ok: true, user: userData };
      }
    } catch (error) {
      console.warn('❌ Backend login failed:', error.message);
      
      // Si es error de autenticación (401, 403), no usar fallback
      if (error.message.includes('401') || error.message.includes('403') || 
          error.message.includes('Unauthorized') || error.message.includes('Invalid credentials')) {
        return { ok: false, message: 'Credenciales inválidas. Verifica tu email y contraseña.' };
      }
      
      // Fallback a autenticación local solo si es error de conexión
      console.log('🔄 Usando autenticación local como fallback...');
      const db = readUsers();
      const found = db.find(u => u.email === email && u.password === password);
      if (found) {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(found));
        setUser(found);
        return { ok: true, user: found };
      }
    }
    return { ok: false, message: 'Usuario o contraseña inválidos.' };
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
