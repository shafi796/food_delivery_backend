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

app.listen(config.server.port, () => {
  console.log(
    `Food Delivery app listening at http://localhost:${config.server.port}`
  );
});
