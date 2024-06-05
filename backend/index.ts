const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./src/queries.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get('/time', db.getTime);


app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
  console.log(db)
});
