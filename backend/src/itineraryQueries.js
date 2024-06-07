const pool = require("./server.js");

const createItineraryItem = (request, response) => {
  const {
    name,
    category_id,
    price,
    address,
    description,
    start_date,
    end_date,
    time_id,
    website,
    vacation_id,
  } = request.body;
  pool.query(
    "INSERT INTO itinerary (name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      name,
      category_id,
      price,
      address,
      description,
      start_date,
      end_date,
      time_id,
      website,
      vacation_id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Itinerary added with ID: ${results.insertId}`);
    }
  );
};

const getItinerary = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT name, price, address, description, start_date, end_date, website, time.time, category.type FROM itinerary LEFT JOIN time on time.id = itinerary.time_id LEFT JOIN category on category.id = itinerary.category_id WHERE vacation_id=$1;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const updateItineraryItem = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(request.body);
  const {
    name,
    category_id,
    price,
    address,
    description,
    start_date,
    end_date,
    time_id,
    website,
    vacation_id,
  } = request.body;
  pool.query(
    "UPDATE itinerary SET name = $1, category_id = $2, price = $3, address = $4, description = $5, start_date = $6, end_date = $7, time_id = $8, website = $9, vacation_id = $10 WHERE id = $11",
    [
      name,
      category_id,
      price,
      address,
      description,
      start_date,
      end_date,
      time_id,
      website,
      vacation_id,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Itinerary modified with ID: ${id}`);
    }
  );
};

const deleteItineraryItem = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM itinerary WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Itinerary deleted with ID: ${id}`);
  });
};

module.exports = {
  createItineraryItem,
  getItinerary,
  updateItineraryItem,
  deleteItineraryItem,
};
