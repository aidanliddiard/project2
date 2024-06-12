const { Router } = require("express");
const Itinerary = require("../models/Itinerary");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const itinerary = await Itinerary.insert(req.body);
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
