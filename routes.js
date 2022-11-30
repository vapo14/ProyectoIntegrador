const {
  getAllReservations,
  createReservation,
} = require("./controller/reservationController");
const { createRoom } = require("./controller/roomController");
const {
  createUser,
  getUserRoles,
  loginUser,
} = require('./controller/userController');
const checkAuthenticated = require('./middleware/checkAuthenticated');
const checkNotAuthenticated = require('./middleware/checkNotAuthenticated');
const router = require('express').Router();
const passport = require('passport');

// users routes
router.post('/users', checkAuthenticated, createUser);
router.get('/users/roles', checkAuthenticated, getUserRoles);
router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local'),
  loginUser
);

// reservations routes
router.get("/reservations", getAllReservations);
router.post("/reservations/create", createReservation);

// room routes
router.post("/rooms", createRoom);

module.exports = router;