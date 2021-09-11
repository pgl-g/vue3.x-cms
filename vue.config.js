const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // webpack属性会合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
