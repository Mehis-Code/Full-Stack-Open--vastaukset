const Blog = ({ blog }) => (

  <div>
    {blog.title} {blog.author} {blog.url} likes: {blog.likes}
  </div >
)

export default Blog