import React, { useState, useEffect } from "react";
import SubView from './SubView';

function MainView({userName, onMainToSubView, onLogout, onAbout}) {

  return (
    <div>
      <header>
        <h1>Wan Yeen Tradings</h1>
      </header>

      <div id="subheader2">
        <div id="title"><h2>Temperature & Humidity Tracker</h2></div>
        <div id="username">{userName && <h3>{userName}</h3>}
        <button onClick={onLogout}>Logout</button></div>
      </div>

      <div id="content">
      <div>
      <h1>°F &nbsp;&nbsp;
      <button onClick={onMainToSubView}>Convert to Celsius</button>
      </h1>
      </div>
      {/* TODO */}

      </div>
      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
        <p onClick={onAbout}><u>About Us</u></p>
      </footer>
    </div>
  );
}

export default MainView;