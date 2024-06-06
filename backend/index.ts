const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const dbQueries = require("./src/queries.js");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/api/time", dbQueries.getTime);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
  console.log(dbQueries);
});
