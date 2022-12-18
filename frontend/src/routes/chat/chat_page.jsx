import React, { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const ChatPage = () => {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  })

  return (
    <div>Chat will be soon...</div>
  )
};

export default ChatPage;
