import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]= useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(function (a,b) {
        return a.likes < b.likes
      }) )
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

  const submitBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(
          `${blogObject.title} by ${blogObject.author} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  // const likesPlusOne = (blogObject, id) => {
  //   blogService
  //   .addLike(blogObject, id)
  //   .then(returnedBlog => {
  //     const update = blogs.find(element => element.id === id)
  //     blogs.splice(blogs.indexOf(update), 1, returnedBlog)
  //     setBlogs(blogs.sort(function (a,b) { 
  //       return a.likes < b.likes
  //     }))
  //     setErrorMessage(
  //       `${returnedBlog.title} has ${returnedBlog.likes} likes`
  //     )
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 3000)
  //   })
  // }

  const likesPlusOne = async (blogObject, id) => {
    try {
      const response = await blogService.addLike(blogObject, id)
      const update = blogs.find(element => element.id === id)
      blogs.splice(blogs.indexOf(update), 1, response)
      setBlogs(blogs.sort(function (a,b) { 
        return a.likes < b.likes
      }))
      setErrorMessage(
        `${response.title} has ${response.likes} likes`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch(exception) {
      console.log(exception)
    }
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

  const blogFormRef = useRef()


  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  
  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Blogs</h2>

      <h3>{user.name} is logged in<button onClick={logout}>logout</button></h3>

      <Togglable buttonLabel='Create New Entry' ref={blogFormRef}>
        <NewBlogForm submitNewBlog={submitBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likesPlusOne={likesPlusOne} addedBy={user.username} />
      )}

    </div>
  )
}

export default App
