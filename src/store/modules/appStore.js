import i18n from "@/i18n";
import Db from "@/core/Db";

export default {
  state: {
    packageVersion: process.env.PACKAGE_VERSION || "0",
    packageDate: process.env.PACKAGE_DATE || "0",

    error: null,
    db: null,
    status: "main.status.OFF",
    theme: "light",
    language: "ru",

    devices: [],
    deviceCurrent: null, //{adrress, name}

    logs: [],
  },
  mutations: {
    bluetoothSubscribe() {
      console.log("subscribe");
      //this.commit('setStateDevice',{command: "20", data: "1"})
      //this.setStateDevice2("20", "0")
      window.bluetoothSerial.unsubscribe(
        (success) => {
          console.log("unsubscribe success", success);
        },
        (failure) => {
          console.log("unsubscribe failure", failure);
        }
      );
      window.bluetoothSerial.subscribe(
        "\r",
        function (data) {
          let _command = data.substr(1, 2);
          let _data = data.substr(3, data.length - 4);
          //==========================
          //console.log(_command, _data)
          //==========================
          this.commit("setStateDevice", { command: _command, data: _data });
        }.bind(this),
        (failure) => {
          console.log("failure", failure);
        }
      );
    },
    setError(state, payload) {
      state.error = payload;
    },

    clearError(state) {
      state.error = null;
    },

    dbInit(state) {
      if (!state.init) {
        state.db = new Db();
        state.init = true;
      }
    },

    async appLoadSettings(state) {
      if (state.db == null) {
        this.commit("dbInit");
      }
      let device = await state.db.getPref(
        "device",
        '{"adrress":"00:00:00:00", "name":"not select"}'
      );
      //console.log('device#', device)
      //if (device!=='no-value'){
      device = JSON.parse(device);
      this.commit("setCurrentDevice", device);
      //}
      let theme = await state.db.getPref("theme", "no-value");
      let language = await state.db.getPref("language", "no-value");

      if (theme === "no-value") {
        theme = "light";
      }
      this.commit("setDarkTheme", theme);

      if (language === "no-value") {
        const currLocale = window.navigator.language.split("-")[0];
        if (currLocale === "ru") {
          this.commit("setLanguage", "ru");
        } else if (currLocale === "en") {
          this.commit("setLanguage", "en");
        } else {
          this.commit("setLanguage", "ru");
        }
      } else {
        const lang = await state.db.getPref("language", "ru");
        this.commit("setLanguage", lang);
      }
    },

    addLog(state, message) {
      if (typeof message === "object") {
        message = JSON.stringify(message, null, "  ");
      }
      state.logs.push({ data: message });
    },

    setStatus(state, status) {
      state.status = status;
    },

    setDarkTheme(state, theme) {
      state.theme = theme;
      state.db.setPref("theme", theme);
    },

    async setLanguage(state, lang) {
      i18n.locale = lang;
      await state.db.setPref("language", lang);
      state.language = lang;
    },
    //Bluetooth
    setBluetoothle(state, ble) {
      state.bluetoothle = ble;
    },

    setDevices(state, devices) {
      state.devices = devices;
    },
    setCurrentDevice(state, device) {
      state.deviceCurrent = device;
      state.db.setPref("device", JSON.stringify(device));
    },
  },
  actions: {
    bluetoothListBound({ commit }) {
      let serial = window.bluetoothSerial;
      serial.list(
        (devices) => {
          //console.log('devices', devices)
          commit("setDevices", devices);
        },
        () => {
          console.log("failed bluetooth list");
        }
      );
    },
  },
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
    appDate: (state) => {
      return state.packageDate;
    },

    error(state) {
      return state.error;
    },

    getDb(state) {
      return state.db;
    },
    getAllLogs(state) {
      return state.logs;
    },
    getStatus(state) {
      return state.status;
    },
    getTheme(state) {
      return state.theme;
    },
    getLanguage(state) {
      return state.language;
    },
    //bluetooth
    // getBluetoothle(state){
    //   return state.bluetoothle
    // },

    getCurrentDevice(state) {
      return state.deviceCurrent;
    },
    getDevices(state) {
      return state.devices;
    },
    getBluetoothInitStatus(state) {
      return state.bluetoothInit;
    },
  },
};
