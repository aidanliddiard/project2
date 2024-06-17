const pool = require("../server.js");

module.exports = class User {
  id;
  email;
  name;
  #passwordHash;

  constructor({ id, email, name, password_hash }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.#passwordHash = password_hash;
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  static async insert({ email, name, passwordHash }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO users (email, name, password_hash)
              VALUES ($1, $2, $3)
              RETURNING *`,
        [email, name, passwordHash]
      );
      return new User(rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("A user with this email already exists");
      }
      throw error;
    }
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM users
            WHERE email = $1`,
      [email]
    );

    if (!rows[0]) return null;

    return new User(rows[0]);
  }
};
