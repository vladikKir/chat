import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.jsx';

const init = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  root.render(
    <App socket={socket} />,
  );
};

init();
