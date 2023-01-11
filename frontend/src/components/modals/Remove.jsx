import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Remove = ({ channelId }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();

  const { t } = useTranslation('translation', { keyPrefix: 'modal.remove' });

  const handleRemove = (id) => {
    chatApi.removeChannel(id);
    dispatch(addModal({ type: 'unactive' }));
  };

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        {t('sure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>{t('cancel')}</Button>
        <Button variant="danger" type="submit" onClick={() => handleRemove(channelId)}>{t('delete')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
