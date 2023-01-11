import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { addChannels, channelsSelectors } from '../../slices/channels';
import { fetchMessages, messagesSelectors } from '../../slices/messages';
import getModal from '../modals/modals';
import { addModal } from '../../slices/modal';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const { loggedIn, logIn } = useAuth();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modal.value);

  const channelsList = useSelector(channelsSelectors.selectAll);
  const [curChannel, setChannel] = useState(channelsList.find((channel) => channel.id === 1));
  const messagesList = useSelector(messagesSelectors.selectAll);
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.main' });

  const userId = JSON.parse(localStorage.getItem('userId'));

  const getAuthHeader = () => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        const { channels, messages } = response.data;
        dispatch(addChannels(channels));
        if (messages.length !== 0) {
          dispatch(fetchMessages(messages));
        }
        logIn(userId.username);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn === false) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('channels')}</span>
            <button type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addModal({ type: 'add' }))}>+</button>
          </div>
          <Channels curChannel={curChannel} channelsList={channelsList} setChannel={setChannel} />
        </div>
        <Messages curChannel={curChannel} messagesList={messagesList} />
        {getModal(modalState)}
      </div>
    </div>
  );
};

export default ChatPage;
