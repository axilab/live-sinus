import Vue from "vue";
import Vuex from "vuex";
import bluetoothStore from "./modules/bluetoothStore";
import appStore from "./modules/appStore";
import deviceStore from "./modules/deviceStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bluetoothStore,
    appStore,
    deviceStore
  },
});
