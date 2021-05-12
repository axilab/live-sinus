export default {
    methods: {
        getBluetoothPermission(){
            console.log('getBluetoothPermission')
            /* eslint-disable */
            return ble.hasPermission((hasPermissionSuccess)=>{
                console.log('hasPermissionSuccess', hasPermissionSuccess)
            })
        },


        bleInit(){
            return new Promise((resolve, reject) => {
                const ble = window.bluetoothle

                ble.initialize((status) => {
                        console.log('result', status)
                        this.$store.commit('setBluetoothle',ble)
                        resolve(status)
                    },
                    {
                        "request": false,
                        "statusReceiver": false,
                        "restoreKey": "bluetoothleplugin"
                    })
            })
        },

        bleEnable(){
            console.log('bleEnable')
            return new Promise((resolve, reject) => {
                const ble = window.bluetoothle
                console.log('ble', ble)
                ble.enable(
                    (enableSuccess) => {
                        console.log('bluetooth enableSuccess')
                        resolve(enableSuccess)
                    },
                    (enableError) => {
                        console.log('bluetooth enableError',enableError)
                        reject(enableError)
                    })
            })
        },

        bleDisable(){
            return new Promise((resolve, reject)=>{
                this.$store.getters.bluetoothle.disable(disableSuccess=>resolve(disableSuccess), disableError=>reject(disableError));
            })
        }

    }
}
