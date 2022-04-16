const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.title && body.url) {
    const token = request.token;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (!request.user) {
      return response.status(401).json({ error: "invalid user" });
    }

    if (body.author === undefined) {
      return response.status(400).json({ error: "author missing" });
    }

    const user = request.user;

    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).json(user);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const action = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
});

module.exports = blogsRouter;
