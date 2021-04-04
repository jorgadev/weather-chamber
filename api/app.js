// Import needed modules and libraries
const express = require("express");
const control = require("./control");
const mongoUtil = require("./mongo-util");

// Start express app on PORT
const app = express();
const PORT = 3000;
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
    console.log("Connection with database established");

    // First run (all relays off with temperature measurement)
    control.reset();

    // Compare values in chamber and from api every 5 seconds
    setInterval(control.compare, 5000);

    // Routes
    app.get("/", routes.index);
    app.get("/chamber", routes.chamber);
    app.get("/city/:cityName", routes.city);
    app.get("/coord/lat=:lat&lon=:lon", routes.coord);
    app.get("/camera", routes.camera);
    app.get("/custom", routes.custom);
    app.post("/custom/:data", routes.custom);
    app.get("/panel", routes.panel);
  }
});
