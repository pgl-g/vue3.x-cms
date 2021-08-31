const path = require('path')

module.exports = {
  outputDir: './build',
  // webpack属性会合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
