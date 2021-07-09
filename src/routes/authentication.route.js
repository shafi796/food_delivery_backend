const express = require("express");
let router = express.Router();
const {
  userRegister,
  userLogin,
} = require("../services/authentication.service");

router.post("/register", async (req, res) => {
  let body = req.body;
  let response = await userRegister(body);
  res.json(response);
});
router.post("/login", async (req, res) => {
  let body = req.body;
  let response = await userLogin(body);
  res.json(response);
});

module.exports = router;
