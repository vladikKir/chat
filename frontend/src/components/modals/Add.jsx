import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.add' });

  const handleSubmit = (body) => {
    chatApi.addChannel({ name: body });
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: object({
      body: string()
        .min(1, t('errors.min1'))
        .max(15, t('errors.max15'))
        .required(t('errors.required')),
    }),
    onSubmit: ({ body }) => handleSubmit(body),
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('addChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl className={classNames({ 'is-invalid': formik.touched.body && formik.errors.body })} ref={inputEl} id="body" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.body} />
            {formik.touched.body && formik.errors.body && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.body}</div>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="submit">{t('send')}</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
