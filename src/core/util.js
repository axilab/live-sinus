export default {
  methods: {
    getLocaleList() {
      return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",");
    },

    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    },
    timeFormat(min) {
      const timestamp = Number(min);
      const hours = Math.floor(timestamp / 60 / 60);
      return [
        hours.toString().padStart(2, "0"),
        (Math.floor(timestamp / 60) - hours * 60).toString().padStart(2, "0"),
        (timestamp % 60).toString().padStart(2, "0"),
      ].join(":");
    },

    timerFormat(min) {
      console.log("min", min);
      const timestamp = Number(min);
      const hours = Math.floor(timestamp / 60 / 60);
      const result = [
        hours.toString().padStart(2, "0"),
        (Math.floor(timestamp / 60) - hours * 60).toString().padStart(2, "0"),
      ].join("");
      console.log("timer", result);
      return result;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
  },

    // getUserLocale(){
    //     return window.navigator.language.split('-')[0]
    // },

    // function findCordovaPath() {
    //   let platform = cordova.platformId.toUpperCase();
    //   if (platform === 'ANDROID') {
    //     return `file:///android_asset/www/`;
    //   }
    //   else if (platform === 'IOS') {
    //     return `cdvfile://localhost/bundle/www/`;
    //   }
    //   else if (platform === 'OSX') {
    //     return `cdvfile://localhost/bundle/Contents/Resources/www/`;
    //   }
    //   else if (platform === 'WINDOWS') {
    //     return `/www/`;
    //   }
    //   return null;
    // }
  },
};
