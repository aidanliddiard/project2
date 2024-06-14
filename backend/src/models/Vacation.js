const pool = require("../server.js");

class Vacation {
  // Declare properties
  id;
  city;
  country;
  description;
  start_date;
  end_date;
  image_url;
  alt;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.city = row.city;
    this.country = row.country;
    this.description = row.description;
    this.startDate = row.start_date;
    this.endDate = row.end_date;
    this.imageUrl = row.image_url;
    this.alt = row.alt;
    this.userId = row.user_id;
  }

  static async getVacationsByUser(userId) {
    const { rows } = await pool.query(
      `
            SELECT * FROM vacations
            WHERE user_id = $1
            `,
      [userId]
    );
    if (!rows[0]) return null;
    return rows.map((row) => new Vacation(row));
  }

  static async insert({
    city,
    country,
    description,
    startDate,
    endDate,
    imageUrl,
    alt,
    userId,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO vacations (city, country, description, start_date, end_date, image_url, alt, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`,
      [city, country, description, startDate, endDate, imageUrl, alt, userId]
    );
    return new Vacation(rows[0]);
  }
}
module.exports = Vacation;
