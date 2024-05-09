import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const setAuthInfo = ({ token }) => {
    setAuthData(token);
    // Вы также можете сохранить токен в localStorage
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
