const request = require("supertest");
const { app } = require("../index.ts");
const { setupDb, mockUser, signInAndSignUp } = require("./utils.js");

const mockVacation = {
  id: null,
  city: "San Francisco",
  country: "United States",
  description: "My vacation to San Francisco",
  startDate: "2024-06-21",
  endDate: "2024-06-28",
  userId: null,
};

const mockItinerary = {
  name: "Golden Gate Bridge",
  categoryId: 3,
  price: 0.0,
  address: "Golden Gate Brg, San Francisco, CA 94129",
  description:
    "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.",
  startDate: "2024-06-21",
  endDate: null,
  timeId: 2,
  website: "https://www.goldengate.org/",
  vacationId: null,
};

async function createVacation() {
  const [agent, user] = await signInAndSignUp();
  mockVacation.userId = user._body.id;
  const response = await agent.post("/api/vacations").send(mockVacation);
  const responseBody = JSON.parse(response.text);
  const vacation_id = responseBody.id;
  mockVacation.id = vacation_id;
  mockItinerary.vacationId = vacation_id;
  return [agent, vacation_id];
}

describe("itinerary backend routes", () => {
  beforeEach(setupDb);
  test("POST to /api/vacations/itinerary", async () => {
    const [agent, vacation_id] = await createVacation();
    const res = await agent
      .post(`/api/vacations/${vacation_id}/itinerary`)
      .send(mockItinerary);
    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      id: expect.any(Number),
      name: mockItinerary.name,
      categoryId: mockItinerary.categoryId,
      price: parseFloat(mockItinerary.price).toFixed(2),
      address: mockItinerary.address,
      description: mockItinerary.description,
      startDate: expect.any(String),
      endDate: null,
      timeId: mockItinerary.timeId,
      website: mockItinerary.website,
      vacationId: vacation_id,
    });

    expect(res.body.startDate.slice(0, 10)).toEqual(
      new Date(mockItinerary.startDate).toISOString().split("T")[0]
    );
  });

  test("GET to /api/vacations/:id/itinerary", async () => {
    const [agent, vacation_id] = await createVacation();
    const response = await agent
      .post(`/api/vacations/${vacation_id}/itinerary`)
      .send(mockItinerary);
    const res = await agent.get(`/api/vacations/${vacation_id}/itinerary`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: expect.any(Number),
        name: mockItinerary.name,
        type: "Activity",
        price: parseFloat(mockItinerary.price).toFixed(2),
        address: mockItinerary.address,
        description: mockItinerary.description,
        startDate: expect.any(String),
        endDate: null,
        time: "Afternoon",
        website: mockItinerary.website,
        vacationId: vacation_id,
      },
    ]);
  });

  test("UPDATE to /api/vacations/:id/itinerary/:id", async () => {
    const [agent, vacation_id] = await createVacation();
    await agent
      .post(`/api/vacations/${vacation_id}/itinerary`)
      .send(mockItinerary);

    const resBefore = await agent.get(
      `/api/vacations/${vacation_id}/itinerary`
    );

    expect(resBefore.body[0].name).toBe("Golden Gate Bridge");
    const itinerary_id = resBefore.body[0].id;

    const resp = await agent
      .put(`/api/vacations/${vacation_id}/itinerary/${itinerary_id}`)
      .send({
        name: "The Golden Gate Bridge",
      });
    expect(resp.status).toBe(200);
    const resAfter = await agent.get(`/api/vacations/${vacation_id}/itinerary`);
    expect(resAfter.body[0].name).toBe("The Golden Gate Bridge");
  });

  test("DELETE to /api/vacations/:id/itinerary/:id", async () => {
    const [agent, vacation_id] = await createVacation();
    await agent
      .post(`/api/vacations/${vacation_id}/itinerary`)
      .send(mockItinerary);

    const resBefore = await agent.get(
      `/api/vacations/${vacation_id}/itinerary`
    );
    const itinerary_id = resBefore.body[0].id;

    const resp = await agent.delete(
      `/api/vacations/${vacation_id}/itinerary/${itinerary_id}`
    );
    expect(resp.status).toBe(204);
  });

  test("GET to /api/vacations/itinerary/time", async () => {
    const res = await request(app).get(`/api/vacations/itinerary/time`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, time: "Morning" },
      { id: 2, time: "Afternoon" },
      { id: 3, time: "Evening" },
      { id: 4, time: "Late Night" },
    ]);
  });

  test("GET to /api/vacations/itinerary/category", async () => {
    const res = await request(app).get(`/api/vacations/itinerary/category`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, type: "Hotel" },
      { id: 2, type: "Restaurant" },
      { id: 3, type: "Activity" },
    ]);
  });
});
