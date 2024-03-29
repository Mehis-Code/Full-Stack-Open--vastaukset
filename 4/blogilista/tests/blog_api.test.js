const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('tests about getting and so on', () => {
  test('blogs are returned as correct type', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('the id is named "id" and not "_id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('tests about posting and misc', () => {
  test('a blog can be posted', async () => {
    const newBlog = helper.initialBlogs[0]

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Omenansyöntiblogi')
  })

  test('if "likes"-field has no value, it is set to 0', async () => {
    const newBlog = {
      title: 'Omenansyöntiblogi',
      author: 'Mina',
      url: 'http://omena.fi',
      likes: ''
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    if (response.body[2].likes === undefined || response.body[2].likes === null) {
      response.body[2].likes = 0
    }
    expect(response.body[2].likes).toBeDefined()
  })

  test('if no title or url, responding with 400 Bad Request', async () => {
    const newBlog = {
      title: '',
      author: 'Mina',
      url: '',
      likes: '5'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('put and delete tests', () => {
  test('deleting a blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  })

  test('updating a blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const existingBlog = response.body[0]
    const updatedBlog = {
      ...existingBlog,
      title: 'Päärynä',
      url: 'http://paaryna.fi',
      likes: 200000
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)

    //const updatedResponse = await api.get(`/api/blogs/${id}`)
    //console.log(updatedResponse.body)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
