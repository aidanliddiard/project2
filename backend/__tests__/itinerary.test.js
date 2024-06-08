const request = require("supertest");
const { app } = require("../index.ts");
const { setupDb, mockUser, signInAndSignUp } = require("./utils.js");

const mockVacation = {
    id: null,
    city: "San Francisco",
    country: "United States",
    description: "My vacation to San Francisco",
    start_date: "2024-06-21",
    end_date: "2024-06-28",
    user_id: null,
}

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
    vacation_id: null,
}

async function createVacation() {
    const [agent, user] = await signInAndSignUp();
    mockVacation.user_id = user._body.id;
    const response = await agent.post("/api/vacations").send(mockVacation);
    const responseBody = JSON.parse(response.text);
    const vacation_id = responseBody[0].id
    mockVacation.id = vacation_id;
    mockItinerary.vacation_id = vacation_id
    return [agent, vacation_id];
}

describe("itinerary backend routes", () => {
    beforeEach(setupDb);
    test("POST to /api/vacations/itinerary", async () => {
        const [agent, vacation_id] = await createVacation();
        const test = await agent.get('/api/vacations');
        const res = await agent.post(`/api/vacations/${vacation_id}/itinerary`).send(mockItinerary);
        expect(res.status).toBe(201);

        const jsonStart = res.text.indexOf("{");
        const jsonEnd = res.text.lastIndexOf("}") + 1;
        const jsonText = res.text.slice(jsonStart, jsonEnd);

        const responseBody = JSON.parse(jsonText);

        expect(responseBody).toEqual({
            id: expect.any(Number),
            name: mockItinerary.name,
            category_id: mockItinerary.category_id,
            price: parseFloat(mockItinerary.price).toFixed(2),
            address: mockItinerary.address,
            description: mockItinerary.description,
            start_date: new Date(mockItinerary.start_date).toISOString().split('T')[0],
            end_date: null,
            time_id: mockItinerary.time_id,
            website: mockItinerary.website,
            vacation_id: vacation_id,
         });
    })
});
