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
};
