import axios, { AxiosInstance } from 'axios'
import type { pglRequestConfig, pglRequestInterceptors } from './type'

// ts ? 可选值
class pglRequest {
  instance: AxiosInstance
  interceptors?: pglRequestInterceptors

  constructor(config: pglRequestConfig) {
    this.instance = axios.create(config)
    // 将配置中的拦截保存
    this.interceptors = config.interceptors
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
  }
  // 请求封装
  request(config: pglRequestConfig): void {
    this.instance.request(config).then((res: any) => {
      console.log(res)
    })
  }
}

export default pglRequest
