const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");

const usersRouter = require("./controllers/users");
require("dotenv").config();
const testRouter = require("./controllers/testing");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", middleware.tokenExtractor, loginRouter);
app.use(
  "/api/blogs",
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}
app.use("/api/testing", testRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
