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

app.use(bodyParser.json());
app.use(cors());


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

app.get("/recordCount", async (req, res) => {
    try{
    await client.connect();
    console.log("Node connected successfully to RECORD COUNT");
    
    const itemCount = await db
        .collection("TempHumidity")
        .countDocuments();
    
    const itemArray = {"Records_Found" : itemCount};
    console.log(itemCount);
    //res.sendStatus(200);
    res.send(itemArray);
    } catch (error) {
        console.error('Error fetching record count:', error.message);
        res.status(500).send('Internal Server Error');
    } finally {
        //await client.close(); // Close the MongoDB connection
    }
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


app.delete("/deleteRecords", async (req, res) => {
    try{
    await client.connect();

    const query = {};

    const itemCount = await db
        .collection("TempHumidity")
        .countDocuments();

    const recentItems = await db.collection("TempHumidity")
        .find({})
        .sort({_id: -1})
        .limit(100)
        .toArray();

    if(itemCount >100){
        const recentItemIds = recentItems.map((item) => item._id);
        const deleteQuery = { _id: { $nin: recentItemIds } };
        const deleteResult = await db.collection("TempHumidity").deleteMany(deleteQuery);
        console.log(`Deleted ${deleteResult.deletedCount} items.`);
    } else{
        console.log('Less than 101 items in the collection. No deletion performed.');
        res.send('Less than 101 items in the collection. No deletion performed.').status(200);
    }
    } catch (error){
        console.error('Error deleting records:', error);
        res.status(500).send('Internal Server Error');
    } finally{
        //if (!results) res.send("Not Found").status(404);
    }
});


const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});
