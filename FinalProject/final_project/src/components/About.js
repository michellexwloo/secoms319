import React from "react";

function About({userName, onSubViewToMain, onLogout, onCompany}) {
  return (
    <div>
      <header>
        <h1>Wan Yeen Tradings</h1>
      </header>

      <div id="subheader2">
        <div id="title"><h2>Temperature & Humidity Tracker</h2></div>
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
      <h2>About Us</h2>

      <h1>SE/COM S 319: Construction of User Interface</h1>
    <h2>Created by: </h2>
    <section id="creator">
        <h4 id="team">Team 24</h4>
        <div class="container-sm text-center">
            <div class="row">
                <div class="col student">
                    <p>
                        <strong>Name: </strong>Chris Smith | &nbsp;
                        <strong>Email: </strong>clsmith3@iastate.edu
                    </p>
                </div>
                <div class="col student">
                    <p>
                        <strong>Name: </strong>Xuan Wen Loo | &nbsp;
                        <strong>Email: </strong>xuanwen@iastate.edu
                    </p>
                </div>
            </div>
        </div>
    </section>
    <h5>Date: 23 November 2023</h5>
    <h4>Professor: Dr. Abraham Aldaco</h4>

      <button onClick={onSubViewToMain}>Back to Main</button>

      </div>

      <footer>
        <p>&copy; Wan Yeen Trading's Warehouse Tracker. All rights reserved.</p>
        <p onClick={onCompany}><u>Company</u></p>
      </footer>
    </div>
  );
}

export default About;