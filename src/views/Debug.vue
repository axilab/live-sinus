<template>
    <div>

            <v-btn @click="OpenPort" color="primary" class="ma-2">Open bluetootch port</v-btn>
            <v-btn @click="ClosePort" color="primary" class="ma-2">Close bluetootch port</v-btn>
            <v-btn @click="StartCommand" color="primary" class="ma-2">Start</v-btn>
            <v-btn @click="StopCommand" color="primary" class="ma-2">Stop</v-btn>
            <v-btn @click="readDada" color="primary" class="ma-2">Read Data</v-btn>
            <v-btn @click="getFirmwareVersion" color="primary" class="ma-2">get firmware version</v-btn>
            <v-btn @click="getStatus" color="primary" class="ma-2">get status</v-btn>
            <v-btn @click="bluetooth_isConnected" color="primary" class="ma-2">bluetooth is connected</v-btn>
            <v-btn @click="subscribe" color="primary" class="ma-2">subscribe</v-btn>
            <v-btn @click="setListCommand" color="primary" class="ma-2">setListCommand</v-btn>
            <v-btn @click="setTimerOff" color="primary" class="ma-2">setTimerOff</v-btn>
            <v-btn @click="getTimerOff" color="primary" class="ma-2">getTimerOff</v-btn>
            Device status {{getDeviceStatus}}
            Device timer {{getDeviceTimer}}
<!--            <v-btn @click="SetDB" color="primary">SetDb</v-btn>-->
<!--            <v-btn @click="GetDB" color="primary">GetDb</v-btn>-->

<!--            <v-btn @click="DBSetPrefs" color="primary">Test DB open</v-btn>-->
<!--            <v-btn @click="testDBCreateTable" color="primary">Test DB create table</v-btn>-->
<!--            <v-btn @click="testDBInsert" color="primary">Test DB insert</v-btn>-->
<!--            <v-btn @click="testDBSelect" color="primary">Test DB select</v-btn>-->

<!--        <v-simple-table height="300px">-->
<!--            <template v-slot:default>-->
<!--                <thead>-->
<!--                <tr>-->
<!--                    <th class="text-left">N</th>-->
<!--                    <th class="text-left">Data</th>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr v-for="(item, index) in getAllLogs" :key="item.data">-->
<!--                    <td>{{ index }}</td>-->
<!--                    <td>{{ item.data }}</td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--            </template>-->
<!--        </v-simple-table>-->

    </div>
</template>

<script>
    //import { mapGetters, mapActions } from "vuex"
    import bluetooth from "../core/bluetooth"
    //import Db from "@/core/Db"
    // import util from "../core/util";
    import constans from "../core/constans";



    export default {
        name: "Home",
        mixins: [bluetooth],
        components: {},
        data() {
            return {
                i: 0,
                db: null,
            };
        },
        //computed: mapGetters(["getAllLogs"]),
        computed: {
                getDeviceStatus(){
                        return this.$store.getters.getD03
                },
                getDeviceTimer(){
                        return this.$store.getters.getD20
                }
        },
        methods: {
            //...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),

            // async SetDB(){
            //     console.log('SetDB')
            //     const db = this.$store.getters.getDb
            //     let res = await db.setPref('param2', 'test-value-2')
            //     console.log('res',res)
            // },
            //
            // async GetDB(){
            //     console.log('GetDB')
            //     const db = this.$store.getters.getDb
            //     let res = await db.getPref('param2', 'default-value')
            //     console.log('res',res)
            // },


            // BluetoothPermission(){
            //     //console.log('debug getBluetoothPermission')
            //     this.getBluetoothPermission()
            //
            // },
            // async DBSetPrefs(){
            //     //this.i += 1
            //     //console.log('i',this.i)
            //     //this.db = new Db()
            //
            //     //console.log('set prefs')
            //     //await this.db.setPref('pref007','val'+this.i)
            //
            //     //let res = await this.db.getPref('locale','no-value')
            //     //console.log('res',res)
            // },

            async OpenPort(){
                let res = await this.openBluetoothPort().catch(err=>console.log('error:', err))
                console.log('OpenPort', res)
                //this.$store.dispatch('openPort')
            },
            async ClosePort(){
                let res = await this.closeBluetoothPort().catch(err=>console.log('error:', err))
                console.log('ClosePort', res)
            },

            StartCommand(){
                this.writePort(constans.command.START)
            },

            StopCommand(){
                this.writePort(constans.command.STOP)
            },


            async readDada(){
                let data = await this.readPort().catch(err=>console.log('read port error',err))
                console.log('data= ',data)
            },

            getFirmwareVersion(){
                this.writePort(constans.command.GET_FIRMWARE)
            },
            getStatus(){
                this.writePort(constans.command.GET_STATUS)
            },
            setListCommand(){
                this.writePort(constans.startByte+"50"+"1000"+"03"+"20"+constans.stopByte)
            },

            setTimerOff(){
                this.writePort(constans.startByte+"20"+"45"+constans.stopByte)
            },
            getTimerOff(){
                this.writePort(constans.startByte+"20"+constans.stopByte)
            },

            async bluetooth_isConnected(){
                let res = await this.bluetoothIsConnected()
                console.log('is connected', res)
            },
            subscribe(){
                this.$store.commit('bluetoothSubscribe')
            }




            //«03» - Рабочий Статус режимов генератора
            //«06» - Запрос резонансной частоты контура катушки, кГц
            //«07» - Запрос текущей рабочей частоты генератора, кГц
            //«13» - Запрос текущего рабочего тока через контур катушки, мА.
            //«24» - Запрос текущего времени таймера включения генератора, в минутах


            // sendTestData(){
            //     console.log('sendTestData')
            //     // let data = new Uint8Array(4);
            //     // data[0] = 0x3a;
            //     // data[1] = 0x30;
            //     // data[2] = 0x32;
            //     // data[3] = 0x0d;
            //
            //      this.$store.dispatch("writePort",{data: constans.command.START})
            // },
        },
        created() {
            //this.db = new Db()
        }
    }
</script>
