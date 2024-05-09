import React, { createContext, useState } from 'react';

// Создание контекста
const AuthContext = createContext(null);

// Создание провайдера контекста
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // Значение, передаваемое провайдером
  const authContextValue = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
