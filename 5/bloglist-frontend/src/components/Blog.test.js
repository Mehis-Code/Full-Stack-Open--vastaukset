import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogs from './CreateBlogs'

jest.mock('../services/blogs')

describe('Blog component', () => {
  let blog

  beforeEach(() => {
    blog = {
      id: '123',
      title: 'testing',
      author: 'tester',
      url: 'www.test.com',
      likes: 0,
      user: {
        username: 'omena',
      },
    }
  })

  test('renders content', () => {
    const user = userEvent.setup()
    const setBlogs = jest.fn()

    render(<Blog blog={blog} user={user} setBlogs={setBlogs} />)

    const element = screen.getByText(/testing/)
    const element2 = screen.queryByText(/0/)
    const element3 = screen.queryByText(/www.test.com/)
    expect(element).toBeDefined()
    expect(element2).toBeNull()
    expect(element3).toBeNull()
  })

  test('on buttonpress, more info is shown', async () => {
    const user = userEvent.setup()
    const setBlogs = jest.fn()

    render(<Blog blog={blog} user={user} setBlogs={setBlogs} />)
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText(/www.test.com/)
    const element2 = screen.getByText(/0/)
    expect(element).toBeDefined()
    expect(element2).toBeDefined()
  })

  test('button clicked twice event called twice', async () => {
    const blogs = [
      blog,
    ]

    const user = userEvent.setup()
    const setBlogs = jest.fn()
    render(<Blog blogs={blogs} blog={blog} user={user} setBlogs={setBlogs} />)
    const button = screen.getByText(/view/)
    await user.click(button)
    const button2 = screen.getByText(/like/)
    await user.click(button2)
    await user.click(button2)


    expect(setBlogs.mock.calls).toHaveLength(2)
  })

})