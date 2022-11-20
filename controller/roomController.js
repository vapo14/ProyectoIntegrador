const RoomRepository = require("../DAO/room_repository");
const AppDAO = require("../DAO/dao");

const appDAO = new AppDAO("./database.sqlite3");
const roomRepo = new RoomRepository(appDAO);

/**
 * Gets all rooms
 * @param {*} req
 * @param {*} res
 */

const createRoom = async (req, res) => {
    try {
        let room = req.body;
        let response = await roomRepo.create(
            room.room_number,
            room.beds_type_number,
            room.current_price,
            room.jacuzzi,
        );
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {createRoom};