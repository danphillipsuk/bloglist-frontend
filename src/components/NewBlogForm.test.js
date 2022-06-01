import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> Updates parent stat and calls onSubmit', async () => {
  const submitNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlogForm submitNewBlog={submitNewBlog} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('Save')

  await user.type(titleInput, 'A Blog Title')
  await user.type(authorInput, 'A N Author')
  await user.type(urlInput, 'www.awebsite.com')
  await user.click(sendButton)

  expect(submitNewBlog.mock.calls).toHaveLength(1)
  expect(submitNewBlog.mock.calls[0][0].title).toBe('A Blog Title')
  expect(submitNewBlog.mock.calls[0][0].author).toBe('A N Author')
  expect(submitNewBlog.mock.calls[0][0].url).toBe('www.awebsite.com')
})