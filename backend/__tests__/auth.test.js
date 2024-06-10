const request = require("supertest");
const { app } = require("../index.ts");
const { setupDb, mockUser, signInAndSignUp } = require("./utils.js");

describe("auth backend routes", () => {
  beforeEach(setupDb);

  test("POST to /api/auth/users creates new user", async () => {
    const res = await request(app).post("/api/auth/users").send(mockUser);
    const { name, email } = mockUser;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      name,
    });
  });

  test("GET to /api/auth/users/me returns signed in user`s information", async () => {
    const [agent] = await signInAndSignUp();
    const me = await agent.get("/api/auth/users/me");
    const { name, email } = mockUser;

    expect(me.status).toBe(200);
    expect(me.body).toEqual({
      id: expect.any(String),
      email,
      name,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  test("DELETE to /api/auth/users/sessions signs out a user", async () => {
    const [agent] = await signInAndSignUp();
    const res = await agent.delete("/api/auth/users/sessions");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Successfully signed out." });
  });

  test("POST to /api/auth/users/sessions fails with incorrect password", async () => {
    const mockUser = {
      name: "User",
      email: "test@example.com",
      password: "correctPassword",
    };

    await request(app).post("/api/auth/users").send(mockUser).expect(200);

    const res = await request(app).post("/api/auth/users/sessions").send({
      email: mockUser.email,
      password: "incorrectPassword",
    });

    expect(res.status).toBe(401);
  });
});
