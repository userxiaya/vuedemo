import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export default instance
