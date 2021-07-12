const MongoDB = require("../config/mongo");
const { mongoConfig } = require("../../config");
const { findTotal } = require("../utils/calculator");

const createCartResponse = async () => {
  try {
    let cartObjects = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .aggregate([
        {
          $lookup: {
            from: "foods",
            localField: "foodId",
            foreignField: "id",
            as: "food",
          },
        },
        {
          $unwind: {
            path: "$food",
          },
        },
      ])
      .toArray();
    if (cartObjects) {
      let itemTotal = findTotal(cartObjects);
      let discount = 10.0;
      let cartResponse = {
        itemTotal,
        discount,
        grandTotal: itemTotal - discount,
        data: cartObjects,
      };
      return cartResponse;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return null;
  }
};

const addOneToCart = async (foodId) => {
  try {
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne({ foodId }, { $inc: { count: 1 } }, { upsert: true });

    if (updatedCart?.result?.ok === 1) {
      return {
        status: true,
        message: "Cart Added Successfully",
        data: await createCartResponse(),
      };
    } else {
      return { status: false, message: "Cart Added Failed" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Cart Added failed | ${error}`,
    };
  }
};

const removeOneFromCart = async (foodId) => {
  try {
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne({ foodId }, { $inc: { count: -1 } }, { upsert: true });

    if (updatedCart?.result?.ok === 1) {
      await MongoDB.db
        .collection(mongoConfig.collections.CARTS)
        .deleteOne({ foodId, count: 0 });

      return {
        status: true,
        message: "Cart revmoved and items retrived successfully",
        data: await createCartResponse(),
      };
    } else {
      return { status: false, message: "Cart Removed Failed" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Cart Removed failed | ${error}`,
    };
  }
};

const getAllCartItems = async () => {
  try {
    let cartObjects = await createCartResponse();
    if (cartObjects) {
      return {
        status: true,
        message: "Cart items retrived successfully",
        data: cartObjects,
      };
    } else {
      return { status: false, message: "No cart items found" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Finding cart failed | ${error}`,
    };
  }
};

const getCartItemByFoodId = async (foodId) => {
  try {
    let cartObject = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .findOne({ foodId });
    if (cartObject) {
      return {
        status: true,
        message: "Cart item retrived successfully",
        data: cartObject,
      };
    } else {
      return { status: false, message: "No cart item found" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `Oops! Something went wrong`,
      error: `Finding cart failed | ${error}`,
    };
  }
};

module.exports = {
  addOneToCart,
  removeOneFromCart,
  getAllCartItems,
  getCartItemByFoodId,
};
