const {
  getAllReservations,
  createReservation,
} = require("./controller/reservationController");
const { createUser } = require("./controller/userController");
const router = require("express").Router();

// users routes
router.post("/users", createUser);

// reservations routs
router.get("/reservations", getAllReservations);
router.post("/reservations/create", createReservation);

module.exports = router;
