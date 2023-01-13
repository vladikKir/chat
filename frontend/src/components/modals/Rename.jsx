import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FormControl, Modal, Button } from 'react-bootstrap';
import { object, string } from 'yup';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Rename = ({ channel }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = (body) => {
    if (body !== channel.name) {
      chatApi.renameChannel({ id: channel.id, name: body });
      setTimeout(() => toast.success(t('notifies.channelRename')), 100);
    }
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: object({
      body: string()
        .min(3, t('modal.add.errors.min3max20'))
        .max(20, t('modal.add.errors.min3max20'))
        .required(t('modal.rename.errors.required')),
    }),
    onSubmit: ({ body }) => handleSubmit(body),
  });

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('modal.rename.renameChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={classNames({ 'is-invalid': formik.touched.body && formik.errors.body })} ref={inputEl} id="body" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} />
          <label className="visually-hidden" htmlFor="name">{t('modal.add.channelName')}</label>
          {formik.touched.body && formik.errors.body && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.body}</div>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>{t('modal.rename.cancel')}</Button>
        <Button variant="primary" type="submit" onClick={() => handleSubmit(channel.name)}>{t('modal.rename.save')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
