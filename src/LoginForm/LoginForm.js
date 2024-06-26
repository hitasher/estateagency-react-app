import './LoginForm.css'
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/auth/authenticate',
      headers: {
        'Content-Type': 'application/json'
      },
      data : credentials
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const token = response.data.token;
        const role = response.data.role;
        let userData = {
          username: credentials.username,
          token: token,
          role: role
        }
        login(userData)
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Вход в систему</h2>
        <div className="input-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
