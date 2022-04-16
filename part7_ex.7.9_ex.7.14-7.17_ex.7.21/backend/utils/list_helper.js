const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blogs) => {
    return sum + blogs.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map(function (object) {
    return object.likes;
  });
  return likes.sort((a, b) => a - b).reverse()[0];
};

const author = (blogs) => {
  var authors = _.map(blogs, "author");
  var result = _(authors).countBy().entries().maxBy(_.last);

  return `{author: ${result[0]}, blogs: ${result[1]}}`;
};

const mostLikes = (blogs) => {
  const fullarray = blogs.map(
    (object) => new Object({ author: object.author, likes: object.likes })
  );

  const arraywithlikes = blogs.map(function (object) {
    return object.likes;
  });
  const mostLikesinOneBlog = arraywithlikes.sort((a, b) => a - b).reverse()[0];

  var popularAuthor = fullarray.filter(function (person) {
    return person.likes === mostLikesinOneBlog;
  });

  var authorBlogs = fullarray.filter(function (person) {
    return person.author === popularAuthor[0].author;
  });

  const alllikesofAuthor = authorBlogs.map(function (object) {
    return object.likes;
  });

  const sum = alllikesofAuthor.reduce((partialSum, a) => partialSum + a, 0);

  return `{author: ${popularAuthor[0].author}, likes: ${sum}}`;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  author,
  mostLikes,
};
