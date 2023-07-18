import Blog from './Blog'
const BlogList = ({ user, blogs }) => {
  if (Array.isArray(blogs)) {
    return (
      <div>
        {blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
      </div>
    )
  } else {
    return null
  }
}
export default BlogList