import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 拦截器 接口类 => hook
interface pglRequestInterceptors<T = AxiosResponse> {
  requestInterceptors: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch: (error: any) => any

  responseInterceptors: (res: T) => T
  responseInterceptorsCatch: (error: any) => any
}
// 继承 => 拦截器 接口类
interface pglRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: pglRequestInterceptors<T>
}

export { pglRequestConfig, pglRequestInterceptors }
