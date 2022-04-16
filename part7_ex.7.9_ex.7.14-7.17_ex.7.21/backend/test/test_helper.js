const Blog = require("../models/blog");
const initialBlogs = [
  {
    title: "Digital Photography School",
    author: "Darren Rowse",
    url: "https://www.digital-photography-school.com/",
    likes: 3994,
  },
  {
    title: "Freshome",
    author: "Ronique Gibson",
    url: "http://freshome.com/",
    likes: 4533,
  },
  {
    title: "Say Yes",
    author: "Liz Stanley",
    url: "https://sayyes.com",
    likes: 1356,
  },
  {
    author: "Will Taylor",
    title: "Bright Bazaar",
    url: "https://www.brightbazaarblog.com",
    likes: 4578,
  },
  {
    author: "Joanna Goddard",
    title: "A Cup of Jo",
    url: "URL: https://cupofjo.com",
    likes: 2345,
  },
  {
    author: "Jim Bathurst",
    title: "Nerd Fitness",
    url: "https://www.nerdfitness.com/blog/",
    likes: 5543,
  },
  {
    author: "Will Taylor",
    title: "Smitten Kitchen",
    url: "https://smittenkitchen.com",
    likes: 5000,
  },
];

const blogsInDatabase = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDatabase,
};
