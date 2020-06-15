const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  devServer: {
    host: 'dev.vkforest.com',
    port: 5277,
    proxy: {
      '/quality-api': {
        target: 'http://mdgt.vkforest.com/quality/public/index.php',
        changeOrigin: true,
        pathRewrite: {
          '^/quality-api': ''
        }
      },
      '/safety-api': {
        target: 'http://mdgt.vkforest.com/safety/public/index.php',
        changeOrigin: true,
        pathRewrite: {
          '^/safety-api': ''
        }
      },
      '/user-api': {
        target: 'http://mdgt.vkforest.com/auth2.5/public/index.php/api',
        changeOrigin: true,
        pathRewrite: {
          '^/user-api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin(),
    ],
  },
  chainWebpack: config => {
    config.merge({
      externals: {
        // 'vue': 'Vue',
        // 'vuex': 'Vuex',
        // 'axios': 'axios',
        // 'element-ui': 'ELEMENT',
        // 'echarts': 'echarts'
      }
    })

      ;["scss", "sass"].forEach(style => {
        ["normal", "normal-modules", "vue", "vue-modules"].forEach(one => {
          config.module
            .rule(style)
            .oneOf(one)
            .use("sass-resources-loader")
            .loader("sass-resources-loader")
            .options({
              resources: [
                "./src/styles/global/variables.scss",
                "./src/styles/global/mixins.scss"
              ]
            });
        });
      });
  },
  assetsDir: './',
  publicPath: './',
  // outputDir: 'vitec-new-data-center'
}
