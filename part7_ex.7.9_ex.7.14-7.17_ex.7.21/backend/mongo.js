const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://diana:${password}@cluster0.6ccjl.mongodb.net/databasepart4?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});
