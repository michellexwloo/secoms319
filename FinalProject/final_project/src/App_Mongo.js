var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "secom319_final";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());


/*
DISPLAY:"DATE:11/30/23  TIME: 13:01  
                        TEMP: 22.2°C (72.0°F)   
                        HUMIDITY: 45%"
*/
app.get("/listTemps", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    
    const query = {};
    
    const results = await db
        .collection("TempHumidity")
        .find(query)
        .limit(100)
        .toArray();
    
        //console.log(results);

    // Iterate over each result and format it
    //const formattedResults = results.map(formatAsTable);
    console.log(results);
    res.status(200);
    res.send(results);
});

function formatAsTable(jsonResponse) {
    // Parse date and time
    const dateTime = new Date(jsonResponse.DateTime);
    const dateFormatted = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${String(dateTime.getFullYear()).slice(-2)}`;
    const timeFormatted = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;

    // Format temperature
    const tempCelsius = jsonResponse.Temp_C;
    const tempFahrenheit = jsonResponse.Temp_F;
    const tempFormatted = `${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;

    // Format humidity
    const humidity = jsonResponse.Humidity;
    const humidityFormatted = `${humidity}%`;

    // Create the final string
    const resultString = `"DATE:${dateFormatted}  TIME: ${timeFormatted}\n  TEMP: ${tempFormatted}\n  HUMIDITY: ${humidityFormatted}"`;

    return resultString;
  }



const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});
