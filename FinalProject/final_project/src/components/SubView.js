import React from "react";

function SubView({onSubViewToMain, onLogout}) {
  
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