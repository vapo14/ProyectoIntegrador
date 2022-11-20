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
    let userInfo = req.body;
    let response = await userRepo.create(
      userInfo.username,
      userInfo.full_name,
      userInfo.password_hash,
      userInfo.password_salt
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = { createUser };
