const { Router } = require("express");
const Itinerary = require("../models/Itinerary");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.post("/:id/itinerary", authenticate, async (req, res, next) => {
  try {
    const itinerary = await Itinerary.insert(req.body);
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/itinerary", authenticate, async (req, res, next) => {
  try {
    const itinerary = await Itinerary.getItinerary(req.params.id);
    console.log(itinerary);
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/itinerary/:itemId", authenticate, async (req, res, next) => {
  console.log(req.params.id, req.params.itemId);
  try {
    const itinerary = await Itinerary.updateItineraryItem(
      req.params.id,
      req.params.itemId,
      req.body
    );
    res.json(itinerary);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
