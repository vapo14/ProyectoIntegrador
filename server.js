const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
const path = require("path");

// setup build directory for serving static frontend
app.use(express.static(path.join(__dirname, "build")));

// let express app use cors config, react is running on port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
