// Import needed modules and libraries
const express = require("express");
const control = require("./control");
const mongoUtil = require("./mongo-util");

// GLobal vars
const WEATHER_API_KEY = "7d7a4da20bb3ed163ff4094419e5ea02";
const PORT = 3000;

// Define express app and mongodb
const app = express();
const db = mongoUtil.getDb();

// Express server starts on port 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Connect to database
mongoUtil.connectToServer(function (err, client) {
  // Import routes module here because it will consume database
  const routes = require("./routes");

  if (err) {
    console.log("Not connected with database: " + err);
  } else {
    console.log("Connected with database established");

    // First run (all relays off and temperature measurement) and enable routes
    control.start();

    app.get("/", routes.index);
    app.get("/chamber", routes.chamber);
    app.get("/city/:cityName", routes.city);
  }
});

// // Establish connection with mongodb
// MongoClient.connect(
//   url,
//   { useUnifiedTopology: true }
// )
//   // Connection is successful
//   .then((client) => {
//     console.log("Connected to database");
//     const db = client.db("weather-chamber-db");
//     const dataCollection = db.collection("data");

//     control.start();

//     // ROUTES
//     // When index page is visited get last row from database
//     app.get("/", (req, res) => {
//       db.collection("data")
//         .find()
//         .limit(1)
//         .sort({ $natural: -1 })
//         .toArray()
//         .then((result) => {
//           return res.json(result[0]);
//         })
//         .catch((err) => console.error(err));
//     });
//   })
//   // Unsuccessful connection
//   .catch((error) => {
//     console.error("Not Connected to Database: " + error);
//   });

// // object that will be inserted into db
// let dbObject = {};

// // city insertion by city name
// app.get("/city/:cityName", (req, res) => {
//   const city = req.params.cityName;

//   //fetch data for passed city
//   fetch(
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//       city +
//       "&appid=" +
//       WEATHER_API_KEY
//   )
//     .then(function (resp) {
//       return resp.json();
//     })
//     .then(function (data) {
//       // if data is not fetched redirect to "/" route
//       if (data.cod != "404") {
//         insertIntoDb(res, data);
//       } else {
//         res.json(data);
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

// // city insertion by city coords
// app.get("/coord/lat=:lat&lon=:lon", (req, res) => {
//   const coord = req.params;
//   fetch(
//     "http://api.openweathermap.org/data/2.5/weather?lat=" +
//       coord.lat +
//       "&lon=" +
//       coord.lon +
//       "&appid=" +
//       WEATHER_API_KEY
//   )
//     .then(function (resp) {
//       return resp.json();
//     })
//     .then(function (data) {
//       // if data is not fetched redirect to "/" route
//       if (data.cod != "404") {
//         insertIntoDb(res, data);
//       } else {
//         res.json(data);
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

// // city insertion by city coords
// app.get("/camera", (req, res) => {
//   res.send("camera view");
// });

// function to insert object into database
// const insertIntoDb = (res, data) => {
//   dbObject = {
//     name: data.name,
//     country: data.sys.country,
//     coord: data.coord,
//     temp: (data.main.temp - 273.15).toFixed(0),
//     humidity: data.main.humidity,
//     pressure: data.main.pressure,
//     wind: data.wind.speed,
//     description: data.weather[0].description,
//     icon: data.weather[0].icon,
//     time: moment.unix(data.dt).format("HH:mm"),
//   };
//   dataCollection
//     .insertOne(dbObject)
//     .then((result) => {
//       console.log(`Successfully inserted "${dbObject.name}" into database`);
//       control.start(dbObject);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
