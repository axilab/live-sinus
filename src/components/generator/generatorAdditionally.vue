<template>
    <div>

        <v-dialog v-if="Dialognum2selectShow" v-model="Dialognum2selectShow" scrollable>
            <num2select :input="DialogData" @Callback="Dialognum2selectShow=!Dialognum2selectShow"></num2select>
        </v-dialog>

    <v-list>
        <v-list-item-group
                color="primary"
        >
            <v-list-item v-model="selected">
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox
                                :input-value="active"
                                color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{$t('main.settingsList.error_off')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list-item-group>


        <v-list-item-group
                color="primary"
        >
            <v-list-item v-model="selected1" v-if="amperageStabilizationVisable">
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox
                                :input-value="active"
                                color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{$t('main.settingsList.amperage_stabilization')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>

        </v-list-item-group>

        <v-list-item-group color="primary" v-if="frequencyAutotuningVisable">
            <v-list-item @click="clickSetting('main.settingsList.frequency_autotuning')">
                <v-list-item-icon>
                    <v-icon v-text="'mdi-progress-clock'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="$t('main.settingsList.frequency_autotuning')"></v-list-item-title>
                    <v-list-item-subtitle>30</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

    </v-list>


    </div>
</template>

<script>
    import num2select from "@/components/dialogs/num2select"
    export default {
        name: "GeneratorMain",

        components: {num2select},
        data() {
            return {
                Dialognum2selectShow: false,
                DialogData: null,

                selected1: true,
                selected: true,
            }
        },
        computed: {
            amperageStabilizationVisable(){
                if (this.$store.getters.getD75 === 'generator_modes.engineering'){
                    return true
                }
                return false
            },
            frequencyAutotuningVisable(){
                if (this.$store.getters.getD75 === 'generator_modes.engineering'||this.$store.getters.getD75 === 'generator_modes.profi'){
                    return true
                }else {
                    return false
                }
            },


        },
        methods: {
            DialogSelectCallback(ev){
                console.log('DialogWaveformSelectCallback', ev)
                this.DialogSelectShow = false
                if (ev!==null){
                    const res = ev.result
                    const type = ev.type
                    console.log('type', type, 'res',res)
                }
            },


            clickSetting(item){
                console.log('item', item)
                switch (item) {
                    case 'main.settingsList.frequency_autotuning':
                        this.DialogData = {value:30, type:'frequency_autotuning',title:"main.titles.frequency_autotuning"}
                        this.Dialognum2selectShow = true
                        break
                    default:
                        break
                }
            },

        }
    }
</script>
