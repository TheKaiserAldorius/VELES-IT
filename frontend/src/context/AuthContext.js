import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = useMemo(() => axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
  }), []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('auth/login/', credentials);
      localStorage.setItem('access_token', data.access);
      await loadUser();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || { detail: 'Login failed' }
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const { data } = await api.get('user_profile/me/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser({
          ...data.user,
          profile: data
        });
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    }
  };

  useEffect(() => {
    loadUser().finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    loadUser
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}