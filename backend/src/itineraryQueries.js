const pool = require('./server.js');

const getTime = (request, response) => {
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
    getTime
  }