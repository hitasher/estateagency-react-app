// App.js

import React, {useContext} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Dashboard from "./Dashboard/Dashboard";
import ListingDetail from "./ListingDetail/ListingDetail";
import Header from "./Header/Header";
import {AuthProvider} from "./AuthContext";
import EditableAd from "./EditableAd/EditableAd";

function RequireAuth({ children }: { children: JSX.Element }) {
  return children;
}


const App = () => {
  const [user, setUser] = React.useState(null);

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
              <Route path="/edit/:id" element={<EditableAd/>}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
