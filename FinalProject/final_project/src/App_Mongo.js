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


app.get("/listTemps", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    
    const query = {};
    
    const results = await db
        .collection("TempHumidity")
        .find(query)
        .sort({ DateTime: -1})
        .limit(100)
        .toArray();
    
    //console.log(results);
    res.status(200);
    res.send(results);
});

app.post("/postTemp", async (req, res) => {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const dateTime = values[0];
    const tempC = values[1];
    const tempF = values[2];
    const humidity = values[3];

    console.log(dateTime, tempC);
    const newDocument = {
        "DateTime" : dateTime,
        "Temp_C" : tempC,
        "Temp_F" : tempF,
        "Humidity" : humidity
    };

    const results = await db.collection("TempHumidity").insertOne(newDocument);
    res.status(200);
    res.send(results);
});

// function formatAsTable(jsonResponse) {
//     // Parse date and time
//     const dateTime = new Date(jsonResponse.DateTime);
//     const dateFormatted = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${String(dateTime.getFullYear()).slice(-2)}`;
//     const timeFormatted = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;

//     // Format temperature
//     const tempCelsius = jsonResponse.Temp_C;
//     const tempFahrenheit = jsonResponse.Temp_F;
//     const tempFormatted = `${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;

//     // Format humidity
//     const humidity = jsonResponse.Humidity;
//     const humidityFormatted = `${humidity}%`;

//     // Create the final string
//     const resultString = `"DATE:${dateFormatted}  TIME: ${timeFormatted}\n  TEMP: ${tempFormatted}\n  HUMIDITY: ${humidityFormatted}"`;

//     return resultString;
//   }



const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});
