import i18n from "@/i18n";
import Db from "@/core/Db"


export default {
  state: {
    init: false,
    error: null,
    db: null,
    status: 'main.status.init',
    theme: 'light',
    language: 'ru',

    logs: [],

//Bluetooch
    bluetoothle: null,
    bluetoothInit: false,

    devices: [],
    deviceCurrent: null, //{adrress, name}
    serial: null,
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },

    clearError (state) {
      state.error = null
    },

    dbInit(state){
      if (!state.init) {

        state.db = new Db()
        state.init = true
      }
    },

    async appLoadSettings(state){
      if (state.db == null){
        this.commit('dbInit')
      }

      let theme     = await state.db.getPref('theme','no-value')
      let language  = await state.db.getPref('language','no-value')
      let device    = await state.db.getPref('device','no-value')

      if (device!=='no-value'){
        device = JSON.parse(device);
        this.commit('setCurrentDevice',device)
      }

      console.log('device',device)

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
    },

    async setLanguage(state, lang){
      //console.log('setLanguage=>',lang)
      //if(i18n.locale!=lang){
        i18n.locale = lang
      //}
      await state.db.setPref('language',lang)
      state.language = lang

    },
    //Bluetooth
    setBluetoothle(state, ble){
      state.bluetoothle = ble
    },

    setDevices(state, devices){
      state.devices = devices
    },
    setCurrentDevice(state, device){
      state.deviceCurrent = device
      state.db.setPref('device', device)
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
    error (state) {
      return state.error
    },

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
    },
    //bluetooth
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
