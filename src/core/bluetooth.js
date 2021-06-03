import constans from "./constans";

export default {
    methods: {

        getBluetoothEnable(){
            return new Promise((resolve, reject) => {
                window.bluetoothSerial.isEnabled(success=>resolve(success), failure=>{reject(failure)});
            })
        },

        bluetoothEnable(){
            return new Promise((resolve, reject) => {
                window.bluetoothSerial.enable(success => resolve(success), failure => reject(failure));
            })
        },

        bluetoothIsConnected(){
            return new Promise((resolve)=> {
                window.bluetoothSerial.isConnected(success =>resolve(success), failure =>(resolve(failure)));
            })
        },

        openBluetoothPort(){
            return new Promise((resolve, reject) => {
                let device = this.$store.getters.getCurrentDevice

                console.log('device->>', device)
                if (device == null || device == undefined) {
                    reject({status: 'error', message: 'device not selected', code: 0})
                    //this.commit('setError', "Генератор не выбран")
                }

                console.log('device.address', device.address)
                let macAddress = device.address

                const serial = window.bluetoothSerial
                serial.connect(
                    macAddress,
                    () => {
                        this.$store.commit('bluetoothSubscribe')
                        resolve({status: 'ok', message: 'port opened', code: 200})
                    },
                    (error) => {
                        console.log('serial.connect error', error)
                        reject({status: 'error', message: error, code: 1})
                    }
                )
            })
        },

        closeBluetoothPort(){
            return new Promise((resolve, reject)=> {
                const serial = window.bluetoothSerial
                serial.disconnect(() => {
                    console.log('serial.disconnect success')
                    resolve({status:'ok',code:200})
                }, (error) => {
                    console.log('serial.disconnect error', error)
                    reject({status:'error',code:1, message: error})
                });
            })
        },

        writePort(data){
            const serial = window.bluetoothSerial
            //console.log('send ',data)
            serial.write(data, ()=>{
            }, ()=>{
                console.log('error write port')
            });
        },

        readPort(){
            return new Promise((resolve, reject)=> {
                const serial = window.bluetoothSerial
                serial.read((data) => {
                    console.log('read data', data);
                    resolve(data)
                }, (error) => {
                    console.log('read data error', error)
                    reject(error)
                });
            })
        },


/* режима работы - constans.generatorMode */

        // requestGeneratorData(){
        //     this.writePort(constans.startByte+"35"+"75"+constans.stopByte)
        // },

        setGeneratorMode(mode, EEPROM){
            if (EEPROM){
                this.writePort(constans.startByte+"35"+mode+constans.stopByte)
            }else {
                this.writePort(constans.startByte+"75"+mode+constans.stopByte)
            }
        },

        setGeneratorWaveForm(mode, EEPROM){
            if (EEPROM){
                this.writePort(constans.startByte+"10"+mode+constans.stopByte)
            }else {
                this.writePort(constans.startByte+"09"+mode+constans.stopByte)
            }
        },

        setGeneratorPower(mA){
                this.writePort(constans.startByte+"14"+mA+constans.stopByte)
        },

        setGeneratorTimerOn(minutes, EEPROM){
            if (EEPROM){
                this.writePort(constans.startByte+"25"+minutes+constans.stopByte)
            }else {
                this.writePort(constans.startByte+"24"+minutes+constans.stopByte)
            }
        },

        setGeneratorPhaseShift(gr, EEPROM){
            if (EEPROM){
                this.writePort(constans.startByte+"19"+gr+constans.stopByte)
            }else {
                this.writePort(constans.startByte+"18"+gr+constans.stopByte)
            }
        },

        setGeneratorFrequency(kHz,EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "76" + kHz + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "07" + kHz + constans.stopByte)
            }
        },

        setTimerOff(minutes){
            this.writePort(constans.startByte+"20"+minutes+constans.stopByte)
        },





        deviceInit(){

            this.writePort(constans.startByte+"50"+"1000"+"03"+"07"+"11"+"20"+"39"+"40"+"13"+"14"+"24"+"25"+"18"+"19"+"75"+constans.stopByte)
            this.$store.commit('bluetoothSubscribe')

        }
    }
}
