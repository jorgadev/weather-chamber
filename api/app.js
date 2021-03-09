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
    app.get("/coord/lat=:lat&lon=:lon", routes.coord);
    app.get("/camera", routes.camera);
  }
});
