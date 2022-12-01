const {
  getAllReservations,
  getReservationById,
  updateReservation,
  createReservation,
  deleteReservationById
} = require("./controller/reservationController");
const { createRoom } = require("./controller/roomController");
const {
  createUser,
  getUserRoles,
  loginUser,
  logoutUser,
} = require("./controller/userController");
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");
const router = require("express").Router();
const passport = require("passport");

// users routes
router.post("/users", checkAuthenticated, createUser);
router.get("/users/roles", checkAuthenticated, getUserRoles);
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local"),
  loginUser
);
router.delete("/logout", checkAuthenticated, logoutUser);

// reservations routes
router.get("/reservations", getAllReservations);
router.get("/reservation", checkAuthenticated, getReservationById);
router.put("/reservation", checkAuthenticated, updateReservation);
router.post("/reservations/create", checkAuthenticated, createReservation);
router.delete("/reservations/:reservationId", checkAuthenticated, deleteReservationById);

// room routes
router.post("/rooms", checkAuthenticated, createRoom);

module.exports = router;
