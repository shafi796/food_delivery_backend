const { mongoConfig } = require("../../config");
const MongoClient = require("mongodb").MongoClient;

class MongoDB {
  static async connectToMongo() {
    if (this.db) return this.db;
    let db_connection = await MongoClient.connect(
      this.connectionString,
      this.options
    );
    this.db = await db_connection.db(mongoConfig.database);
    return this.db;
  }
}

MongoDB.db = null;
MongoDB.connectionString = mongoConfig.connectionString;
MongoDB.options = {
  bufferMaxEntries: 0,
  //reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = MongoDB;
