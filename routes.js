const {
  getAllReservations,
  createReservation,
} = require("./controller/reservationController");
const{createGuest} = require("./controller/guestController");
const{createRoom} = require("./controller/roomController");
const { createUser } = require("./controller/userController");
const router = require("express").Router();

// users routes
router.post("/users", createUser);

// reservations routes
router.get("/reservations", getAllReservations);
router.post("/reservations/create", createReservation);

// guest routes
router.post("/guests" , createGuest);

// room routes
router.post("/rooms", createRoom);

module.exports = router;
