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

  static async getItinerary(vacationId) {
    const { rows } = await pool.query(
      `SELECT * from itinerary WHERE vacation_id = $1`,
      [vacationId]
    );
    if (!rows[0]) return null;
    return new Itinerary(rows[0]);
  }

  static async getItineraryById(vacationId, itemId) {
    const { rows } = await pool.query(
      `SELECT * from itinerary WHERE vacation_id = $1 AND id = $2`,
      [vacationId, itemId]
    );
    if (!rows[0]) return null;
    return new Itinerary(rows[0]);
  }

  static async updateItineraryItem(vacationId, itemId, body) {
    const currentItinerary = await this.getItineraryById(vacationId, itemId);
    if (!currentItinerary) throw new Error("Itinerary item not found");
    const {
      name,
      categoryId,
      price,
      address,
      description,
      startDate,
      endDate,
      timeId,
      website,
    } = {
      ...currentItinerary,
      ...body,
    };
    const { rows } = await pool.query(
      `UPDATE itinerary SET name = $1, category_id = $2, price = $3, address = $4, description = $5, start_date = $6, end_date = $7, time_id = $8, website = $9
          WHERE vacation_id = $10 AND id = $11
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
        itemId,
      ]
    );
    return new Itinerary(rows[0]);
  }

  static async deleteItineraryItem(itemId) {
    const { rows } = await pool.query(
      `DELETE FROM itinerary WHERE id = $1 RETURNING *`,
      [itemId]
    );
    return new Itinerary(rows[0]);
  }

  static async getTimes() {
    const { rows } = await pool.query(`SELECT * from time`);
    console.log("rows", rows);
    return rows;
  }

  static async getCategories() {
    const { rows } = await pool.query(`SELECT * from category`);
    return rows;
  }
};
