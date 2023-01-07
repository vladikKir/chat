import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { object, string } from 'yup';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);

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
        .min(1, 'Must be at least 1 character')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: ({ body }) => handleSubmit(body),
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>

          <FormGroup>
            <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />

          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="submit">Отправить</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
