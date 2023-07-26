import React, { useState, useEffect } from 'react'
import loginService from './services/login'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogs from './components/CreateBlogs'
import BlogList from './components/BlogList'
import TopInfo from './components/TopInfo'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(false)

  function refreshPage() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [refresh])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: Login info incorrect')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <TopInfo errorMessage={errorMessage} />

      {!user && (
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handlePassWordChange={({ target }) => setPassword(target.value)}
            HandleNameChange={({ target }) => setUsername(target.value)}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
        </div>
      )}
      <br />
      {user && (
        <Togglable buttonLabel='create new'>
          <CreateBlogs
            refreshPage={refreshPage}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
            setErrorMessage={setErrorMessage} />
        </Togglable>)}
      {user && (<BlogList setErrorMessage={setErrorMessage} blogs={blogs} user={user} setBlogs={setBlogs} />)}
    </div>
  )
}

export default App