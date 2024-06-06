const { Router } = require("express");
const User = require("../src/models/User");
const UserService = require("../src/services/UserService.js");
const authenticate = require("../src/middleware/authenticate");

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
    next(error);
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
      .json({ message: "Signed in succesfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authenticate, async (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
