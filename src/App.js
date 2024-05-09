// App.js

import React, {useContext} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {AuthContext, AuthProvider} from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginForm from './LoginForm/LoginForm';
import Dashboard from "./Dashboard/Dashboard";
import ListingDetail from "./ListingDetail/ListingDetail";
import Header from "./Header/Header";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authData } = useContext(AuthContext);
  let location = useLocation();

  if (!authData) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}


const App = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    // Здесь должна быть логика входа (например, запрос на API и установка пользователя)
    setUser(userData); // Предположим, что userData - это объект с данными пользователя
  };

  const handleLogout = () => {
    // Здесь должна быть логика выхода (например, удаление токена доступа)
    setUser(null); // Сброс состояния пользователя при выходе
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <Header user={user} onLogout={handleLogout}/>
          <div className="page-body">
            <Routes>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/dashboard/:id" element={<ListingDetail/>}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
