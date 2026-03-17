import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.data);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        setUser(user);
        
        return { success: true, user: user }; 
      }

      return { success: false, message: "Invalid response from server" };

    } catch (error) {
      console.log("Login error:", error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};