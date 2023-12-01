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
    res.status(200);
    res.send(results);
});





const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});
