import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const Blog = ({ setErrorMessage, blog, user, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [like, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updated = like + 1
    setLikes(updated)
    const blogObject = {
      ...blog,
      likes: updated
    }
    await blogService.update(blog.id, blogObject)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : blogObject))
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove the blog ${blog.title} by author ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setErrorMessage(`Blog ${blog.title} has been removed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>
          Nimi: {`"${blog.title}"`} Kirjoittaja: {`"${blog.author}"`}   <button id="view" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        </div>
        {visible && (
          <div>
            <div>{blog.url}</div>
            <div id={user.name}>
              {user.name}
            </div>
            <div>
              {like} <button id="like" onClick={handleLike}>like</button>
            </div>
            <br></br>
            <div>
              <button id="removal" onClick={handleRemove}>remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}


export default Blog
