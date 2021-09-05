import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { register } from './global'
import pglRequest from './service'

const app = createApp(App)
register(app)
app.use(router)
app.use(store)
app.mount('#app')

pglRequest.request({
  url: '/home/multidata',
  method: 'GET'
})

console.log(process.env.VUE_APP_BASE_URL, process.env.VUE_APP_BASE_NAME)
