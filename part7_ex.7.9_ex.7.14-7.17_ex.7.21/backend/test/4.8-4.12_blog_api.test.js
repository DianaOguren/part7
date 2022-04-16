const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
require("dotenv").config();

let token = process.env.TOKEN;

test("4.8: Blog posts are returned in the JSON format", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("4.8: The correct amount of blog posts are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", "bearer " + token);
  console.log(response.body);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("4.10: HTTP POST request successfully creates a new blog post", async () => {
  const newBlog = {
    author: "Baden Ronnie",
    title: "Wolf’s gaming blog",
    url: "https://wolfsgamingblog.com",
    likes: 2000,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const finalblogs = await helper.blogsInDatabase();
  expect(finalblogs).toHaveLength(helper.initialBlogs.length + 1);
});

test('4.11*: default 0 value of "likes" if the value is not written in the form', async () => {
  const newBlog = {
    author: "Camila Coelho",
    title: "Camila Coelho",
    url: "https://camilacoelho.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const finalblogs = await helper.blogsInDatabase();
  const likes = finalblogs.map((n) => n.likes);
  const lastItem = likes[likes.length - 1];
  expect(lastItem).toBe(0);
});

test("4.12*: 400 Bad Request if title and url properties are missing", async () => {
  const newBlog = {
    url: "https://www.helpscout.net/blog/",
    likes: 299,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(newBlog)
    .expect(400);
});
