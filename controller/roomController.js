const RoomModel = require("../models/RoomModel");

/**
 * Create rooms
 * @param {*} req
 * @param {*} res
 */

const createRoom = async (req, res) => {
    try {
        let roomData = req.body;
        let newRoom = new RoomModel(roomData);
        newRoom.save((err) => {
          if (err) return res.status(500).send(err);
          return res.status(201).json({ status: "ROOM_SAVED" });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * Get all rooms
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();

        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { createRoom, getAllRooms };
