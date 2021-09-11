import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { pglRequestConfig, pglRequestInterceptors } from './type'
import { ElLoading, ILoadingInstance } from 'element-plus'

// ts ? 可选值
class pglRequest {
  instance: AxiosInstance
  interceptors?: pglRequestInterceptors
  // showLoading?: boolean
  loading?: ILoadingInstance

  constructor(config: pglRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // this.showLoading = config.showLoading ?? true
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
        // if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据...'
        })
        // }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data
        return data
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }
  // 请求封装
  request<T>(config: pglRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对数据处理
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // if (config.showLoading === false) {
      //   this.showLoading = config.showLoading
      // }

      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: pglRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: pglRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: pglRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: pglRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default pglRequest
