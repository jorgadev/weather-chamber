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
const rainy = ["shower rain", "rain", "thunderstorm", "snow", "moderate rain"];
const misty = ["mist"];

// Module to export
module.exports = {
  start: function () {
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
    this.measure();
  },

  measure: function () {
    mongoUtil.getLastRow("data").then((apiData) => {
      sensor.read(DHT_TYPE, DHT_PIN, function (err, temperature, humidity) {
        if (!err) {
          const temp = Math.floor(temperature);
          // Compare api and chamber data and control relays
          switch (checkTemperature(apiData.temp, temp)) {
            case 0:
              console.log("nic ne vklapljaj");
              break;
            case 1:
              console.log("vklopi grelec");
              RELAY_COOLING.writeSync(0);
              RELAY_HEATING.writeSync(1);
              break;
            case -1:
              console.log("vklopi hladilnik");
              RELAY_COOLING.writeSync(1);
              RELAY_HEATING.writeSync(0);
              break;
            default:
              console.log("napaka pri izracunu temperature");
          }
        } else {
          console.log(err);
        }
      });

      // checkDescription(apiData.description);
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
