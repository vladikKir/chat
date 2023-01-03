import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from './slices/messages';
import { addChannel } from './slices/channels';

const socket = io();
socket.on('newMessage', (message) => {
  console.log(message);
  useDispatch(addMessage(message));
});
socket.on('newChannel', (channel) => {
  useDispatch(addChannel(channel));
});

export default socket;
