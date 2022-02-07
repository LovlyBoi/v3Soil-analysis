const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    devServer: {
      port: 12345,
      open: true,
      proxy: {
        '/api': {
          target: 'https://semghh.xyz:10086/content1-2.0/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // devtool: 'source-map'
  },
  productionSourceMap: false,
}
