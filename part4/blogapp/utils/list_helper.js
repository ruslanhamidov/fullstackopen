let assert = require('assert');

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
  let listOfAuthors = []
  let authorsObj = []
  for (const blog of blogs) {
    listOfAuthors.push(blog.author)
  }
  for (const author of [...new Set(listOfAuthors)]) {
    authorsObj.push(
      {
        'name': author,
        'blogs': listOfAuthors.filter(item => item === author).length
      }
    )
  }
  return authorsObj.reduce((max, item) => item.blogs > max.blogs ? item : max)
}

const mostLikes = (blogs) => {
  let listOfAuthors = []
  let authorsObj = []
  for (const blog of blogs) {
    listOfAuthors.push(blog.author)
  }
  for (const author of [...new Set(listOfAuthors)]) {
    let count = 0
    for (const blog of blogs) {
      if (blog.author === author) {
        count += blog.likes
      }
    }
    authorsObj.push(Object.fromEntries([
      ['name', author],
      ['likes', count]
    ]))
  }
  return authorsObj.reduce((max, item) => item.likes > max.likes ? item : max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
