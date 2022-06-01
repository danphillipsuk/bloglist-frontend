import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> Initial State', () => {

  const blog = {
    title: 'A title',
    author: 'A N Author',
    url: 'www.awebsite.com',
    likes: 16,
    user: {
      username: 'Dan'
    }
  }

  let container
  beforeEach(() => {
    container = render(
      <Blog blog={blog} likesPlusOne={test} deleteBlog={test}/>
    ).container
  })

  test ('Main content (title & author) is rendered', () => {
    const element = screen.getByText('A title | A N Author')
    expect(element).toBeDefined()

  })

  test ('Expect additional infomation to be hidden', () => {
    const visible = container.querySelector('.blogInfo')
    expect(visible.style.display).toBe('none')
  })

})

describe('<Blog /> Button clicks', () => {

  const blog = {
    title: 'A title',
    author: 'A N Author',
    url: 'www.awebsite.com',
    likes: 16,
    user: {
      username: 'Dan'
    }
  }
  const mockHandler = jest.fn()

  let container
  beforeEach(() => {
    container = render(
      <Blog blog={blog} likesPlusOne={mockHandler} deleteBlog={test}/>
    ).container
  })

  test('Clicking View button shows hidden info', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const visible = container.querySelector('.blogInfo')
    expect(visible.style.display).not.toBe('none')
  })

  test('Clicking like button twice registers two clicks', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})