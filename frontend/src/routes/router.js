import { createBrowserRouter } from 'react-router-dom';
import ChatPage from './chat/chat_page';
import LoginPage from './login/login_page';
import ErrorPage from './error_page';

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
]);
