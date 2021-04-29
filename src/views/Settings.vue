<template>
    <v-container fluid>
        <v-dialog v-if="DialogDevicesSelectShow" v-model="DialogDevicesSelectShow" fullscreen hide-overlay scrollable>
            <devices-select :prevDevice="DialogDevicesSelectData" @DialogDevicesSelectCallback="DialogDevicesSelectCallback($event)"></devices-select>
        </v-dialog>
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
</template>

<script>
    // import {mapGetters} from "vuex";
    import devicesSelect from "@/components/dialogs/devicesSelect"
    import util from "../core/util";
    export default {
        name: "Settings",
        mixins: [util],
        components: {devicesSelect},
        data() {
            return {
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
                console.log(this.getLocaleList())
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
            languageChange(){
                this.$store.commit("setLanguage", this.locale)
            },
            themeChange(){
                this.$store.commit("setDarkTheme",this.theme)
                this.$vuetify.theme.dark = this.$store.getters.getTheme=='dark'
            },
            clickbuttonSelectGenerator(){
                this.DialogDevicesSelectData = this.deviceSelect
                this.DialogDevicesSelectShow = true
            },
            DialogDevicesSelectCallback(ev){
                if (ev.result){
                    console.log('DialogDevicesSelectCallback', ev)
                    this.deviceSelect = ev.result
                    this.$store.commit("setCurrentDevice", ev.result)

                }
                this.DialogDevicesSelectShow = false
            }
        },
        created() {
            console.log('Settings create')
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
