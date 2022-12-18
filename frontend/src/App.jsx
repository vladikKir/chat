import React, { createContext, useState } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import NavBar from './components/navBar.jsx';
import AuthContext from './contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
    return (
    <AuthProvider>
        <NavBar />
        <RouterProvider router={router} />
    </AuthProvider>
    )
}

export default App;
