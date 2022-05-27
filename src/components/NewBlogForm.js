const NewBlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => (

    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={handleSubmit}>
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

export default NewBlogForm