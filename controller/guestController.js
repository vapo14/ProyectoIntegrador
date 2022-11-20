const GuestReposiroty = require("../DAO/guest_repository");
const AppDAO = require("../DAO/dao");

const appDAO = new AppDAO("./database.sqlite3");
const guestRepo = new GuestReposiroty(appDAO);

/**
 * Gets all guests
 * @param {*} req
 * @param {*} res
 */

const createGuest = async (req, res) => {
    try {
        let guest = req.body;
        let response = await guestRepo.create(
            guest.origin,
            guest.full_name,
        );
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {createGuest};