import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]= useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
      console.log("Error")
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

  const NewBlogForm = () => (
    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={submitBlog}>
        <div>
          Title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
          type="text"
          value={author}
          name="Title"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
        <button type="submit">Submit</button>
      </div>
      </form>
      
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <h3>{user.name} is logged in<button onClick={logout}>logout</button></h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {NewBlogForm()}
    </div>
  )
}

export default App
