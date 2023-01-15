import { createBrowserRouter, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ChatPage from './chat/ChatPage';
import LoginPage from './login/LoginPage';
import ErrorPage from './ErrorPage';
import SignupPage from './SignupPage';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      console.log(loggedIn);
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return <ChatPage />;
};

export default createBrowserRouter([
  {
    path: routes.chatPage,
    element: (
      <PrivateRoute />
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
