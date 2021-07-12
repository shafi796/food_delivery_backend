const MongoDB = require("../config/mongo");
const { mongoConfig } = require("../../config");
const jwt = require("jsonwebtoken");

const userRegister = async (user) => {
  console.log(`Service for register user | ${JSON.stringify(user)}`);
  try {
    if (!user?.username || !user?.email || !user?.password) {
      return { status: false, message: "Please fill up all fields" };
    }
    let userObject = {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    };
    let userSaved = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .insertOne(userObject);
    if (userSaved?.insertedCount && userSaved?.ops?.[0]) {
      let token = jwt.sign(
        {
          username: userObject.username,
          email: userObject.email,
        },
        "food_delivery_app",
        { expiresIn: "24h" }
      );
      return {
        status: true,
        message: "User Registerd Successfully",
        data: token,
      };
    } else {
      return { status: false, message: "User Registerd Failed" };
    }
  } catch (error) {
    console.log(error);
    console.error(`Exception | ${error}`);
    let errorMessage = `User Not Registered`;
    error?.code === 11000 ? (errorMessage = `User already exist`) : null;
    return {
      status: false,
      message: errorMessage,
      error: `User Not Registered | ${error}`,
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
      return { status: true, message: "User Login Successful", data: token };
    } else {
      return { status: false, message: "No user found" };
    }
  } catch (error) {
    console.error(`Exception | ${error}`);
    return {
      status: false,
      message: `User Login Failed`,
      error: `User Login Failed | ${error}`,
    };
  }
};

const checkUserExist = async (query) => {
  let messages = {
    email: "User already exist",
    username: "This username is taken",
  };
  let queryType = Object.keys(query)[0];
  try {
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne(query);
    return !userObject
      ? { status: true, message: `This ${queryType} is not taken` }
      : { status: false, message: messages[queryType] };
  } catch (error) {
    console.error(`Exception | ${error}`);
  }
};

module.exports = { userRegister, userLogin, checkUserExist };
