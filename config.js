const config = require("./package.json").projectConfig;

module.exports = {
  mongoConfig: {
    connectionString: config.mongoConnectionUrl,
    database: "food_delivery_db",
    collections: {
      USERS: "users",
    },
  },
  server: {
    port: config.appPort,
  },
};
