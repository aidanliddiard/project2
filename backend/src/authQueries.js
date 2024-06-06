const { Router } = require("express");
const User = require("../src/models/User");
const UserService = require("../src/services/UserService.js");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await UserService.create(req.body);
    res
      //   .cookie(process.env.COOKIE_NAME, token, {
      //     httpOnly: true,
      //     maxAge: 1000 * 60 * 60 * 24,
      //     sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
      //     secure: process.env.SECURE_COOKIES === "true",
      //   })
      .json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
