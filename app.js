const express = require("express");

const app = express();
const config = require("./config");
const MongoDB = require("./src/config/mongo");

app.use(express.static("static"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

MongoDB.connectToMongo().then(async (db) => {
  if (db) {
    console.log("MongoDB Connected");
  } else {
    console.log("MongoDB not Connected");
  }
});

app.use("/", require("./src/routes/authentication.route"));
app.use("/cart", require("./src/routes/cart.route"));
app.use("/food", require("./src/routes/food.route"));

app.listen(config.server.port, config.server.ip, () => {
  console.log(
    `Food Delivery app listening at http://${config.server.ip}:${config.server.port}`
  );
});
