import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (likePlusOne, id) => {
  const updateUrl = `${baseUrl}/${id}`
  const response = await axios.put(updateUrl, likePlusOne)
  return response.status
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const deleteUrl = `${baseUrl}/${id}`
  const response = await axios.delete(deleteUrl, config)
  return response.status
}


// eslint-disable-next-line
export default { getAll, setToken, create, addLike, deleteBlog }