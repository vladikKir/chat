import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { object, string } from 'yup';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Add = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleSubmit = (body) => {
    socket.emit('newChannel', { name: body });
    dispatch(addModal('unactive'));
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

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal('unactive'))}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal('unactive'))} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">Отправить</button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
