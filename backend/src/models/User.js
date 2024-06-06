const pool = require("../server.js");

module.exports = class User {
  id;
  email;
  name;
  #passwordHash;

  constructor({ id, email, name, passwordHash }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.#passwordHash = passwordHash;
  }

  static async insert({ email, name, passwordHash }) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, name, password_hash)
            VALUES ($1, $2, $3)
            RETURNING *`,
      [email, name, passwordHash]
    );
    return new User(rows[0]);
  }
};
