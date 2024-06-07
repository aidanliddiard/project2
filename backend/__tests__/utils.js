const { readFileSync } = require("node:fs");
const path = require("node:path");
const pool = require("../src/server.js");
const sql = readFileSync(path.join(__dirname, "../src/setup.sql"), "utf-8");

const request = require("supertest");
const { app } = require("../index.ts");

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

function setupDb() {
  return pool.query(sql);
}

function closeAll() {
  return pool.end();
}

afterAll(closeAll);

module.exports = {
  setupDb,
  mockUser,
  signInAndSignUp,
};
