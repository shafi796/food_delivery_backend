const config = require("./package.json").projectConfig;

module.exports = {
  mongoConfig: {
    connectionString: config.mongoConnectionUrl,
    database: "food_delivery_db",
    collections: {
      USERS: "users",
      CARTS: "carts",
      FOODS: "foods",
    },
  },
  server: {
    port: config.serverPort,
    ip: config.serverIp,
  },
};
