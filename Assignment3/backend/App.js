var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

console.log("test");

//Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

const port = "8081";
const host = "localhost";

// Read all
app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

// Read by id
app.get("/listProducts/:id", async (req, res) => {
  const itemid = Number(req.params.id);
  console.log("Item to find :", itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: itemid };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

// Create
app.post("/addProducts", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0];
  const title = values[1];
  const price = values[2];
  const description = values[3];
  const category = values[4];
  const image = values[5];
  const rate = values[6];
  const count = values[7];
  console.log(id, title, price, description, image);
  const newDocument = {
    id: id,
    title: title,
    price: price,
    description: description,
    category: category,
    image: image,
    rating: { rate: rate, count: count },
  };
  const results = await db
    .collection("fakestore_catalog")
    .insertOne(newDocument);
  res.status(200);
  res.send(results);
});

// Update
app.put("/updateProducts", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0];
  const price = values[1];
  const results = await db
    .collection("fakestore_catalog")
    .updateOne({ id: id }, { $set: { price: price } });
  res.status(200);
  res.send(results);
});

// Delete
app.delete("/deleteProducts", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  //   const values = Object.values(req.body);
  //   const id = values[0];
  const id = req.body.id;
  console.log("Product id to delete :", id);
  const query = { id: id };
  const results = await db.collection("fakestore_catalog").deleteOne(query);
  res.status(200);
  res.send(results);
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
