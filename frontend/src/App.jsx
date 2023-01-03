import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices/index';
import router from './routes/router';
import NavBar from './components/navBar.jsx';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';

const App = ({ socket }) => (
  <AuthProvider>
    <SocketProvider socket={socket}>
      <Provider store={store}>
        <NavBar />
        <RouterProvider router={router} />
      </Provider>
    </SocketProvider>
  </AuthProvider>
);

export default App;
