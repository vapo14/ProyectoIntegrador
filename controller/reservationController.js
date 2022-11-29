const ReservationModel = require('../models/ReservationModel');
const RoomModel = require('../models/RoomModel');

/**
 * Gets all reservations on database including the rooms
 * @param {*} req
 * @param {*} res
 */
const getAllReservations = async (req, res) => {
  try {
    let response = await ReservationModel.find();

    const newReservations = []
    for (const reservation of response) {
      const rooms = await RoomModel.find({ '_id':{ $in: reservation.rooms }})
      newReservations.push({ ...reservation._doc, rooms })
    }

    return res.status(200).json(newReservations);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * creates a new reservation
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createReservation = async (req, res) => {
  try {
    // validate if rooms are correct
    // room_numbers = [1,3,4,5]
    let room_numbers = req.body.room_numbers;

    // check that there is at least one room
    if (room_numbers.length < 1) {
      return res.status(400).json({
        status: 'failed to create reservation',
        message: `The reservation must have at least one room number.`,
      });
    }

    let roomsArray = [];
    for (const room of room_numbers) {
      let tmpRoom = await RoomModel.findOne({ room_number: room });
      if (!tmpRoom) {
        return res.status(400).json({
          status: 'failed to create reservation',
          message: `Room number ${room} was not found.`,
        });
      }
      roomsArray.push(tmpRoom._id.toString());
    }

    let reservation = req.body.reservation;
    let rightNow = new Date().toLocaleDateString('en-US');
    reservation.ts_created = rightNow;
    reservation.ts_updated = rightNow;
    reservation.rooms = roomsArray;
    let newRes = new ReservationModel(reservation);
    newRes.save((err) => {
      if (err) return res.status(500).send(err);
      return res.status(201).json({ status: 'RESERVATION_SAVED' });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * helper function to return room by its number
 * @param {*} roomNumber
 * @returns
 */
const getRoomsByRoomNumber = async (roomNumber) => {
  return await RoomModel.findOne({ room_number: roomNumber });
};

module.exports = { getAllReservations, createReservation };
