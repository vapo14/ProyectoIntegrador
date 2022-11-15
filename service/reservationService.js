const ReservationRepository = require("../DAO/reservation_repository");
const AppDAO = require("../DAO/dao");

const appDAO = new AppDAO("./database.sqlite3");
const reservationRepo = new ReservationRepository(appDAO);

/**
 * Gets all reservations and their reserved rooms.
 * @returns a list of reservations with rooms
 */
const getAllReservationsWithRooms = async () => {
  let reservations = await reservationRepo.getAll();
  for (let i = 0; i < reservations.length; i++) {
    reservations[i].rooms = await reservationRepo.getAllReservationRooms(
      reservations[i].reservation_id
    );
  }
  return reservations;
};

module.exports = { getAllReservationsWithRooms };
