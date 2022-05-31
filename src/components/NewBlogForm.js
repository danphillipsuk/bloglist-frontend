import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ submitNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    submitNewBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL:
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  submitNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm