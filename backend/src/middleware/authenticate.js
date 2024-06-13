// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const cookie = req.cookies[process.env.COOKIE_NAME];
//     if (!cookie) {
//       throw new Error("Unauthorized. You must be signed in.");
//     }

//     const user = jwt.verify(cookie, "supersecret");

//     req.user = user;
//     next();
//   } catch (error) {
//     error.status = 401;
//     next(error);
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // console.log("req", req);
    const cookie = req.cookies[process.env.COOKIE_NAME];
    // console.log("COOKIE", cookie); // log the cookie value
    if (!cookie) {
      // console.log(error);
      // throw new Error("Unauthorized. You must be signed in.");
    }

    // console.log("About to verify JWT");
    const user = jwt.verify(cookie, "supersecret");
    // console.log("JWT verified");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    error.status = 401;
    next(error);
  }
};
