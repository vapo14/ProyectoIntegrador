const ReservationModel = require("../models/ReservationModel");
const RoomModel = require("../models/RoomModel");

const validateReservationRooms = async (reservation, room_numbers) => {
  // pull the reservations that overlap with the current reservation
  let overlappingReservations = await ReservationModel.find({
    start_date: {
      $gte: reservation.start_date,
      $lte: reservation.end_date,
    },
    end_date: {
      $gte: reservation.start_date,
      $lte: reservation.end_date,
    },
  });
  if (overlappingReservations.length <= 0) return true;

  // check each room in each reservation that is overlapped
  // if the same room is found then it is not valid
  for (const res of overlappingReservations) {
    for (const roomId of res.rooms) {
      let tmpRoom = await RoomModel.findById(roomId);
      if (room_numbers.includes(tmpRoom.room_number)) {
        return false;
      }
    }
  }
  return true;
};

module.exports = { validateReservationRooms };
