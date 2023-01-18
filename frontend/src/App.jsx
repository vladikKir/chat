import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import resources from './locales/index';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';
import Wrapper from './components/router';

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

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    environment: 'production',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <SocketProvider socket={socket}>
              <BrowserRouter>
                <Wrapper />
              </BrowserRouter>
            </SocketProvider>
          </I18nextProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};
export default App;
