var sensor = require("node-dht-sensor");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var RELAY_COOLING = new Gpio(21, 'out'); 
var RELAY_HEATING = new Gpio(20, 'out'); 
var RELAY_PUMP = new Gpio(16, 'out');
var RELAY_FAN = new Gpio(12, 'out');
var RELAY_STEAM = new Gpio(1, 'out');

var DHT_TYPE=22;
var DHT_PIN = 4;

const optionA = [
  "clear sky",
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "overcast clouds",
];
const optionB = [
  "shower rain",
  "rain",
  "thunderstorm",
  "snow",
  "moderate rain",
];
const optionC = ["mist"];

module.exports = {
  start: function (data) {
    // if mist - run steam
    if (optionC.includes(data.description)) {
      console.log("opcija C");
    }
    // if rain - run water pump
    else if (optionB.includes(data.description)) {
      console.log("opcija B");
    }
    // else doesn't run anything
    else {
      console.log("opcija A");
    }
  },

  stop: function () {
    // stop all relays and maybe sensors
    console.log("stopped");
  },

  measure: function() {
    sensor.read(DHT_TYPE, DHT_PIN, function(err, temperature, humidity) {
    if (!err) {
      const temp = Math.floor(temperature);
      const hum = Math.floor(humidity);
      console.log(`temp: ${temp}, hum: ${Math.floor(hum)}`);
      if(temp >= 26){
        RELAY_COOLING.writeSync(1); //set pin state to 1 (turn LED on)
        RELAY_HEATING.writeSync(0);
      }else{
        RELAY_COOLING.writeSync(0); 
        RELAY_HEATING.writeSync(1); 
      }
    }else{
    console.log(err);
    }
  }); 
  }
};
