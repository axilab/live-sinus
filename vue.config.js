module.exports = {
  publicPath: '',

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
