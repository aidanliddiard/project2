const { Router } = require('express');
//Import express
const authenticate = require('../middleware/authenticate');

// console.log(authenticate);
//Import the Vacation Model
const Vacation = require('../models/Vacation');

const router = Router();

//Setup a route for incoming HTTP requests
  router.get('/', authenticate, async (req, res, next) => {
    try {
      // console.log(req.user.id);
      const vacations = await Vacation.getVacationsByUser(req.user.id);
      res.json(vacations);
    } catch (error) {
      // console.error(error);
      next(error);
    }
  });

  //Create a Vacation
  router.post("/vacations", authenticate, async (req, res, next) => {
    try {
      const vacation = await Vacation.insert(req.body);
      res.json(vacation);
    } catch (error) {
      next(error);
    }
  });

  //Export the Router Export
  module.exports = router;
