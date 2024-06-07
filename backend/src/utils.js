const { readFileSync } = require("node:fs");
const path = require("node:path");
const pool = require("./server.js");
const sql = readFileSync(path.join(__dirname, "../src/setup.sql"), "utf-8");

function setupDb() {
  return pool.query(sql);
}

function closeAll() {
  return pool.end();
}

afterAll(closeAll);

module.exports = {
  setupDb,
};
