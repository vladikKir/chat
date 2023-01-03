import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import { addChannels, channelsSelectors } from '../../slices/channels';
import { fetchMessages, messagesSelectors } from '../../slices/messages';
import SendMessageForm from './SendMessageForm';
import getModal from '../../components/modals/modals';
import { addModal } from '../../slices/modal';

const ChatPage = () => {
  const { loggedIn, logIn } = useAuth();
  const navigate = useNavigate();
  const [channelName, setChannel] = useState('general');

  const modalState = useSelector((state) => state.modal.value);
  const channelsList = useSelector(channelsSelectors.selectAll);
  const messagesList = useSelector(messagesSelectors.selectAll);
  const dispatch = useDispatch();

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

  const renderChannels = () => (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => {
        const className = classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.name === channelName });
        return (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={className} onClick={() => setChannel(channel.name)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
    </ul>
  );

  const renderMessages = () => (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channelName}
            </b>
          </p>
          <span className="text-muted">
            <span>Сообщений: </span>
            {messagesList
              .filter((message) => message.channelName === channelName).length}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesList
            .filter((message) => message.channelName === channelName)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.userId}</b>
                :
                {message.value}
              </div>
            ))}
        </div>
        <SendMessageForm loggedIn={loggedIn} channelName={channelName} />
      </div>
    </div>
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addModal('add'))}>+</button>
          </div>
          {renderChannels()}
        </div>
        {renderMessages()}
        {getModal(modalState)}
      </div>
    </div>
  );
};

export default ChatPage;
