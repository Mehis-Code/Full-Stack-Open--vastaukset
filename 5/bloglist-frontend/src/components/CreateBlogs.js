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
      <form id={blogs.length} onSubmit={addBlog}>
        <div>
          title:
          <input ref={title} />
        </div>
        <div>
          author:
          <input ref={author} />
        </div>
        <div>
          url:
          <input ref={url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}
export default CreateBlogs