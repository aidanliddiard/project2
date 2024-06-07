const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  static async create({ name, email, password }) {
    if (email.length <= 6) {
      throw new Error("Invalid email");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({ name, email, passwordHash });
    return user;
  }

  static async signIn({ email, password }) {
    try {
      const user = await User.getByEmail(email);
      if (!user) {
        throw new Error("Invalid email");
      }

      const matching = await bcrypt.compare(password, user.passwordHash);
      if (!matching) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ ...user }, "supersecret", {
        expiresIn: "24h",
      });

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
