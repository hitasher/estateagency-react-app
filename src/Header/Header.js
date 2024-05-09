import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import AuthContext from "../AuthContext";

// Пример компонента Header, где user может быть состоянием, отвечающим за данные пользователя
const Header = ({onLogout }) => {

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <Link to="/dashboard" className="logo-link">На главную</Link>
        <nav className="user-nav">
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button onClick={logout} className="logout-button">Выйти</button>
            </>
          ) : (
            <Link to="/login" className="login-link">Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
