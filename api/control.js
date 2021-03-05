const relay1 = 0;
const relay2 = 0;
const relay3 = 0;
const sensor1 = 0;
const sensor2 = 0;
const sensor3 = 0;

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
};
