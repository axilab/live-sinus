import i18n from "@/i18n";
import Db from "@/core/Db"


export default {
  state: {
    db: null,
    status: 'main.status.init',
    theme: 'light',
    language: 'ru',

    logs: [],
  },
  mutations: {
    dbInit(state){
      state.db = new Db()
    },

    async appLoadSettings(state){
      if (state.db == null){
        this.commit('dbInit')
      }

      let theme     = await state.db.getPref('theme','no-value')
      let language  = await state.db.getPref('language','no-value')


      if (theme==='no-value'){theme = 'light'}
      this.commit('setDarkTheme', theme)

      if (language==='no-value') {
        const currLocale = window.navigator.language.split('-')[0]
        //console.log('currLocale', language)
        if (currLocale==='ru'){this.commit('setLanguage','ru')}
        else if(currLocale==='en'){this.commit('setLanguage','en')}
        else {this.commit('setLanguage','ru')}
        //console.log('currLocale',currLocale)
      }else {
        const lang = await state.db.getPref('language','ru')
        this.commit('setLanguage', lang)
      }

    },
    // setDb(state, db){
    //   state.db = db
    // },
    addLog(state, message) {
      if (typeof message === "object") {
        message = JSON.stringify(message, null, "  ");
      }
      state.logs.push({ data: message });
    },

    setStatus(state, status){
      state.status = status
    },

    setDarkTheme(state, theme){
      //console.log('theme ',theme)
      state.theme = theme
      state.db.setPref('theme', theme)


      // if (theme=='light'){
      //   this.$vuetify.theme.dark = false
      // }else {
      //   this.$vuetify.theme.dark = true
      // }
    },

    async setLanguage(state, lang){
      //console.log('setLanguage=>',lang)
      //if(i18n.locale!=lang){
        i18n.locale = lang
      //}
      await state.db.setPref('language',lang)
      state.language = lang

    },
  },
  actions: {},
  getters: {
    getDb(state){
      return state.db
    },
    getAllLogs(state) {
      return state.logs
    },
    getStatus(state) {
      return state.status
    },
    getTheme(state){
      return state.theme
    },
    getLanguage(state){
      return state.language
    }
  },
};
