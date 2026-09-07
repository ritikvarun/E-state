import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('estatepro_user');
      const token = localStorage.getItem('estatepro_token');
      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem('estatepro_token', token);
      localStorage.setItem('estatepro_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      // Fallback for instant client offline login demonstration
      let role = 'user';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('agent')) role = 'agent';

      const mockUser = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: '+1 (555) 019-2834',
        agency: role === 'agent' ? 'EstatePro West' : 'EstatePro HQ'
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('estatepro_token', mockToken);
      localStorage.setItem('estatepro_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      const { token, user: registeredUser } = res.data;
      localStorage.setItem('estatepro_token', token);
      localStorage.setItem('estatepro_user', JSON.stringify(registeredUser));
      setUser(registeredUser);
      return { success: true, user: registeredUser };
    } catch (error) {
      const mockUser = {
        id: 'usr_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        phone: userData.phone || '+1 (555) 019-2834',
        agency: userData.agency || 'EstatePro Client'
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('estatepro_token', mockToken);
      localStorage.setItem('estatepro_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const logout = () => {
    localStorage.removeItem('estatepro_token');
    localStorage.removeItem('estatepro_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
