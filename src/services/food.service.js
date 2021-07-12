const MongoDB = require("../config/mongo");
const { mongoConfig } = require("../../config");

const getAllFoodWithCartByRestaurantId = async (restaurantId) => {
  console.log(restaurantId);
  try {
    let foodObjects = await MongoDB.db
      .collection(mongoConfig.collections.FOODS)
      .aggregate([
        {
          $match: {
            restaurantId,
          },
        },
        {
          $lookup: {
            from: "carts",
            localField: "id",
            foreignField: "foodId",
            as: "cart",
          },
        },
        {
          $unwind: {
            path: "$cart",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    if (foodObjects) {
      return {
        status: true,
        message: "Food retrived successfully",
        data: foodObjects,
      };
    } else {
      return { status: false, message: "No food found" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Finding food failed | ${error}`,
    };
  }
};

const getOneFoodWithCartByFoodId = async (foodId) => {
  console.log(foodId);
  try {
    let foodObjects = await MongoDB.db
      .collection(mongoConfig.collections.FOODS)
      .aggregate([
        {
          $match: {
            id: foodId,
          },
        },
        {
          $lookup: {
            from: "carts",
            localField: "id",
            foreignField: "foodId",
            as: "cart",
          },
        },
        {
          $unwind: {
            path: "$cart",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    if (foodObjects?.length > 0) {
      return {
        status: true,
        message: "Food retrived successfully",
        data: foodObjects[0],
      };
    } else {
      return { status: false, message: "No food found" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Finding food failed | ${error}`,
    };
  }
};

module.exports = {
  getAllFoodWithCartByRestaurantId,
  getOneFoodWithCartByFoodId,
};
