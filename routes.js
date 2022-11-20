const {
  getAllReservations,
  createReservation,
} = require("./controller/reservationController");
const {
  createUser,
  getUserRoles,
  loginUser,
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

// reservations routs
router.get("/reservations", getAllReservations);
router.post("/reservations/create", createReservation);

module.exports = router;
