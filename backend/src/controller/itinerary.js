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
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/itinerary/:itemId", authenticate, async (req, res, next) => {
  try {
    const itinerary = await Itinerary.getItineraryById(req.params.id, req.params.itemId);
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/itinerary/:itemId", authenticate, async (req, res, next) => {
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

router.delete(
  "/:id/itinerary/:itemId",
  authenticate,
  async (req, res, next) => {
    try {
      const itinerary = await Itinerary.deleteItineraryItem(req.params.itemId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.get("/itinerary/time", async (req, res, next) => {
  try {
    const time = await Itinerary.getTimes();
    res.json(time);
  } catch (error) {
    next(error);
  }
});

router.get("/itinerary/category", async (req, res, next) => {
  try {
    const category = await Itinerary.getCategories();
    res.json(category);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
