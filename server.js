const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
const path = require("path");
// import mongoose library for MongoDB management
const mongoose = require("mongoose");
// Use dotenv library to configure .env file variables.
require("dotenv").config();
// connect mongoose to MongoDB database
mongoose.connect(process.env.MONGO_STR);

// setup build directory for serving static frontend
app.use(express.static(path.join(__dirname, "build")));

// let express app use cors config, react is running on port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// import express session for user sessions
const session = require("express-session");

// import connect-mongo for session store
const MongoStore = require("connect-mongo");

// get passport library
const passport = require("passport");
// passport config
const initializePassport = require("./config/passportConfig");
initializePassport(passport);

// configure express for sessions
// calculate 2 days in milliseconds for cookie maxAge
//TODO: session time in mongo store
const sessionTime = 1000 * 60 * 60 * 48;
app.use(
  session({
    name: "glor_s",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: sessionTime,
      httpOnly: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_STR,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// let express app use json parsing
app.use(express.json());
// custom routes file (routes.js)
app.use(routes);

// prevent any undefined routes from loading,
// only redirect to main react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
