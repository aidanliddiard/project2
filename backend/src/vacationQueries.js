const pool = require('./server.js');

const getVacations = (request, response) => {
  const user_id = request.body.user_id;

  if (!user_id) {
    response.status(400).json({ error: "User ID is missing in the request body" });
    return;
  }
  pool.query('SELECT * FROM vacations  WHERE user_id = $1',[user_id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } 

  const createVacation = (request, response) => {
    const { city, country, description, start_date, end_date, user_id } = request.body;
    pool.query(
      `INSERT INTO vacations (city, country, description, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [city, country, description, start_date, end_date, user_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };
  
  module.exports = {
    getVacations,
    createVacation
  }
  
