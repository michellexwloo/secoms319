import React, { useState, useEffect } from "react";

function SubView({userName, onSubViewToMain, onLogout}) {
  
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
      <h1>°C &nbsp;&nbsp;
      <button onClick={onSubViewToMain}>Convert to Fahrenheit</button>
      </h1>
      {/* TODO */}

      </div>
      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
      </footer>
    </div>
    
  );
}

export default SubView;