const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
        },
      },
    },
  },
})

// module.exports = {
//   devServer: {
//     port: 8081
//   }
// }
