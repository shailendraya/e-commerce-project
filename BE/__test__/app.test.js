const request = require("supertest");
const app = require("../app");
const dotenv = require('dotenv');
const connectDatabse = require('../config/database');

describe("Test the root path", () => {
    beforeAll(() => {
        connectDatabse();
    });
  test("It should response the GET method", done => {
    request(app)
      .get("/api/v1/products")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});