import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Add = ({ updateModal }) => {
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
    onSubmit: ({ body }) => handleSubmit(body),
  });

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onSubmit={formik.handleSubmit} onHide={() => updateModal('unactive')}>
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => updateModal('unactive')} />
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup>
            <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
