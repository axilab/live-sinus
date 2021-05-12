<template>
    <div>

            <v-btn @click="BluetoothPermission" color="primary">Bluetooth permission</v-btn>
            <v-btn @click="SetDB" color="primary">SetDb</v-btn>
            <v-btn @click="GetDB" color="primary">GetDb</v-btn>

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
        methods: {
            //...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),

            async SetDB(){
                console.log('SetDB')
                const db = this.$store.getters.getDb
                let res = await db.setPref('param2', 'test-value-2')
                console.log('res',res)
            },

            async GetDB(){
                console.log('GetDB')
                const db = this.$store.getters.getDb
                let res = await db.getPref('param2', 'default-value')
                console.log('res',res)
            },


            BluetoothPermission(){
                //console.log('debug getBluetoothPermission')
                this.getBluetoothPermission()

            },
            async DBSetPrefs(){
                //this.i += 1
                //console.log('i',this.i)
                //this.db = new Db()

                //console.log('set prefs')
                //await this.db.setPref('pref007','val'+this.i)

                //let res = await this.db.getPref('locale','no-value')
                //console.log('res',res)
            },


            sendTestData(){
                console.log('sendTestData')
                // let data = new Uint8Array(4);
                // data[0] = 0x3a;
                // data[1] = 0x30;
                // data[2] = 0x32;
                // data[3] = 0x0d;

                 this.$store.dispatch("writePort",{data: constans.command.START})
            },
        },
        created() {
            //this.db = new Db()
        }
    }
</script>
