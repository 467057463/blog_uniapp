import axios from 'axios-miniprogram';
import API from '@/common/constants/api'

const axiosInstance = axios.create({
  baseURL: API.API_URL,
  timeout: 40000,
  headers: { 
    'Content-type': 'application/json;charset=UTF-8'
  },
  // responseType: 'json',
  withCredentials: false,
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    let result = response
    return result.data
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    let response = error.response
    if (!response) {     
      return Promise.reject('请求超时或网络出错')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance;