// src/modules/auth/hook/useAuth.jsx
import { useEffect, useState, createContext, useContext } from 'react';
import { users as seedUsers } from '../utils/dummyData.js';

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

  const login = (email, password) => {
    const db = readUsers();
    const found = db.find(u => u.email === email && u.password === password);
    if (found) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(found));
      setUser(found);
      return { ok: true, user: found };
    }
    return { ok: false, message: 'Usuario o contraseña inválidos.' };
  };

  const register = (email, password) => {
    const db = readUsers();
    const exists = db.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: 'El usuario ya existe.' };

    const newUser = { id: Date.now(), email, password };
    const updated = [...db, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { ok: true, user: newUser };
  };

  const logout = () => {
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
