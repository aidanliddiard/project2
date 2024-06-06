const pool = require("../src/server.js");
const request = require("supertest");
const { app } = require("../index.ts");
const { setupDb } = require("../src/utils.js");

const mockUser = {
  name: "Test",
  email: "test@testing.com",
  password: "password",
};

const signInAndSignUp = async () => {
  try {
    const agent = await request.agent(app);
    const user = await agent.post("/api/auth/users").send(mockUser);
    return [agent, user];
  } catch (error) {
    console.error(error);
  }
};

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
      email: mockUser.email,
      name: mockUser.name,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  test('DELETE to /api/auth/users/sessions signs out a user', async () => {
    const [agent] = await signInAndSignUp();
    const res = await agent.delete('/api/auth/users/sessions');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully signed out.' });
  });
  
});
