import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { addChannels, setCurChannel, channelsSelectors } from '../../slices/channels';
import { fetchMessages, messagesSelectors } from '../../slices/messages';
import getModal from '../modals/modals';
import { addModal } from '../../slices/modal';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../../routes';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();
  const modalState = useSelector((state) => state.modal.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const channelsList = useSelector(channelsSelectors.selectAll);
  const curChannel = useSelector((state) => state.channels.curChannel);
  const messagesList = useSelector(messagesSelectors.selectAll);

  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.main' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const response = await axios.get(routes.data, { headers: getAuthHeader(userId) });
        const { channels, messages } = response.data;
        dispatch(addChannels(channels));
        if (messages.length !== 0) {
          dispatch(fetchMessages(messages));
        }
      } catch (e) {
        console.error(e);
        navigate(routes.loginPage);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('channels')}</span>
            <button type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addModal({ type: 'add' }))}>
              <img src="https://img.icons8.com/ultraviolet/40/null/plus-2-math.png" alt="" style={{ width: '20px', height: '20px' }} />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels
            curChannel={curChannel}
            channelsList={channelsList}
            setCurChannel={setCurChannel}
          />
        </div>
        <Messages
          curChannel={curChannel}
          messagesList={messagesList}
          channelsList={channelsList}
        />
        {getModal(modalState)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatPage;
