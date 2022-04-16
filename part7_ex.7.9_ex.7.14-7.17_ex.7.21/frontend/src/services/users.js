import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

let token = null

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const exportedObject = {
  getAll
}

export default exportedObject