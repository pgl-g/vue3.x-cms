import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { pglRequestConfig, pglRequestInterceptors } from './type'

// ts ? 可选值
class pglRequest {
  instance: AxiosInstance
  interceptors?: pglRequestInterceptors

  constructor(config: pglRequestConfig) {
    console.log(config)
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 请求拦截 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器，请求拦截')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器，响应拦截')
        return res
      },
      (err) => {
        return err
      }
    )
  }
  // 请求封装
  request(config: pglRequestConfig): void {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    this.instance.request(config).then((res: any) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}

export default pglRequest
