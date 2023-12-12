import React, { useState, useEffect } from "react";


function MainView({ userName, onLogout, onAbout, onCompany }) {
  
  const [data, setData] = useState([]);
  let result ="";
  let dateStore ="";
  const [itemCount, setCount]= useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    recordCount();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8081/listTemps');
      // response.json().then(data=>{
      //   setData(data);
      // });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
      
      //result = await response; // Assuming the response contains JSON data
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  async function recordCount() {
    //console.log("count");
    try {
      const response = await fetch('http://localhost:8081/recordCount');
   
      if(!response.ok){
        throw new Error('Failed to fetch itemCount');
      }
      const itemCount = await response.text();
      setCount(itemCount);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  async function handleDelete(){
    try{
      const response = await fetch('http://localhost:8081/deleteRecords', {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Request processed.');
      } else {
        console.error('Error deleting records:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
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

      <div id="content2">
        <div>
          <p>{itemCount}</p>
          <p>Click the button below to delete all but the 100 most recent records </p>
            <button onClick={handleDelete}>Clean collection</button>
        </div>

        <h1>100 Most recent temperature and humidity readings</h1>
        {data.map(item=>(
          <div key={item._id}>{(() =>{
            const dateTime = new Date(item.DateTime);
            const spacing = ' . . . ';
            const dateSpace = ' . . . . . . . . . . . . . . . . . .';

            if(dateStore !== dateTime.toLocaleDateString()){
              dateStore = dateTime.toLocaleDateString();
              result = `Date: ${dateTime.toLocaleDateString()}${spacing}Time: ${dateTime.toLocaleTimeString()}${spacing}Temperature: ${item.Temp_C}℃ (${item.Temp_F}℉)${spacing}Humidity: ${item.Humidity}%`;
            }else{
              result = `${dateSpace}Time: ${dateTime.toLocaleTimeString()}${spacing}Temperature: ${item.Temp_C}℃ (${item.Temp_F}℉)${spacing}Humidity: ${item.Humidity}%`;
            }
            return result;
           })()}
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
