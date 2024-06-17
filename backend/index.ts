const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/vacations", require("./src/controller/vacation.js"));

app.use("/api/vacations", require("./src/controller/itinerary.js"));

app.use("/api/auth/users", require("./src/controller/user.js"));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });
}

module.exports = { app };
