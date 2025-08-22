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
      const response = await apiService.login({ email, password });
      
      // Verificar múltiples estructuras de respuesta
      const responseData = response.data || response;
      const token = responseData.token || responseData.accessToken || responseData.jwt || response.token;
      const user = responseData.user || responseData.customer || responseData;
      
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
        }
        
        // Guardar usuario en sesión
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        setUser(userData);
        
        // Disparar evento de autenticación
        setTimeout(() => {
          const event = new CustomEvent('auth-changed', { 
            detail: { user: userData, token: token || localStorage.getItem('authToken') } 
          });
          window.dispatchEvent(event);
        }, 100);
        
        return { ok: true, user: userData };
      } else {
        return { ok: false, message: 'Respuesta del servidor inválida.' };
      }
    } catch (error) {
      
      // Si es error de autenticación específico (401, 403)
      if (error.response?.status === 401 || error.response?.status === 403) {
        return { 
          ok: false, 
          message: 'Credenciales incorrectas. Verifica tu email y contraseña.' 
        };
      }
      
      // Si es error de conexión, usar fallback local
      if (!error.response) {
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

  const register = async (userData) => {
    try {
      // Intentar registro con backend usando Axios
      const response = await apiService.register(userData);
      if (response && (response.user || response.token || response.customerId || response.id)) {
        const userInfo = response.user || { 
          ...userData, 
          token: response.token, 
          id: response.customerId || response.id,
          customerId: response.customerId,
          email: response.email || userData.email,
          role: response.role
        };
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(userInfo));
        setUser(userInfo);
        return { ok: true, user: userInfo, message: response.message || 'Usuario registrado exitosamente' };
      }
      // Si la respuesta no tiene user/token pero tiene mensaje de éxito
      if (response && response.message && response.message.includes('exitosamente')) {
        return { ok: true, message: response.message };
      }
      return { ok: true, message: 'Usuario registrado exitosamente' };
    } catch (error) {
      // Verificar si es un error 409 con mensaje de éxito
      if (error.response?.status === 409) {
        const errorData = error.response.data;
        // Si el mensaje indica éxito a pesar del error 409
        if (errorData && (
          errorData.message?.includes('exitoso') || 
          errorData.message?.includes('registrado') ||
          errorData.success === true
        )) {
          return { ok: true, message: errorData.message || 'Usuario registrado exitosamente' };
        }
        // Si es conflicto por usuario existente
        if (errorData?.message?.includes('existe') || errorData?.message?.includes('duplicado')) {
          return { ok: false, message: 'El usuario ya existe.' };
        }
      }
      
      // Fallback a registro local
      const db = readUsers();
      const exists = db.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) return { ok: false, message: 'El usuario ya existe.' };

      const newUser = { 
        id: Date.now(), 
        email: userData.email, 
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      const updated = [...db, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return { ok: true, user: newUser };
    }
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
