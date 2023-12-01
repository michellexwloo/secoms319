import React, { useState, useEffect } from "react";

function SubView({ userName, onSubViewToMain, onLogout, onAbout, onCompany}) {
  return (
    <div>
      <header>
        <h1>Wan Yeen Tradings</h1>
      </header>

      <div id="subheader2">
        <div id="title">
          <h2>Temperature & Humidity Tracker</h2>
        </div>
        <div id="username" style={{ display: "flex", alignItems: "center" }}>
          {userName && (
            <h3 style={{ display: "inline", marginRight: "10px" }}>
              {userName}
            </h3>
          )}
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div id="content">
        <h1>
          °C &nbsp;&nbsp;
          <button onClick={onSubViewToMain}>Convert to Fahrenheit</button>
        </h1>
        {/* TODO */}
      </div>
      
      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
        <div>
          <p style={{
              display: "inline",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={onAbout}>
            <u>Developers</u>
          </p>
          <p
            style={{ display: "inline", cursor: "pointer" }}
            onClick={onCompany}>
            <u>Company</u>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SubView;
