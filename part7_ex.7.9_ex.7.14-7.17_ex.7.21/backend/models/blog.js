require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("runValidators", true);
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minLength: 3,
  },
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  url: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  likes: {
    type: Number,
    minLength: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
