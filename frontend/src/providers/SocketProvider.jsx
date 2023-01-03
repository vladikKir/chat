import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/SocketContext';
import { addMessage } from '../slices/messages';
import { addChannel } from '../slices/channels';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
