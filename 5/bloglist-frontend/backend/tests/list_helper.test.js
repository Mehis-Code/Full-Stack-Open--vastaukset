const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  const listWithOneBlog = [blogs[0]]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('is zero when the list is emtpy', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has many blogs equals the sum of all likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [blogs[0]]

  test('when list has only one blog equals the one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const theBest = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    expect(result).toEqual(theBest)
  })

  test('is undefined when the list is emtpy', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('when list has many blogs is the one that has most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    const theBest = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    expect(result).toEqual(theBest)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [blogs[0]]

  test('when list has only one blog equals the author of the one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const withMost = {
      author: 'Michael Chan',
      blogs: 1,
    }

    expect(result).toEqual(withMost)
  })

  test('is undefined when the list is emtpy', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('when list has many blogs is the author that has most', () => {
    const result = listHelper.mostBlogs(blogs)

    const withMost = {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    expect(result).toEqual(withMost)
  })
})

describe('most likes', () => {
  const listWithOneBlog = [blogs[0]]

  test('when list has only one blog equals the author\'s likes of the one', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const withMost = {
      author: 'Michael Chan',
      likes: 7,
    }

    expect(result).toEqual(withMost)
  })

  test('is undefined when the list is emtpy', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('when list has many blogs is the author that has most', () => {
    const result = listHelper.mostLikes(blogs)

    const withMost = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }

    expect(result).toEqual(withMost)
  })
})
