const User = require('../models/user')
const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'Omenansyöntiblogi',
    author: 'Mina',
    url: 'http://omena.fi',
    likes: 5
  },
  {
    title: 'Banaanisyöntiblogi',
    author: 'Sina',
    url: 'http://banaani.fi',
    likes: 10
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
