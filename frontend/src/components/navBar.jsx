import React from "react";

const NavBar = () => {
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/" style={{display:'inline-block'}}><img src="/pictures/chat_nav.svg" alt="chat-logo" style={{width:'30px', height:'30px'}} />  Chat</a>
          </div>
        </nav>
    )
}

export default NavBar;
