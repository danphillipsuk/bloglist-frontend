import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likesPlusOne, addedBy, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: .5,
    marginBottom: 5
  }

  const infoStyle = {
    padding: 10,
    background: '#EEE',
  }

  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const hideWhenVisible = { display: blogDetailsVisible ? 'none': '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const increaseLikes = () => {

    likesPlusOne({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const removeBlog = () => {
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (

    <div style={blogStyle} className='blogTitle'>
      <h3>{blog.title} | {blog.author}
        <button onClick={() => setBlogDetailsVisible(true)} style={hideWhenVisible}>View</button>
        <button onClick={() => setBlogDetailsVisible(false)} style={showWhenVisible}>hide</button>
      </h3>

      <div style={showWhenVisible} className='blogInfo'>
        <div style={infoStyle}>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={increaseLikes}>Like</button></p>
          <p>Added By {blog.user.username}</p>
          {addedBy === blog.user.username ? ( <button onClick={removeBlog}>Remove</button>) : ( '' ) }
        </div>
      </div>

    </div>
  )
}

Blog.propTypes = {
  likesPlusOne: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog