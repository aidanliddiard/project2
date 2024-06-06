const pool = require("../src/server.js");
const request = require("supertest");
const { app, server } = require("../index.ts");
const { setupDb } = require("../src/utils.js");

const mockUser = {
  name: "Test",
  email: "test@testing.com",
  password: "password",
};

describe("auth backend routes", () => {
  beforeEach(setupDb);

  test("POST to /api/auth/users creates new user", async () => {
    // console.log(server);
    console.log(app.post("/api/auth/users"));
    const res = await request(app).post("/api/auth/users").send(mockUser);

    console.log(res.body);

    const { name, email } = mockUser;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      name,
    });
  });
});
