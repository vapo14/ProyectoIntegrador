const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const UserRoles = require("../models/UserRoles");

/**
 * creates the user using user info in request body
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    // create salt object with bcrypt
    const salt = await bcrypt.genSalt();
    // hash the password using created salt, can also use shorthand hash(pass, <salt value>)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user object based on mongoose user schema
    let newUser = new userModel({
      username: req.body.username,
      password: hashedPassword,
      roleType: req.body.roleType,
    });
    // save the user, if error is presented send response accordingly
    newUser.save((err) => {
      if (err) res.status(500).send(err);
      return res.status(200).json({ status: "USER_SAVED" });
    });
  } catch (e) {
    // catch error and send response
    return res.status(500).send(e);
  }
};

/**
 * Login a user and return its user ID
 *
 * @param {*} req
 * @param {*} res
 * @returns userID
 */
const loginUser = (req, res) => {
  return res.json({ username: req.user.username, userId: req.user._id });
};

const getUserRoles = async (req, res) => {
  try {
    return res.json(await UserRoles.find()).status(200);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { createUser, getUserRoles, loginUser };
