const express = require("express");
const {
  getAllCartItems,
  getCartItemByFoodId,
  addOneToCart,
  removeOneFromCart,
} = require("../services/cart.service");
let router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllCartItems();
  res.json(response);
});

router.get("/:foodId/add", async (req, res) => {
  let { foodId } = req.params;
  let response = await addOneToCart(foodId);
  res.json(response);
});

router.get("/:foodId/remove", async (req, res) => {
  let { foodId } = req.params;
  let response = await removeOneFromCart(foodId);
  res.json(response);
});

router.get("/:foodId", async (req, res) => {
  let { foodId } = req.params;
  let response = await getCartItemByFoodId(foodId);
  res.json(response);
});

module.exports = router;
