const webpack = require('webpack');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const versionDate = JSON.parse(packageJson).versionDate || '--.--.--'

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"',
          PACKAGE_DATE: '"' + versionDate + '"'
        }
      })
    ]
  },

  publicPath: "",

  pluginOptions: {
    cordovaPath: "src-cordova",
    i18n: {
      locale: "ru",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },

  transpileDependencies: ["vuetify"],
};
