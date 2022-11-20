const roomModel = require('../models/RoomModel');

/**
 * creates the room using room info in request body
 * @param {*} req
 * @param {*} res
 */
const createRoom = async (req, res) => {
  try {
    // create new user object based on mongoose user schema
    let newRoom = new roomModel({
      room_number: req.body.room_number,
      beds_type: req.body.beds_type,
      current_price: req.body.current_price,
      jacuzzi: req.body.jacuzzi,
    });
    // save the user, if error is presented send response accordingly
    newRoom.save((err) => {
      if (err) res.status(500).send(err);
      return res.status(200).json({ status: 'ROOM_SAVED' });
    });
  } catch (e) {
    // catch error and send response
    return res.status(500).send(e);
  }
};

module.exports = { createRoom };
