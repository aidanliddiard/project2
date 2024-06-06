const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    if (!cookie) {
      throw new Error("Unauthorized. You must be signed in.");
    }

    const user = jwt.verify(cookie, "supersecret");

    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
