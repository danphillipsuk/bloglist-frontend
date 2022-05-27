import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]= useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [newBlogVisible, setNewBlogVisible] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(
        'Username or password incorrect'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const submitBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage(
          `${blogObject.title} by ${blogObject.author} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const hideWhenVisible = { display: newBlogVisible ? 'none' : ''}
  const showWhenVisible = { display: newBlogVisible ? '' : 'none'}
  
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      <h3>{user.name} is logged in<button onClick={logout}>logout</button></h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <div style={hideWhenVisible}>
        <button onClick={() => setNewBlogVisible(true)}>Add New Blog</button>
      </div>

      <div style={showWhenVisible}>
        <NewBlogForm 
          title={title}
          author={author}
          url={url}
          handleTitleChange = {({ target }) => setTitle(target.value)}
          handleAuthorChange ={({ target }) => setAuthor(target.value)}
          handleUrlChange = {({ target }) => setUrl(target.value)}
          handleSubmit={submitBlog}
        />
        <button onClick={() => setNewBlogVisible(false)}>Hide Form</button>
      </div>
    </div>
  )
}

export default App
