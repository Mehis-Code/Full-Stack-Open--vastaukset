const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { initialUsers, initialBlogs, blogsInDb, usersInDb } = require('./test_helper')

let authHeader

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    // create a test user and save the corresponding auth header
    const user = initialUsers[0]
    await api.post('/api/users').send(user)
    const response = await api.post('/api/login').send(user)
    authHeader = `Bearer ${response.body.token}`
  })

  describe('when there are blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(initialBlogs)
    })

    test('blogs are returned as json', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a blogs has field id', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blog = response.body[0]

      expect(blog.id).toBeDefined()
    })

    test('a blog can be edited', async () => {
      const [blogBefore] = await blogsInDb()

      const modifiedBlog = { ...blogBefore, title: 'Goto considered useful' }

      await api
        .put(`/api/blogs/${blogBefore.id}`)
        .send(modifiedBlog)
        .expect(200)

      const blogs = await blogsInDb()

      const titles = blogs.map(r => r.title)

      expect(titles).toContain(
        modifiedBlog.title
      )
    })

    describe('a new blog', () => {
      test('can be added', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        }

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogs = await blogsInDb()

        expect(blogs).toHaveLength(initialBlogs.length + 1)

        const titles = blogs.map(r => r.title)

        expect(titles).toContain(
          blog.title
        )
      })

      test('has likes initialized to 0 if initial value is not given', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
      })

      test('if title is missing, creation fails', async () => {
        const blog = {
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })

      test('if author is missing, creation fails', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })
    })
  })

  describe('a blog', () => {
    let id
    beforeEach(async () => {
      await Blog.deleteMany({})

      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog)

      id = response.body.id
    })

    test('can be deleted by the creator', async () => {
      //const blogsBefore = await blogsInDb()

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', authHeader)
        .expect(204)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter).toHaveLength(0)
    })

    test('can not be deleted without valid auth header', async () => {
      //const blogsBefore = await blogsInDb()

      await api
        .delete(`/api/blogs/${id}`)
        .expect(401)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter).toHaveLength(1)
    })
  })

  describe('creation of a user', () => {
    test('succeeds with valid username and password', async () => {
      const user = {
        username: 'mluukkai',
        password: 'secret'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const users = await usersInDb()

      expect(users).toHaveLength(initialUsers.length + 1)
      const usernames = users.map(u => u.username)
      expect(usernames).toContain(
        user.username
      )
    })

    test('fails with a proper error if username is too short', async () => {
      const user = {
        username: 'ml',
        password: 'secret'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain(
        '`username` (`ml`) is shorter than the minimum allowed length (3)'
      )
    })

    test('fails with a proper error if password is too short', async () => {
      const user = {
        username: 'mluukka',
        password: 'se'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain(
        '`password` is shorter than the minimum allowed length (3)'
      )
    })

    test('fails with a proper error if username not unique', async () => {
      const user = initialUsers[0]

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain(
        'expected `username` to be unique.'
      )
    })
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})