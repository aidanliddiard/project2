const pool = require("../server.js");

class Vacation {
    // Declare properties
    id;
    city;
    country;
    description;
    start_date;
    end_date;
    user_id;

    constructor(row) {
        this.id = row.id; 
        this.city = row.city;
        this.country = row.country;
        this.description = row.description;
        this.startDate = row.start_date;
        this.endDate = row.end_date;
        this.userId = row.user_id; 
    }

    static async getVacationsByUser(userId) {
        // console.log('getVacationsByUser method accessed with userId:', userId.id);
        const { rows } = await pool.query(
            `
            SELECT * FROM vacations
            WHERE user_id = $1
            `,
            [userId] 
        );
        if (!rows[0]) return null;
        // console.log('Vacations found:', rows);
        return rows.map(row => new Vacation(row));
    }
}
module.exports = Vacation;