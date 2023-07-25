import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config).catch(error => {
    console.log(error)
  })

  return response.data
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const remove = async (id) => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.delete(`${baseUrl}/${id}`, config).catch(error => {
    console.log(error)
  })
  return response.data
}


export default { getAll, create, update, setToken, remove }