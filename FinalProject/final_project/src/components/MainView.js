import React, { useState, useEffect } from "react";
import SubView from "./SubView";
import { Container } from "react-bootstrap";




function MainView({ userName, onMainToSubView, onLogout, onAbout, onCompany }) {
  
  const [data, setData] = useState([]);
  let result ="";
  let fuck;

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8081/listTemps');
      response.json().then(data=>{
        setData(data);
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
  
      result = await response; // Assuming the response contains JSON data
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  
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
        <h1>100 Most recent temperature and humidity readings</h1>
        {data.map(item=>(
          <div key={item._id}>{
           `DateTime: ${item.DateTime}___Temperature: ${item.Temp_C}℃ (${item.Temp_F}℉)___Humidity: ${item.Humidity}%`
           }
           </div>
        ))}
        
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
