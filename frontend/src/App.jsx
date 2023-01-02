import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import NavBar from './components/navBar.jsx';
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <NavBar />
      <RouterProvider router={router} />
    </SocketProvider>
  </AuthProvider>
);

export default App;
