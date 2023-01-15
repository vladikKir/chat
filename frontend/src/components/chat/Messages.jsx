import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SendMessageForm from './SendMessageForm';
import useAuth from '../../hooks/useAuth';

const Messages = ({ curChannel, messagesList }) => {
  const { loggedIn } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.messages' });

  filter.loadDictionary('ru');

  const scrollToBottom = () => {
    const messagesBox = document.getElementById('messages-box');
    messagesBox.scrollTop += messagesBox.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {curChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            <span>{t('messagesCount')}</span>
            {messagesList
              .filter((message) => message.channelId === curChannel.id).length}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " style={{ overflow: 'auto' }}>
          {messagesList
            .filter((message) => message.channelId === curChannel.id)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.userId}</b>
                <span>: </span>
                {filter.clean(message.value)}
              </div>
            ))}
        </div>
        <SendMessageForm loggedIn={loggedIn} channelId={curChannel?.id} />
      </div>
    </div>
  );
};

export default Messages;
