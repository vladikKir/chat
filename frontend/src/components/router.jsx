import {
  Navigate, Outlet, useLocation, Route, Routes,
} from 'react-router-dom';
import React from 'react';
import ChatPage from './chat/ChatPage';
import LoginPage from './login/LoginPage';
import ErrorPage from './ErrorPage';
import SignupPage from './SignupPage';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import NavBar from './NavBar';

const PrivateRoute = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? <ChatPage /> : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const Wrapper = () => (
  <Routes>
    <Route path={routes.chatPage} element={<Layout />}>
      <Route path={routes.chatPage} element={<PrivateRoute />} />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.signupPage} element={<SignupPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default Wrapper;
