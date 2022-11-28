const ReservationModel = require("../models/ReservationModel");

/**
 * Gets all reservations on database including the rooms
 * @param {*} req
 * @param {*} res
 */
const getAllReservations = async (req, res) => {
  try {
    let response = await ReservationModel.find();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createReservation = async (req, res) => {
  try {
    let reservation = req.body.reservation;
    let rightNow = new Date().toLocaleDateString();
    reservation.ts_created = rightNow;
    reservation.ts_updated = rightNow;
    let newRes = new ReservationModel(reservation);
    newRes.save((err) => {
      if (err) res.status(500).send(err);
      return res.status(201).json({ status: "RESERVATION_SAVED" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllReservations, createReservation };
