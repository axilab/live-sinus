export default {
    methods: {
        getLocaleList() {
            return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
        },
        getUserLocale(){
            return window.navigator.language.split('-')[0]
        },

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

    }
}
