const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    devServer: {
      port: 12345,
      open: true,
      proxy: {
        '/api': {
          target: 'http://120.79.189.55:10086/content1-2.0/',
          // changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    },
    mode: "production",
    devtool: 'source-map'
  }

}