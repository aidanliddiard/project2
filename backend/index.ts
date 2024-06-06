const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const itineraryQueries = require("./src/itineraryQueries.js");
require('dotenv').config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/time", itineraryQueries.getTime);

app.use("/api/auth/users", require("./src/authQueries.js"));

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});

// const server = app.listen(3001);

module.exports = { app };
