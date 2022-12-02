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
      fullname: req.body.fullname,
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
  try{
    return res.json({ username: req.user.username, userId: req.user._id });
  } catch (e) {
    return res.status(500).send(e);
  }
  
};

const getUserRoles = async (req, res) => {
  try {
    return res.json(await UserRoles.find()).status(200);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Logs out the user and clears session. Deletes cookie from client.
 *
 * @param {*} req
 * @param {*} res
 * @returns response with logged out message
 */
const logoutUser = (req, res) => {
  // logout user using passport's interface
  // TODO: fix logout bug
  try {
    req.session.destroy((err) => {
      req.logOut((err) => {
        if (err) console.error("Error logging out user ", err);
      });
      res.clearCookie("glor_s");
      // Don't redirect, just print text
      res.send("Logged out");
    });
  } catch {
    res.status(200).json({
      status:
        "Server ran into an error when logging you out. To ensure security, please clear your browser cookies and close your browser.",
    });
  }
};

module.exports = { createUser, getUserRoles, loginUser, logoutUser };
