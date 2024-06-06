const pool = require('./server.js');

const getItinerary = (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM itinerary WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const createItineraryItem = (request, response) => {
  const { name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id } = request.body;
  pool.query('INSERT INTO itinerary (name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id ], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Itinerary added with ID: ${results.insertId}`);
  });
}

const getTime = (response) => {
    console.log(pool)
    pool.query('SELECT * FROM time', (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
      response.status(200).json(results.rows);
    });
  } 
  
  module.exports = {
    createItineraryItem,
    getItinerary,
    getTime
  }