const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

let token = process.env.TOKEN;

test("ID is unique", async () => {
  const finalblogs = await helper.blogsInDatabase();
  const response = await api
    .get("/api/blogs/62003e7906944f2be9a84ad0")
    .set("Authorization", "bearer " + token);
  const idlist = finalblogs.map((n) => n.id);
  const myid = idlist.filter(function (item) {
    return item === response.body.id;
  });

  expect(myid[0]).toBe("62003e7906944f2be9a84ad0");
});
