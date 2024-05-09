import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authData } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        authData ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
