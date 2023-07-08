var _ = require('lodash')
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const asd = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(asd, 0)
}

const favoriteBlog = (blogs) => {
  const asd = (max, item) => {
    return max.likes > item.likes ? max : item
  }
  return blogs.reduce(asd, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const count = _.countBy(blogs, 'author')
  const maximum = _.max(Object.values(count))
  const authorFind = _.findKey(count, (o) => {
    return o === maximum
  }
  )
  return {
    author: authorFind,
    blogs: maximum
  }
}

const mostLikes = (blogs) => {
  //menin sekaisin lodashin tämän kanssa, joten tein ilman
  if (blogs.length === 0) {
    return null
  }
  const likesBy = {}
  blogs.forEach((blog) => {
    if (likesBy[blog.author]) {
      likesBy[blog.author] += blog.likes
    } else {
      likesBy[blog.author] = blog.likes
    }
  })
  //console.log(likesBy)
  let auth = null
  let max = 0
  for (const [key, value] of Object.entries(likesBy)) {
    if (value > max) {
      auth = key
      max = value
    }
  }
  return {
    author: auth,
    likes: max
  }
}


module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes
}