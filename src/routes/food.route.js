const express = require("express");
const {
  getAllFoodWithCartByRestaurantId,
  getOneFoodWithCartByFoodId,
} = require("../services/food.service");
let router = express.Router();

router.get("/", async (req, res) => {
  let { restaurantId } = req.query;
  let response = await getAllFoodWithCartByRestaurantId(restaurantId);
  res.json(response);
});

router.get("/:foodId", async (req, res) => {
  let { foodId } = req.params;
  let response = await getOneFoodWithCartByFoodId(foodId);
  res.json(response);
});

module.exports = router;
