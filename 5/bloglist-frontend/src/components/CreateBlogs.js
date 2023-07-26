import blogService from '../services/blogs'
import React, { useRef } from 'react'
const CreateBlogs = ({ setBlogs, blogs, user, refreshPage, setErrorMessage }) => {
  let title = useRef(null)
  let author = useRef(null)
  let url = useRef(null)

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.current.value,
      author: author.current.value,
      url: url.current.value,
      user: user.username,
      likes: 0
    }
    await blogService.create(blogObject).catch(error => {
      console.log(error)
    })
    const current = [...blogs, blogObject]
    setBlogs(current)
    setErrorMessage(`a new blog "${blogObject.title}" by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    refreshPage()
    title.current.value = ''
    author.current.value = ''
    url.current.value = ''
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id="createform" onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input id="title" ref={title} />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input id="author" ref={author} />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input id="url" ref={url} />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}
export default CreateBlogs