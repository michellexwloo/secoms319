import React, { useState, useEffect } from "react";
import SubView from "./SubView";

function MainView({ userName, onMainToSubView, onLogout, onAbout, onCompany }) {
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
        <div>
          <h1>
            °F &nbsp;&nbsp;
            <button onClick={onMainToSubView}>Convert to Celsius</button>
          </h1>
        </div>
        {/* TODO */}
      </div>
      
      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
        <div>
          <p
            style={{
              display: "inline",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={onAbout}
          >
            <u>Developers</u>
          </p>
          <p
            style={{ display: "inline", cursor: "pointer" }}
            onClick={onCompany}
          >
            <u>Company</u>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainView;
