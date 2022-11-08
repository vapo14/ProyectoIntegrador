const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
