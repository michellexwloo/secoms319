import React from "react";

function Company({ userName, onSubViewToMain, onLogout, onAbout }) {
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
        <h2>About the Company</h2>

        <h1>Wan Yeen Trading SDN Bhd</h1>
        <div>
          <h3>
            Based in Ipoh, Malaysia, the widely acclaimed Wan Yeen Group is an
            OEM and OBM service provider that has been manufacturing traditional
            Chinese medications and herbal health supplements for 20+ years. We
            stand out in the Malaysian TCM industry as one of the few players
            with a large, loyal customer base, solid R&D capabilities,
            diversified distribution channels, and a presence in multiple parts
            of the pharmaceutical supply chain.
          </h3>
        </div>
        <h4>Website: https://wyherbs.com</h4>
        <h4>Contact: +(60)12-538 6883</h4>

        <button onClick={onSubViewToMain}>Back to Main</button>
      </div>

      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
        <p onClick={onAbout}><u>Developers</u></p>
      </footer>
    </div>
  );
}

export default Company;
