import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { register } from './global'
import pglRequest from './service'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
register(app)
app.use(router)
app.use(store)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

pglRequest.request<DataType>({
  url: '/home/multidata',
  method: 'GET',
  // showLoading: false,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptors: (res) => {
      console.log('单独响应处理res')
      return res
    }
  }
})
