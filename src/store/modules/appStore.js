import i18n from "@/i18n";

export default {
  state: {
    status: 'main.status.init',
    theme: 'light',
    language: 'ru',

    logs: [],
  },
  mutations: {
    addLog(state, message) {
      if (typeof msg === "object") {
        message = JSON.stringify(message, null, "  ");
      }
      state.logs.push({ data: message });
    },
    setStatus(state, status){
      state.status = status
    },
    setDarkTheme(state, theme){
      console.log('theme ',theme)
      state.theme = theme
      if (theme=='light'){
        //Vue.$vuetify.theme.dark = false
      }else {
        //Vue.$vuetify.theme.dark = true
      }
    },
    setLanguage(state, lang){
      if(i18n.locale!=lang){
        i18n.locale = lang
      }
      state.language = lang
    },
  },
  actions: {},
  getters: {
    getAllLogs(state) {
      return state.logs;
    },
    getStatus(state) {
      return state.status;
    },
    getTheme(state){
      return state.theme
    },
    getLanguage(state){
      return state.language
    }
  },
};
