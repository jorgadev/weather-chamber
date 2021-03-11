// Import needed libraries
const sensor = require("node-dht-sensor");
const Gpio = require("onoff").Gpio;
const mongoUtil = require("./mongo-util");

// Database reference
const db = mongoUtil.getDb();

// Inputs and outputs
const RELAY_COOLING = new Gpio(21, "out");
const RELAY_HEATING = new Gpio(20, "out");
const RELAY_PUMP = new Gpio(16, "out");
const RELAY_FAN = new Gpio(12, "out");
const RELAY_STEAM = new Gpio(1, "out");
const DHT_TYPE = 22;
const DHT_PIN = 4;

// All possible data from api divided in three situations
const sunny = [
  "clear sky",
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "overcast clouds",
];
const rainy = [
  "shower rain",
  "rain",
  "thunderstorm",
  "snow",
  "moderate rain",
  "light rain",
];
const misty = ["mist"];

// Module to export
module.exports = {
  reset: function () {
    RELAY_COOLING.writeSync(0);
    RELAY_HEATING.writeSync(0);
    RELAY_PUMP.writeSync(0);
    RELAY_FAN.writeSync(0);
    RELAY_STEAM.writeSync(0);
    sensor.read(DHT_TYPE, DHT_PIN, function (err, temperature, humidity) {
      if (!err) {
        const temp = Math.floor(temperature);
        const hum = Math.floor(humidity);
        console.log(
          `Relays reset and temperature (${temp}) and humidity (${hum}) read`
        );
        const startObject = {
          temperature: temp,
          humidity: hum,
          heating: 0,
          cooling: 0,
          pump: 0,
          fan: 0,
          steam: 0,
        };
        mongoUtil.insertIntoDb("chamber", startObject);
      } else {
        console.log(err);
      }
    });
  },

  compare: function () {
    const measureObject = {};
    mongoUtil.getLastRow("data").then((apiData) => {
      sensor.read(DHT_TYPE, DHT_PIN, function (err, temperature, humidity) {
        if (!err) {
          const temp = Math.floor(temperature);
          const hum = Math.floor(humidity);
          measureObject.temperature = temp;
          measureObject.humidity = hum;
          // Compare api and chamber data and control relays
          switch (checkTemperature(apiData.temp, temp)) {
            case 0:
              measureObject.cooling = 0;
              measureObject.heating = 0;
              measureObject.fan = 0;
              break;
            case 1:
              measureObject.cooling = 0;
              measureObject.heating = 1;
              measureObject.fan = 1;
              break;
            case -1:
              measureObject.cooling = 1;
              measureObject.heating = 0;
              measureObject.fan = 1;
              break;
            default:
              console.log("Error in temperature checking");
          }
          switch (checkDescription(apiData.description)) {
            case "sunny":
              measureObject.pump = 0;
              measureObject.steam = 0;
              break;
            case "rainy":
              measureObject.pump = 1;
              measureObject.steam = 0;
              break;
            case "misty":
              measureObject.pump = 0;
              measureObject.steam = 1;
              break;
            default:
              console.log("Error in description checking");
          }
          mongoUtil.insertIntoDb("chamber", measureObject);
          mongoUtil.getLastRow("chamber").then((chamberData) => {
            RELAY_COOLING.writeSync(chamberData.cooling);
            RELAY_HEATING.writeSync(chamberData.heating);
            RELAY_FAN.writeSync(chamberData.fan);
            RELAY_PUMP.writeSync(chamberData.pump);
            RELAY_STEAM.writeSync(chamberData.steam);
          });
        } else {
          console.log(err);
        }
      });
    });
  },
};

const checkTemperature = (apiTemp, chamberTemp) => {
  if (chamberTemp >= apiTemp - 1 && chamberTemp <= apiTemp + 1) {
    return 0;
  } else if (chamberTemp > apiTemp + 1) {
    return -1;
  } else if (chamberTemp < apiTemp - 1) {
    return 1;
  } else {
    return null;
  }
};

const checkDescription = (desc) => {
  if (sunny.includes(desc)) {
    return "sunny";
  } else if (rainy.includes(desc)) {
    return "rainy";
  } else if (misty.includes(desc)) {
    return "misty";
  } else {
    return null;
  }
};
