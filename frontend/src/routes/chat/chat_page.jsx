import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { addChannels, channelsSelectors } from '../../slices/channels';
import { addMessages, messagesSelectors } from '../../slices/messages';

const ChatPage = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const channelsList = useSelector(channelsSelectors.selectAll);
  const messagesList = useSelector(messagesSelectors.selectAll);
  const dispatch = useDispatch();

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        const { channels, messages } = response.data;
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        console.log(channelsList);
        console.log(messagesList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  });

  const renderChannels = () => (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );

  const renderMessages = () => (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># Тут будет название канала</b>
          </p>
          <span className="text-muted">Здесь будет количество сообщений в канале</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesList.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>Имя отправителя</b>
              :
              Текст сообщения
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
              <button type="submit" disabled="" className="btn btn-group-vertical"><span className="visually-hidden">Отправить</span></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical" />
          </div>
          {renderChannels()}
        </div>
        {renderMessages()}
      </div>
    </div>
  );
};

export default ChatPage;
