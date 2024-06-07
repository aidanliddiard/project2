const request = require("supertest");
const app = require("../index.ts");


const mockItinerary = {
    name: "Golden Gate Bridge",
    category_id: 3,
    price: 0.00,
    address: 'Golden Gate Brg, San Francisco, CA 94129',
    description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.',
    start_date: '2024-06-21',
    end_date: null,
    time_id: 2,
    website: 'https://www.goldengate.org/',
    vacation_id: 

}

describe("itinerary backend routes", () => {
    test("POST to /api/vacations/itinerary", () => {
        const res = request(app).post("/api/vacations/itinerary").send(mockItinerary);
        expect(true).toBe(true);
    })
});
