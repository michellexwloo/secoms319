import React, { useState, useEffect } from "react";
import SubView from './SubView';

function MainView({onMainToSubView, onLogout}) {

  return (
    <div>
      <header>
        <h1>Wan Yeen Tradings</h1>
      </header>

      <div id="subheader">
        <h2>Temperature & Humidity Tracker &nbsp;&nbsp;
        <button onClick={onLogout}>Logout</button>
        </h2>
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
      </footer>
    </div>
  );
}

export default MainView;