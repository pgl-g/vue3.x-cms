// import 'element-plus/lib/theme-chalk/base.css'
import 'element-plus/dist/index.css'
import { ElButton } from 'element-plus'
import { App } from 'vue'

const components = [ElButton]
export function register(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
