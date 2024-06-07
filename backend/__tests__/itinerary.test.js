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
    id: null,
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
    console.log(response.text)
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
        // console.log(vacation_id);
        const test = await agent.get(`/api/vacation/itinerary/${vacation_id}`);
        // console.log("test", test);
        const res = await agent.post("/api/vacation/itinerary").send(mockItinerary);
        // console.log(res.body);
        expect(res.status).toBe(201);
        expect(typeof res.body.id).toBe('number');
        expect(res.body.name).toEqual(mockItinerary.name);
        expect(res.body.category_id).toEqual(mockItinerary.category_id);
        expect(res.body.price).toEqual(mockItinerary.price);
        expect(res.body.address).toEqual(mockItinerary.address);
        expect(res.body.description).toEqual(mockItinerary.description);
        expect(res.body.start_date).toEqual(mockItinerary.start_date);
        expect(res.body.end_date).toEqual(mockItinerary.end_date);
        expect(res.body.time_id).toEqual(mockItinerary.time_id);
        expect(res.body.website).toEqual(mockItinerary.website);
        expect(res.body.vacation_id).toEqual(mockItinerary.vacation_id);
    })
});
