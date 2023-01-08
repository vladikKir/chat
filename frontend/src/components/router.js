import { createBrowserRouter } from 'react-router-dom';
import ChatPage from './chat/ChatPage';
import LoginPage from './login/LoginPage';
import ErrorPage from './ErrorPage';
import SignupPage from './SignupPage';

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <ChatPage />
    ),
    errorElement: (
      <ErrorPage />
    ),
  },
  {
    path: 'login',
    element: (
      <LoginPage />
    ),
  },
  {
    path: 'signup',
    element: (
      <SignupPage />
    ),
  },
]);
