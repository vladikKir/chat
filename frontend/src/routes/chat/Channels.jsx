import React from 'react';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';

const Channels = ({ curChannel, channelsList, setChannel }) => {
  const chooseChannel = (id) => {
    const newChannel = channelsList.find((channel) => channel.id === id);
    setChannel(newChannel);
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => {
        const className = classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.id === curChannel.id });
        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <div role="group" className="d-flex dropdown btn-group">
                <button type="button" className={className} onClick={() => chooseChannel(channel.id)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                <Dropdown>
                  <Dropdown.Toggle variant="btn-secondary" id="dropdown-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          );
        }
        return (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={className} onClick={() => chooseChannel(channel.id)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
