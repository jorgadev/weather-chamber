const express = require("express");
const app = express();
const fetch = require("node-fetch");
const MongoClient = require("mongodb").MongoClient;

// server starts
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// connection to mongodb cluster on mongodb atlas cloud
MongoClient.connect(
  "mongodb+srv://wc:rasosora123@cluster0.3bmw3.mongodb.net/weather-chamber-db?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  // connection to db successfull
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("weather-chamber-db");
    const dataCollection = db.collection("data");

    // index page visited
    app.get("/", (req, res) => {
      //get last inserted row from database
      db.collection("data")
        .find()
        .toArray()
        .then((results) => {
          res.json(results[results.length - 1]);
        })
        .catch((error) => console.error(error));
    });

    // object that will be inserted into db
    let dbObject = {};
    const apiKey = "7d7a4da20bb3ed163ff4094419e5ea02";

    // city insertion by city name
    app.get("/city/:cityName", (req, res) => {
      const city = req.params.cityName;
      //fetch data for passed city
      fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          apiKey
      )
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          // if data is not fetched redirect to "/" route
          if (data.cod != "404") {
            insertIntoDb(res, data);
          } else {
            res.json(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    });

    // city insertion by city coords
    app.get("/coord/lat=:lat&lon=:lon", (req, res) => {
      const coord = req.params;
      fetch(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          coord.lat +
          "&lon=" +
          coord.lon +
          "&appid=" +
          apiKey
      )
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          // if data is not fetched redirect to "/" route
          if (data.cod != "404") {
            insertIntoDb(res, data);
          } else {
            res.json(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    });

    // city insertion by city coords
    app.get("/camera", (req, res) => {
      res.send("camera view");
    });

    // function to insert object into database
    const insertIntoDb = (res, data) => {
      dbObject = {
        name: data.name,
        country: data.sys.country,
        coord: data.coord,
        temp: (data.main.temp - 273.15).toFixed(0),
        humidity: data.main.humidity,
        description: data.weather[0].description,
      };
      dataCollection
        .insertOne(dbObject)
        .then((result) => {
          console.log(`Successfully inserted "${dbObject.name}" into database`);
          res.json(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  })
  // connection to database not succeed
  .catch((error) => {
    console.error("Not Connected to Database: " + error);
  });
