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
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <NavBar />
        <RouterProvider router={router} />
      </SocketProvider>
    </Provider>
  </AuthProvider>
);

export default App;
