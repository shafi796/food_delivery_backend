const MongoDB = require("../config/mongo");
const { mongoConfig } = require("../../config");
const jwt = require("jsonwebtoken");

const userRegister = async (user) => {
  console.log(`Service for register user | ${JSON.stringify(user)}`);
  try {
    let userObject = {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    };
    let userSaved = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .insertOne(userObject);
    return {
      status: userSaved.insertedCount ? true : false,
      message: userSaved.insertedCount
        ? "User Registerd Successfully"
        : "User Not Registered",
    };
  } catch (e) {
    console.error(`Exception | ${e}`);
    return {
      status: false,
      message: `User Not Registered | ${e}`,
    };
  }
};

const userLogin = async (user) => {
  console.log(`Service for user login | ${JSON.stringify(user)}`);
  try {
    if (!user?.username || !user?.password) {
      return { status: false, message: "Enter username and password" };
    }
    let findQuery = { username: user?.username, password: user?.password };

    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne(findQuery);

    if (userObject) {
      let token = jwt.sign(
        {
          username: userObject.username,
          email: userObject.email,
        },
        "food_delivery_app",
        { expiresIn: "24h" }
      );
      return { status: true, message: "User signedin", data: token };
    } else {
      return { status: false, message: "No user found" };
    }
  } catch (e) {
    console.error(`Exception | ${e}`);
    return { status: true, message: `User not signedin | ${e}` };
  }
};

module.exports = { userRegister, userLogin };
