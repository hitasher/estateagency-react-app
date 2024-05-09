// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginForm from './LoginForm/LoginForm';
// import Dashboard from './Dashboard'; // Защищенный компонент после авторизации (нужно создать)

const App = () => {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          {/*<PrivateRoute path="/dashboard" component={Dashboard} />*/}
          {/* Остальные маршруты */}
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
};

export default App;
