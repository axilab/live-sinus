<template>
    <div>
        <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
            <radio-select :input="DialogData" @Callback="DialogCallback($event)"></radio-select>
        </v-dialog>

        <v-dialog v-if="DialogTimerShow" v-model="DialogTimerShow" scrollable>
            <timer-select :input="DialogData" @Callback="DialogCallback($event)"></timer-select>
        </v-dialog>

        <v-dialog v-if="DialogPowerShow" v-model="DialogPowerShow" scrollable>
            <power-select :input="DialogData" @Callback="DialogCallback($event)"></power-select>
        </v-dialog>

        <v-dialog  v-model="DialogYesNoShow" width="500">
            <dialog-yes-no :input="DialogData" @callback="DialogCallback($event)"></dialog-yes-no>
        </v-dialog>

        <v-list>
        <v-list-item-group
                color="primary"
        >
            <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="clickSetting(item)"
            >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

        <v-list-item-group color="primary">
            <v-list-item>
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{$t('generator_settings.mode_incubator')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list-item-group>

        <v-list-item-group color="primary">
            <v-list-item>
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{$t('generator_settings.sound_signal')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list-item-group>

        <v-list-item-group color="primary">
            <v-list-item>
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{$t('generator_settings.error_off')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list-item-group>

            <v-list-item-group color="primary">
                <v-list-item @click="clickSetting(factory_settings)">
                    <v-list-item-icon>
                        <v-icon v-text="factory_settings.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(factory_settings.text)"></v-list-item-title>
                        <v-list-item-subtitle v-html="factory_settings.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>


    </v-list>
    </div>
</template>

<script>
    import radioSelect from "@/components/dialogs/radioSelect"
    import timerSelect from "@/components/dialogs/timerSelect"
    import powerSelect from "@/components/dialogs/powerSelect"
    import dialogYesNo from "@/components/dialogs/YesNo"

    export default {
        name: "GeneratorSetting",

        components: {radioSelect, timerSelect, powerSelect, dialogYesNo},
        data() {
            return {
                DialogSelectShow: false,
                DialogTimerShow: false,
                DialogPowerShow: false,
                DialogYesNoShow: false,

                DialogData: null,

                DialogGeneratorModeSelectData:{title:"main.titles.generator_mode", list:[{id:'1',text:'generator_modes.auto'},{id:'2',text:'generator_modes.profi'},{id:'3',text:'generator_modes.engineering'}],select:'1',type:'generator_mode'},

                items: [
                    { text: 'generator_settings.generator_mode',subtitle:"авто", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_1',subtitle:"00:15:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_2',subtitle:"00:30:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_3',subtitle:"00:45:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.period_between_on',subtitle:"00:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_min',subtitle:"75", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_mid',subtitle:"150", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_max',subtitle:"300", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.Searching_resonance_min',subtitle:"150", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.Searching_resonance_max',subtitle:"350", icon: 'mdi-cog-outline' },
                ],
                factory_settings: { text: 'generator_settings.factory_settings',subtitle:"", icon: 'mdi-exclamation' }
            }
        },
        computed: {
        },
        methods: {
            DialogCallback(ev){
                console.log('DialogSelectCallback', ev)
                this.DialogSelectShow = false
                if (ev!==null){
                    const res = ev.result
                    const type = ev.type
                    console.log('type', type, 'res',res)
                }

                    this.DialogSelectShow = false
                    this.DialogTimerShow = false
                    this.DialogPowerShow = false
                    this.DialogYesNoShow = false

            },


            clickSetting(item){
                console.log('item', item)
                switch (item.text) {
                    case 'generator_settings.generator_mode':
                        this.DialogData = this.DialogGeneratorModeSelectData
                        this.DialogSelectShow = true
                        break
                    case 'generator_settings.timer_off_1':
                        this.DialogData = {title:"generator_settings.timer_off_1", value:15}
                        this.DialogTimerShow = true
                        break
                    case 'generator_settings.timer_off_2':
                        this.DialogData = {title:"generator_settings.timer_off_2", value:30}
                        this.DialogTimerShow = true
                        break
                    case 'generator_settings.timer_off_3':
                        this.DialogData = {title:"generator_settings.timer_off_3", value:45}
                        this.DialogTimerShow = true
                        break
                    case 'generator_settings.period_between_on':
                        this.DialogData = {title:"generator_settings.period_between_on", value:0}
                        this.DialogTimerShow = true
                        break
                    case 'generator_settings.rms_out_min':
                        this.DialogData = {title:"generator_settings.rms_out_min", value:75,type:'rms_out_min'}
                        this.DialogPowerShow = true
                        break
                    case 'generator_settings.rms_out_mid':
                        this.DialogData = {title:"generator_settings.rms_out_mid",value:150,type:'rms_out_mid'}
                        this.DialogPowerShow = true
                        break
                    case 'generator_settings.rms_out_max':
                        this.DialogData = {title:"generator_settings.rms_out_max",value:300,type:'rms_out_max'}
                        this.DialogPowerShow = true
                        break
                    case 'generator_settings.Searching_resonance_min':
                        this.DialogData = {title:"generator_settings.Searching_resonance_min",value:150,type:'Searching_resonance_min'}
                        this.DialogPowerShow = true
                        break
                    case 'generator_settings.Searching_resonance_max':
                        this.DialogData = {title:"generator_settings.Searching_resonance_max",value:350,type:'Searching_resonance_max'}
                        this.DialogPowerShow = true
                        break
                    case 'generator_settings.factory_settings':
                        this.DialogData = {title:"general.warning", message:"generator_settings.factory_settings_answer",type:'factory_settings'}
                        this.DialogYesNoShow = true
                        break
                    default:
                        break
                }
            },

        }
    }
</script>
