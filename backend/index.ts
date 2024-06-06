const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const itineraryQueries = require("./src/itineraryQueries.js");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/vacation/itinerary/:id", itineraryQueries.getItinerary);
app.get("/api/category", itineraryQueries.getCategory);
app.get("/api/time", itineraryQueries.getTime);
app.post("/api/vacation/itinerary/", itineraryQueries.createItineraryItem);
app.put("/api/vacation/itinerary/item/:id", itineraryQueries.updateItineraryItem);
app.delete("/api/vacation/itinerary/item/:id", itineraryQueries.deleteItineraryItem);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
  console.log(itineraryQueries);
});
