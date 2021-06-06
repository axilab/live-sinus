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

                //console.log('device.address', device.address)
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

        setModulation(on, EEPROM){
            console.log('modulation set',on)
            if (EEPROM) {
                this.writePort(constans.startByte + "26" + on + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "66" + on + constans.stopByte)
            }
        },

        setGeneratorAmForm(form, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "29" + form + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "69" + form + constans.stopByte)
            }
        },

        setGeneratorFmForm(form, EEPROM){
            console.log('setGeneratorFmForm', form)
            if (EEPROM) {
                this.writePort(constans.startByte + "33" + form + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "73" + form + constans.stopByte)
            }
        },
        setGeneratorFmDeviation(khz, EEPROM){
            console.log('setGeneratorFmDeviation', khz)
            if (EEPROM) {
                this.writePort(constans.startByte + "31" + khz + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "71" + khz + constans.stopByte)
            }
        },

        setGeneratorAmDepth(depth, EEPROM){
            console.log('setGeneratorAmDepth')
            if (EEPROM) {
                this.writePort(constans.startByte + "27" + depth + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "67" + depth + constans.stopByte)
            }
        },

        setGeneratorAmFrequency(hz, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "28" + hz + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "68" + hz + constans.stopByte)
            }
        },

        setGeneratorFmFrequency(hz, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "32" + hz + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "72" + hz + constans.stopByte)
            }
        },

        setAmperageStabilization(on, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "78" + on + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "79" + on + constans.stopByte)
            }
        },

        setFrequencyAutotuning(on, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "37" + on + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "77" + on + constans.stopByte)
            }
        },

        setErrorOff(on, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "45" + on + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "65" + on + constans.stopByte)
            }
        },

        setIncubator(on){
            this.writePort(constans.startByte + "80" + on + constans.stopByte)
        },

        setTimerOff(minutes){
            this.writePort(constans.startByte+"20"+minutes+constans.stopByte)
        },

        setGeneratorDutyCycleAM(percent, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "30" + percent + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "70" + percent + constans.stopByte)
            }
        },

        setGeneratorDutyCycleFM(percent, EEPROM){
            if (EEPROM) {
                this.writePort(constans.startByte + "34" + percent + constans.stopByte)
            }else {
                this.writePort(constans.startByte + "74" + percent + constans.stopByte)
            }
        },



        reset(){
            this.writePort(constans.startByte+"01"+constans.stopByte)
        },
        deviceInit(){
            this.writePort(constans.startByte+"50"+"1000"+"03"+"07"+"11"+"20"+"39"+"40"+"13"+"14"+"24"+"18"+"66"+"75"+"79"+"80"+"77"+"65"+"69"+"67"+"68"+"73"+"71"+"72"+"70"+"74"+constans.stopByte)
            //EEPROM 26 25 19 78 37 45 29 27 28 31 32

            this.$store.commit('bluetoothSubscribe')

        }
    }
}
