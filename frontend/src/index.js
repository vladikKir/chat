import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import socket from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App socket={socket} />,
);
