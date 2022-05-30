import { useState } from "react"

const Blog = ({blog, likesPlusOne, addedBy }) => {
  
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
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none'}

  const increaseLikes = () => {

    likesPlusOne({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title} | {blog.author} | {blog.likes}</h3>

      <div style={hideWhenVisible}>
        <button onClick={() => setBlogDetailsVisible(true)}>View</button>
      </div>

      <div style={showWhenVisible}>
        <div style={infoStyle}>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={increaseLikes}>Like</button></p>
          <p>Added By {blog.user.name}</p>
          <button onClick={() => setBlogDetailsVisible(false)}>hide</button>
        </div>
    
      </div>

    </div>  
  )
}

export default Blog