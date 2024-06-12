const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
const itineraryQueries = require("./src/itineraryQueries.js");
require("dotenv").config();
const vacationQueries = require("./src/vacationQueries.js");

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

app.get("/api/vacations", vacationQueries.getVacations);
app.post("/api/vacations/", vacationQueries.createVacation);

// app.get("/api/vacations/:id", itineraryQueries.getItinerary);
app.get("/api/time", itineraryQueries.getTime);
app.get("/api/category", itineraryQueries.getCategory);

// app.post("/api/vacations/:id/itinerary/", itineraryQueries.createItineraryItem);
// app.put("/api/vacations/:id/itinerary/", itineraryQueries.updateItineraryItem);
app.delete(
  "/api/vacations/:id/itinerary/",
  itineraryQueries.deleteItineraryItem
);

app.use(
  "/api/vacations",
  require("./src/controller/itinerary.js")
);

app.use("/api/auth/users", require("./src/controller/user.js"));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });
}

module.exports = { app };
