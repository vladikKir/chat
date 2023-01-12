import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [errorState, setErrorState] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string()
        .required(),
      password: string()
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('api/v1/login', { username: values.username, password: values.password });
        const { token, username } = response.data;
        localStorage.setItem('userId', JSON.stringify({ token, username }));
        navigate('/');
      } catch (e) {
        if (e.code === 'ERR_NETWORK') {
          toast.error(t('notifies.networkError'));
        }
        setErrorState(true);
      }
    },
  });

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/pictures/chat_form.svg" className="rounded-circle" alt="Войти" />
                  </div>
                  <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
                    <div className="form-floating mb-3">
                      <input name="username" autoComplete="username" required placeholder="Ваш ник" id="username" className={classNames('form-control', { 'is-invalid': errorState })} onChange={formik.handleChange} value={formik.values.username} />
                      <label htmlFor="username">{t('loginPage.username')}</label>
                    </div>
                    <div className="form-floating mb-4">
                      <input name="password" autoComplete="current-password" required placeholder="Пароль" type="password" id="password" className={classNames('form-control', { 'is-invalid': errorState })} onChange={formik.handleChange} value={formik.values.password} />
                      <label className="form-label" htmlFor="password">{t('loginPage.password')}</label>
                      {errorState && <div className="invalid-tooltip" style={{ display: 'block' }}>{t('loginPage.errors.wrongLoginOrPass')}</div>}
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginPage.enter')}</button>
                  </form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{t('loginPage.noAcc')}</span>
                    <a href="/signup">{t('loginPage.registration')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
