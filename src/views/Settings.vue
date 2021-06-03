<template>
    <div style="margin: 0; padding: 0">
        <v-dialog v-if="DialogDevicesSelectShow" v-model="DialogDevicesSelectShow" fullscreen hide-overlay scrollable>
            <devices-select :prevDevice="DialogDevicesSelectData" @DialogDevicesSelectCallback="DialogDevicesSelectCallback($event)"></devices-select>
        </v-dialog>

        <v-tabs v-model="tab" v-on:change="tabChanhe" class="fixed-tabs-bar">
            <v-tab key="general">{{$t("main.tabs_settings.application")}}</v-tab>
            <v-tab key="modulation">{{$t("main.tabs_settings.generator")}}</v-tab>

            <v-tab-item>
                <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-select
                                v-model="locale"
                                :items="$t('settings.languages')"
                                :label="$t('settings.language')"
                                item-text="value"
                                item-value="key"
                                @change="languageChange"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-select
                                v-model="theme"
                                :items="$t('settings.themes')"
                                :label="$t('settings.theme')"
                                item-text="value"
                                item-value="key"
                                @change="themeChange"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-btn block color="primary" @click="clickbuttonSelectGenerator">
                            {{$t('settings.buttonSelectGenerator')}}
                        </v-btn>
                        <div align="center">{{descriptionForButtonSelectGenetator}}</div>
                    </v-col>
                </v-row>
                </v-container>
            </v-tab-item>

            <v-tab-item>
                <v-container fluid>
                    <generator-settings/>
                </v-container>
            </v-tab-item>



        </v-tabs>

    </div>
</template>

<script>
    // import {mapGetters} from "vuex";
    import devicesSelect from "@/components/dialogs/devicesSelect"
    import generatorSettings from "@/components/generator/generatorSettings"
    import util from "../core/util";
    import bluetooth from "@/core/bluetooth"
    export default {
        name: "Settings",
        mixins: [util, bluetooth],
        components: {devicesSelect, generatorSettings},
        data() {
            return {
                tab: null,
                locale: 'ru',
                theme: 'light',
                themeList: ['light','dark'],
                deviceSelect: null,

                DialogDevicesSelectShow:false,
                DialogDevicesSelectData:null,
            }
        },
        computed: {
            langList(){
                //console.log(this.getLocaleList())
                return this.getLocaleList()
            },
            descriptionForButtonSelectGenetator(){
                if (this.deviceSelect==null||this.deviceSelect==undefined){
                    return this.$t('settings.descriptionForButtonSelectGenetatorNotSelect')
                }else {
                    return this.$t('settings.descriptionForButtonSelectGenetatorSelect')+" "+this.deviceSelect.name

                }
            }
        },
        methods:{
            tabChanhe(){

            },

            languageChange(){
                this.$store.commit("setLanguage", this.locale)
            },
            themeChange(){
                this.$vuetify.theme.dark = this.theme=='dark'
                this.$store.commit("setDarkTheme",this.theme)
                //this.$vuetify.theme.dark = this.$store.getters.getTheme=='dark'
            },
            clickbuttonSelectGenerator(){
                this.DialogDevicesSelectData = this.deviceSelect
                this.DialogDevicesSelectShow = true
            },
            async DialogDevicesSelectCallback(ev){
                if (ev.result){
                    //console.log('DialogDevicesSelectCallback', ev)
                    this.deviceSelect = ev.result
                    //console.log('result JSON', JSON.stringify(ev.result))
                    this.$store.commit("setCurrentDevice", ev.result)

                    let conn = await this.bluetoothIsConnected()
                    if (conn!=='OK'){
                        this.openBluetoothPort().then(()=>{this.deviceInit()})
                    }else{
                        console.log('port is open')
                        this.deviceInit()
                    }

                }
                this.DialogDevicesSelectShow = false
            }
        },
        created() {
            //console.log('Settings create')
            this.theme          = this.$store.getters.getTheme
            this.locale         = this.$store.getters.getLanguage
            this.deviceSelect   = this.$store.getters.getCurrentDevice
            //console.log('locale',this.locale)

        },
        mounted() {


        }
        //computed: mapGetters(["getAllLogs"]),
        //methods: {}
    }
</script>

<style>
    .fixed-tabs-bar .v-tabs-bar {
        position: -webkit-sticky;
        position: sticky;
        top: 3.5rem;
        z-index: 2;
    }

</style>
