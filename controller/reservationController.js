const ReservationRepository = require("../DAO/reservation_repository");
const AppDAO = require("../DAO/dao");
const {
  getAllReservationsWithRooms,
} = require("../service/reservationService");

const appDAO = new AppDAO("./database.sqlite3");
const reservationRepo = new ReservationRepository(appDAO);

/**
 * Gets all reservations on database including the rooms
 * @param {*} req
 * @param {*} res
 */
const getAllReservations = async (req, res) => {
  try {
    let response = await getAllReservationsWithRooms();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createReservation = async (req, res) => {
  try {
    let reservation = req.body;
    // this is not ideal, we should change this to make the create function
    // receive a single object, not every field seperately
    // TODO: fix this mess
    let response = await reservationRepo.create(
      reservation.start_date,
      reservation.end_date,
      reservation.ts_created,
      reservation.ts_updated,
      reservation.total_price,
      reservation.form_of_booking,
      reservation.company_name,
      reservation.number_of_adults,
      reservation.number_of_children,
      reservation.payment_date
    );
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllReservations, createReservation };
