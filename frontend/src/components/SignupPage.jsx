import React, { useState, useRef, useEffect } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const [errorState, setErrorState] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const { logIn } = useAuth();

  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: object({
      username: string()
        .min(3, t('errors.min3max20'))
        .max(20, t('errors.min3max20'))
        .required(t('errors.required')),
      password: string()
        .min(6, t('errors.min6'))
        .max(20, t('errors.max20'))
        .required(t('errors.required')),
      confirmPassword: string()
        .test('confirmPassword', t('errors.mustMatch'), (value, context) => value === context.parent.password),
    }),
    onSubmit: async (values) => {
      try {
        setButtonState(true);
        const data = { username: values.username, password: values.password };
        const response = await axios.post(routes.signup, data);
        const { token, username } = response.data;
        localStorage.setItem('userId', JSON.stringify({ token, username }));
        const userId = JSON.parse(localStorage.getItem('userId'));
        logIn(userId.username);
        navigate('/');
      } catch (e) {
        logIn(false);
        console.error(e);
        setButtonState(false);
        if (e.code === 'ERR_NETWORK') {
          toast.error(t('notifies.networkError'));
        }
        setErrorState(true);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/pictures/chat_form.svg" className="rounded-circle" alt="Войти" />
              </div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1>{t('registration')}</h1>
                <div className="form-floating mb-3">
                  <input ref={inputEl} placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" className={classNames('form-control', { 'is-invalid': (formik.touched.username && formik.errors.username) || errorState })} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                  <label className="form-label" htmlFor="username">{t('username')}</label>
                  {formik.touched.username && formik.errors.username && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.username}</div>}
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className={classNames('form-control', { 'is-invalid': (formik.touched.password && formik.errors.password) || errorState })} aria-autocomplete="list" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                  <label className="form-label" htmlFor="password">{t('password')}</label>
                  {formik.touched.password && formik.errors.password && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.password}</div>}
                </div>
                <div className="form-floating mb-4">
                  <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className={classNames('form-control', { 'is-invalid': (formik.touched.confirmPassword && formik.errors.confirmPassword) || errorState })} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
                  <label className="form-label" htmlFor="confirmPassword">{t('confirmPassword')}</label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.confirmPassword}</div>}
                  {errorState && <div className="invalid-tooltip" style={{ display: 'block' }}>{t('errors.alreadyExist')}</div>}
                </div>
                <button disabled={buttonState} type="submit" value="disable" className="w-100 btn btn-outline-primary">{t('signup')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
