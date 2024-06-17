const { Router } = require("express");
const User = require("../models/User.js");
const UserService = require("../services/UserService.js");
const authenticate = require("../middleware/authenticate.js");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    const token = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
        secure: process.env.SECURE_COOKIES === "true",
      })
      .json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/sessions", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
        secure: process.env.SECURE_COOKIES === "true",
      })
      .json({ message: "Signed in successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authenticate, async (req, res, next) => {
  res.json(req.user);
});

router.delete("/sessions", (req, res) => {
  res
    .clearCookie(process.env.COOKIE_NAME)
    .json({ message: "Successfully signed out." });
});

module.exports = router;
