import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

let data = JSON.stringify({
  "username": "user3",
  "password": "1234"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/api/auth/register',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
