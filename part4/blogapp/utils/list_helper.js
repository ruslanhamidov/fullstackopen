let assert = require('assert')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes, 0
  )
}

const favoriteBlog = (blogs) => {
  let mostLikedBlog = blogs[0]
  for (const blog of blogs) {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  }
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  const counts = {}

  for (const { author } of blogs) {
    counts[author] = (counts[author] || 0) + 1
  }

  let result = null

  for (const [author, blogs] of Object.entries(counts)) {
    if (!result || blogs > result.blogs) {
      result = { author, blogs }
    }
  }

  return result
}

const mostLikes = (blogs) => {
  const likes = {};

  for (const { author, likes: blogLikes } of blogs) {
    likes[author] = (likes[author] || 0) + blogLikes;
  }

  let result = null;

  for (const [author, totalLikes] of Object.entries(likes)) {
    if (!result || totalLikes > result.likes) {
      result = {
        author,
        likes: totalLikes
      };
    }
  }

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
