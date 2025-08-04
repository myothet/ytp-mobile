import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(' http://192.168.1.7:8000/auth/token/login/', {
        username,
        password,
      });

      const authToken = response.data.auth_token;
      setToken(authToken);
      return { success: true };
    } catch (error) {
      if (error.response) {
        // API responded with a status other than 2xx
        return { success: false, message: error.response.data.detail || 'Login failed' };
      } else {
        // Network error or something else
        return { success: false, message: 'Network error' };
      }
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context
export const useAuth = () => useContext(AuthContext);
