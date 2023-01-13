import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import classNames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);

  const { t } = useTranslation();

  const handleSubmit = (name) => {
    chatApi.addChannel({ name });
    setTimeout(() => toast.success(t('notifies.channelAdd')), 100);
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: object({
      name: string()
        .min(3, t('modal.add.errors.min3max20'))
        .max(20, t('modal.add.errors.min3max20'))
        .required(t('modal.add.errors.required')),
    }),
    onSubmit: ({ name }) => handleSubmit(name),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <>
      <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
        <Modal.Header>
          <Modal.Title>{t('modal.add.addChannel')}</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <FormGroup>
              <FormControl className={classNames({ 'is-invalid': formik.touched.name && formik.errors.name })} ref={inputEl} name="name" id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
              <label className="visually-hidden" htmlFor="name">{t('modal.add.channelName')}</label>
              {formik.touched.name && formik.errors.name && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.name}</div>}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">{t('modal.add.send')}</button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Add;
