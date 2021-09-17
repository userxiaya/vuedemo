import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
instance.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})
export default instance
