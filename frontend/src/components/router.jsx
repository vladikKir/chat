import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import ChatPage from './chat/ChatPage';
import LoginPage from './login/LoginPage';
import ErrorPage from './ErrorPage';
import SignupPage from './SignupPage';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

export default createBrowserRouter([
  {
    path: routes.chatPage,
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
    errorElement: (
      <ErrorPage />
    ),
  },
  {
    path: routes.loginPage,
    element: (
      <LoginPage />
    ),
  },
  {
    path: routes.signupPage,
    element: (
      <SignupPage />
    ),
  },
]);
