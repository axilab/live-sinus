export default {
  state: {
    bluetoothle: null,
    bluetoothInit: false,

    devices: [],
    deviceCurrent: null,
    serial: null,

  },
  mutations: {

    setBluetoothle(state, ble){
      state.bluetoothle = ble
    },

    // devicesAdd(state, device){
    //   state.devices.push(device)
    // }
    setDevices(state, devices){
      state.devices = devices
    },
    setCurrentDevice(state, device){
      state.deviceCurrent = device
      //console.log('commit', device)
    }
  },
  actions: {

    bluetoothListBound({commit}) {
      let serial = window.bluetoothSerial
      serial.list((devices)=>{
        console.log('devices', devices)
        commit("setDevices", devices)
      }, ()=>{
        console.log('failed bluetooth list')
      });
    },

    openPort(){
      //{name: "JDY-31-SPP", address: "EF:04:04:0E:45:54", id: "EF:04:04:0E:45:54", class: 7936}
      let macAddress = "EF:04:04:0E:45:54"
      const serial = window.bluetoothSerial
      serial.connect(
          macAddress,
          ()=>{
            console.log('serial.connect success')
            serial.subscribe('\n', function (data) {
              console.log('data', data)
            },(error)=>{
              console.log('subscribe error', error)
            });
          },
          (error)=>{
            console.log('serial.connect error', error)
          }
      );
    },
    closePort(){
      const serial = window.bluetoothSerial
      serial.unsubscribe(
          (data)=> {
            console.log('unsubscribe success', data)
            serial.disconnect(()=>{
              console.log('serial.disconnect success')
            }, (error)=>{
              console.log('serial.disconnect error', error)
            });
          },
          (error)=>{
            console.log('unsubscribe error', error)
          }
      );
    },
    writePort({commit},{data}){
      const serial = window.bluetoothSerial
      console.log('send ',data)
      serial.write(data, ()=>{
        console.log('writePort success')


        commit('addLog',data)
      }, ()=>{
        console.log(data)
      });
    },
    readPort(){
      const serial = window.bluetoothSerial
      serial.read((data)=> {
        console.log('read data',data);
      }, (error)=>{
        console.log('read data error', error)
      });
    },

    sendCommand(){

    }

  },
  getters: {
    getBluetoothle(state){
      return state.bluetoothle
    },

    getCurrentDevice(state){
      return state.deviceCurrent
    },
    getDevices(state){
      return state.devices
    },
    getBluetoothInitStatus(state) {
      return state.bluetoothInit;
    },
  },
};
