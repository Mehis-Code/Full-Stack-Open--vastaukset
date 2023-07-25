import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ user, blogs, setBlogs }) => {
  if (Array.isArray(blogs)) {
    return (
      <div>
        {(blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog => (
            <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} />
          ))).sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
      </div>
    )
  } else {
    return null
  }
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}


export default BlogList