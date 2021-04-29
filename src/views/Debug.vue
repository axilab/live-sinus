<template>
    <div>
        <v-btn @click="bluetoothListBound" color="primary">List</v-btn>
        <v-btn @click="openPort" color="primary">openPort</v-btn>
        <v-btn @click="closePort" color="primary">closePort</v-btn>
        <v-btn @click="sendTestData" color="primary">writePort</v-btn>
        <v-btn @click="readPort" color="primary">readPort</v-btn>

        <v-simple-table height="300px">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">N</th>
                    <th class="text-left">Data</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in getAllLogs" :key="item.data">
                    <td>{{ index }}</td>
                    <td>{{ item.data }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    // import util from "../core/util";
    import constans from "../core/constans";

    export default {
        name: "Home",

        components: {},
        data() {
            return {
            };
        },
        computed: mapGetters(["getAllLogs"]),
        methods: {
            ...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),
            sendTestData(){
                console.log('sendTestData')
                // let data = new Uint8Array(4);
                // data[0] = 0x3a;
                // data[1] = 0x30;
                // data[2] = 0x32;
                // data[3] = 0x0d;

                this.$store.dispatch("writePort",{data: constans.command.START})
            },
        }
    }
</script>
