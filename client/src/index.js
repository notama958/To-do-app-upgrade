import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
// loading CSS
import './css/app.css';
import './css/index.css';
import './css/dashboard.css';
import './css/form.css';
import './css/kanban.css';
import './css/mobile-version.css';
import './css/auth.css';
import './css/profile.css';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
