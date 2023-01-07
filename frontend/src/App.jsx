import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import router from './routes/router';
import NavBar from './components/navBar.jsx';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';

const App = () => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(renameChannel({ id, changes: { name } }));
  });

  return (
    <AuthProvider>
      <SocketProvider socket={socket}>
        <NavBar />
        <RouterProvider router={router} />
      </SocketProvider>
    </AuthProvider>
  );
};
export default App;
