// App.js

import React, {useContext} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {AuthContext, AuthProvider} from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginForm from './LoginForm/LoginForm';
import Dashboard from "./Dashboard/Dashboard";

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
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
};

export default App;
