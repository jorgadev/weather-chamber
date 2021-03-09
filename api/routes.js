// Import needed libraries
const axios = require("axios");
const moment = require("moment");
const mongoUtil = require("./mongo-util");

// Global vars
const WEATHER_API_KEY = "7d7a4da20bb3ed163ff4094419e5ea02";

// Database reference
const db = mongoUtil.getDb();

// index - JSON of last data from api
exports.index = (req, res) => {
  mongoUtil.getLastRow("data").then((fetchResponse) => res.json(fetchResponse));
};

// chamber - JSON of last data from chamber
exports.chamber = (req, res) => {
  mongoUtil
    .getLastRow("chamber")
    .then((fetchResponse) => res.json(fetchResponse));
};

// city - JSON of that city info direct from api
exports.city = (req, res) => {
  const city = req.params.cityName;

  // Make a request for a city
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
    )
    .then(function (response) {
      const cityToInsert = {
        name: response.data.name,
        country: response.data.sys.country,
        coord: response.data.coord,
        temp: (response.data.main.temp - 273.15).toFixed(0),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        wind: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        time: moment.unix(response.data.dt).format("HH:mm"),
      };
      mongoUtil.insertIntoDb("data", cityToInsert);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log("City name is not valid");
      res.redirect("/");
    });
};
