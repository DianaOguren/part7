const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

describe("Adding user", () => {
  test("Password Length", async () => {
    const newUser = {
      username: "Al",
      name: "Bob Hello",
      password: "12",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain(
      "password should be at least 3 characters length"
    );
  });
});
