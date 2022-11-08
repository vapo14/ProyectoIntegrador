const UserRepository = require("../DAO/user_repository");
const AppDAO = require("../DAO/dao");

const appDAO = new AppDAO("./database.sqlite3");
const userRepo = new UserRepository(appDAO);

/**
 * creates the user using user info in request body
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    let userInfo = req.body.user;
    let response = await userRepo.create(
      userInfo.username,
      userInfo.full_name,
      userInfo.password_hash,
      userInfo.password_salt
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = { createUser };
