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
 * Gets the reservation by reservation id.
 * @param {*} req
 * @param {*} res
 * @returns
 */
 const getReservationById = async (req, res) => {
  try {
    let reservation = await ReservationModel.findById(req.query.id);
    const rooms = await RoomModel.find({ _id: { $in: reservation.rooms } });
    reservation = { ...reservation._doc, rooms };
    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

/**
 * Updates the reservation with the given id.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateReservation = async (req, res) => {
  try {
    let room_numbers = req.body.room_numbers;
    console.log("req.body: ", req.body);
    console.log("roomNumbers is:", room_numbers)
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
    reservation.rooms = roomsArray;

    console.log("reservation: ", reservation);
    let response = await ReservationModel.findByIdAndUpdate(req.query.id, reservation);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

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
 * Deletes the reservation specified by the given id.
 * @param {*} req 
 * @param {*} res 
 */
const deleteReservationById = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    await ReservationModel.findByIdAndDelete(reservationId)

    return res.status(200).json({ status: 'RESERVATION_DELETED' });
  } catch (error) {
    return res.status(500).json(error);
  }

}

module.exports = { getAllReservations, getReservationById, updateReservation, createReservation, deleteReservationById };
