// Utilities for MongoDB
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://wc:rasosora123@cluster0.3bmw3.mongodb.net/weather-chamber-db?retryWrites=true&w=majority";
var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        _db = client.db("weather-chamber-db");
        return callback(err);
      }
    );
  },

  getDb: function () {
    return _db;
  },

  insertIntoDb: function (collection, data) {
    _db
      .collection(collection)
      .insertOne(data)
      .then(() => {
        console.log(
          `Successfully inserted ${JSON.stringify(data)} into database`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  },

  getLastRow: function (collection) {
    return _db
      .collection(collection)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .toArray()
      .then((result) => {
        return result[0];
      })
      .catch((err) => console.error(err));
  },
};
