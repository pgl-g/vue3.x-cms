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
        console.log('所有的实例都有的拦截器，请求拦截')
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
        console.log('所有的实例都有的拦截器，响应拦截')
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败～,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status === 404) {
          console.log('404错误信息～')
        }
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }
  // 请求封装
  request(config: pglRequestConfig): void {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }

    // if (config.showLoading === false) {
    //   this.showLoading = config.showLoading
    // }

    this.instance.request(config).then((res: any) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}

export default pglRequest
