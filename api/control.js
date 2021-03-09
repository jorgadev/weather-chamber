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
  },
  //     start: function (data) {
  //     const interval = setInterval(this.measure(), 1000);

  //     // if mist - run steam
  //     if (optionC.includes(data.description)) {
  //       console.log("opcija C");
  //     }
  //     // if rain - run water pump
  //     else if (optionB.includes(data.description)) {
  //       console.log("opcija B");
  //     }
  //     // else doesn't run anything
  //     else {
  //       console.log("opcija A");
  //     }
  //   },

  //   stop: function () {
  //     // stop all relays and maybe sensors
  //     console.log("stopped");
  //   },

  measure: function () {
    sensor.read(DHT_TYPE, DHT_PIN, function (err, temperature, humidity) {
      if (!err) {
        const temp = Math.floor(temperature);
        const hum = Math.floor(humidity);
        console.log(`temp: ${temp}, hum: ${Math.floor(hum)}`);
        if (temp >= 26) {
          RELAY_COOLING.writeSync(1); //set pin state to 1 (turn LED on)
          RELAY_HEATING.writeSync(0);
        } else {
          RELAY_COOLING.writeSync(0);
          RELAY_HEATING.writeSync(1);
        }
      } else {
        console.log(err);
      }
    });
  },
};
