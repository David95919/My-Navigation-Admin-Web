import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { warning } from '@/utils/Message'

const instance: AxiosInstance = axios.create()

//请求拦截器
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data.code == 0) warning(response.data.msg)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
