import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import App from './App.jsx';
import { addMessage } from './slices/messages';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io();
socket.on('newMessage', (message) => {
  console.log(message);
  useDispatch(addMessage(message));
});
root.render(
  <App socket={socket} />,
);
