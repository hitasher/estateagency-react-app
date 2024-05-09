import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Стили для компонента Header

// Пример компонента Header, где user может быть состоянием, отвечающим за данные пользователя
const Header = ({ user, onLogout }) => {
  // Здесь пример функции для выхода, которую нужно реализовать
  const handleLogout = () => {
    onLogout(); // Функция, которая будет обрабатывать выход пользователя
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/dashboard" className="logo-link">На главную</Link>
        <nav className="user-nav">
          {user ? (
            <>
              <span className="username">{user.name}</span>
              <button onClick={handleLogout} className="logout-button">Выйти</button>
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
