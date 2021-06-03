import Vue from "vue";
import Vuex from "vuex";
import appStore from "./modules/appStore";
import deviceStore from "./modules/deviceStore";
//import util from '@/core/util'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appStore,
    deviceStore
  },
//  mixins: [util]
});
