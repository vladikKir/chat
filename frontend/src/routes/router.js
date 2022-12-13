import { createBrowserRouter } from 'react-router-dom';
import LoginPage from "./login/login";
import ErrorPage from "./error_page";

export default createBrowserRouter([
    {
      path: '/',
      element: (
        <LoginPage />
      ),
      errorElement: (
        <ErrorPage />
      )
    },
    {
      path: 'login',
      element: (
        <LoginPage />
      ),
    },
]);
