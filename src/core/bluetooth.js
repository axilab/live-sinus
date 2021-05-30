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


                // serial.unsubscribe(
                //     (data) => {
                //         resolve({status:'ok',code:200})
                //         console.log('unsubscribe success', data)
                //         serial.disconnect(() => {
                //             console.log('serial.disconnect success')
                //         }, (error) => {
                //             console.log('serial.disconnect error', error)
                //         });
                //     },
                //     (error) => {
                //         console.log('unsubscribe error', error)
                //     }
                // );
            })
        },

        writePort(data){
            const serial = window.bluetoothSerial
            console.log('send ',data)
            serial.write(data, ()=>{
                //console.log('writePort success')
                //commit('addLog',data)
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
    }
}
