export default {
  state: {
    bluetoothle: null,
    bluetoothInit: false,

    devices: [],
    deviceCurrent: null, //{adrress, name}
    serial: null,
  },
  mutations: {
    setBluetoothle(state, ble) {
      state.bluetoothle = ble;
    },

    setDevices(state, devices) {
      state.devices = devices;
    },
    setCurrentDevice(state, device) {
      state.deviceCurrent = device;
      //console.log('commit', device)
    },
  },
  actions: {
    bluetoothListBound({ commit }) {
      let serial = window.bluetoothSerial;
      serial.list(
        (devices) => {
          console.log("devices", devices);
          commit("setDevices", devices);
        },
        () => {
          console.log("failed bluetooth list");
        }
      );
    },
  },
  getters: {
    getBluetoothle(state) {
      return state.bluetoothle;
    },

    getCurrentDeviceName(state) {
      return state.deviceCurrentName;
    },
    getDevices(state) {
      return state.devices;
    },
    getBluetoothInitStatus(state) {
      return state.bluetoothInit;
    },
  },
};
