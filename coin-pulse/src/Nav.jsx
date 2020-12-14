import React from 'react';
import './public/nav.css';


const Nav = function({ user, onLogout }) {


  if(!user.isLoggedIn) {
    return null;
  }
  return (
      <div className="nav">
        <h2 className="app-title">Welcome To The Crypto Pulse</h2>
        <button onClick={onLogout} className="logout">Logout</button>
      </div>
  );
};

export default Nav;
