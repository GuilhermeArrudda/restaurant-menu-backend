import supertest from "supertest";
import app from "../../src/app.js";

describe("Integration Tests", () => {
  describe("GET /primary", () => {

    it("primary test", async () => {

      const response = await supertest(app).get("/primary")

      expect(response.status).toEqual(200);
    });
  });
});
