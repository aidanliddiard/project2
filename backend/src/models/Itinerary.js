const pool = require("../server.js");

module.exports = class Itinerary {
  id;
  name;
  category_id;
  price;
  address;
  description;
  startDate;
  endDate;
  timeId;
  website;
  vacationId;

  constructor({
    id,
    name,
    category_id,
    price,
    address,
    description,
    start_date,
    end_date,
    time_id,
    website,
    vacation_id,
  }) {
    this.id = id;
    this.name = name;
    this.category_id = category_id;
    this.price = price;
    this.address = address;
    this.description = description;
    this.startDate = start_date;
    this.endDate = end_date;
    this.timeId = time_id;
    this.website = website;
    this.vacationId = vacation_id;
  }

  static async insert({
    name,
    categoryId,
    price,
    address,
    description,
    startDate,
    endDate,
    timeId,
    website,
    vacationId,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO itinerary (name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
      [
        name,
        categoryId,
        price,
        address,
        description,
        startDate,
        endDate,
        timeId,
        website,
        vacationId,
      ]
    );
    return new Itinerary(rows[0]);
  }
};
