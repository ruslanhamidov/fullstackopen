const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes, 0
  )
}

const favoriteBlog = (blogs) => {
  
}

module.exports = {
  dummy,
  totalLikes
}
