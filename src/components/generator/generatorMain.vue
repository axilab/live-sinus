<template>
    <div>

        <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
            <radio-select :input="DialogData" @Callback="DialogWaveformSelectCallback($event)"></radio-select>
        </v-dialog>

        <v-dialog v-if="DialogPowerShow" v-model="DialogPowerShow" scrollable>
            <power-select :input="DialogData" @Callback="DialogPowerShow=!DialogPowerShow"></power-select>
        </v-dialog>

        <v-dialog v-if="DialogfrequencyShow" v-model="DialogfrequencyShow" scrollable>
            <num5Select :input="DialogData" @Callback="DialogfrequencyShow=!DialogfrequencyShow"></num5Select>
        </v-dialog>

        <v-dialog v-if="DialogPhaseShiftShow" v-model="DialogPhaseShiftShow" scrollable>
            <num2select :input="DialogData" @Callback="DialogPhaseShiftShow=!DialogPhaseShiftShow"></num2select>
        </v-dialog>


        <div id="clock" class="mt-0" :class="clockClass">
            <p class="time" style="margin-bottom: 0px;">{{ getTimer }}</p>
        </div>

        <div style="width: 100%; height: 100%;">
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
        </v-list>

            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr
                            v-for="item in indicators"
                            :key="item.name"
                    >
                        <td>{{ $t(item.name) }}</td>
                        <td align="right">{{ item.value }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <br><br><br><br>
    </div>
</template>

<script>
    import radioSelect from "@/components/dialogs/radioSelect"
    import powerSelect from "@/components/dialogs/powerSelect"
    import num5Select from "@/components/dialogs/num5Select"
    import num2select from "@/components/dialogs/num2select"
    export default {
        name: "GeneratorMain",

        components: {radioSelect, powerSelect, num5Select, num2select},
        data() {
            return {
                DialogData: null,
                DialogSelectShow: false,
                DialogPowerShow: false,
                DialogfrequencyShow: false,
                DialogPhaseShiftShow: false,
                DialogWaveformSelectData: {title:"main.titles.carrier_type", list:[{id:'1',text:'Sinus'},{id:'2',text:'Meander'},{id:'3',text:'Triangle'}],select:'1',type:'waveform'},
                DialogSessionDurationData: {title:"main.titles.session_duration", list:[{id:'1',text:'15 min'},{id:'2',text:'30 min'},{id:'3',text:'45 min'}, {id:'4',text:'60 min'}],select:'2',type:'timer_off'},
                DialogBetween_onData: {title:"main.titles.period_between_on", list:[{id:'0',text:'Stop'}, {id:'1',text:'1 hour'}, {id:'2',text:'2 hour'}, {id:'3',text:'3 hour'},
                                                                                        {id:'4',text:'4 hour'}, {id:'5',text:'5 hour'}, {id:'6',text:'6 hour'}, {id:'7',text:'7 hour'},
                                                                                        {id:'8',text:'8 hour'}, {id:'9',text:'9 hour'}, {id:'12',text:'12 hour'}, {id:'24',text:'24 hour'},],
                                                                                        select:'2',type:'timer_on'},


                items: [
                    { text: 'main.settingsList.waveform',subtitle:"синус", icon: 'mdi-waveform' },
                    { text: 'main.settingsList.power',subtitle:"100", icon: 'mdi-wifi' },
                    { text: 'main.settingsList.timer_off',subtitle:"00:00:00", icon: 'mdi-clock-time-two-outline' },
                    { text: 'main.settingsList.timer_on',subtitle:"00:00", icon: 'mdi-update' },
                    { text: 'main.settingsList.phase_shift',subtitle:"0.0", icon: '' },
                    { text: 'main.settingsList.frequency',subtitle:"269.5", icon: '' },
                    ],
                indicators:[
                    {name:"main.indicatorsList.frequency", value: this.$store.getters.getD07},
                    {name:"main.indicatorsList.voltage", value: this.$store.getters.getD39},
                    {name:"main.indicatorsList.rms", value: this.$store.getters.getD40},
                    {name:"main.indicatorsList.q_factor", value: this.$store.getters.getD11},
                ],
            }
        },
        computed: {
            clockClass(){
                let theme = this.$store.getters.getTheme
                if (theme=='light'){return 'clock_white'}else {return 'clock_black'}
            },
            getTimer(){
                return this.$store.getters.getD20
            }
        },
        methods: {
            DialogWaveformSelectCallback(ev){
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
                switch (item.text) {
                    case 'main.settingsList.waveform':
                        this.DialogData = this.DialogWaveformSelectData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.timer_off':
                        this.DialogData = this.DialogSessionDurationData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.timer_on':
                        this.DialogData = this.DialogBetween_onData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.power':
                        this.DialogData = {value:100,type:'load_current'}
                        this.DialogPowerShow = true
                        break
                    case 'main.settingsList.frequency':
                        this.DialogData = {value:12345, type:'generator_frequency'}
                        this.DialogfrequencyShow = true
                        break
                    case 'main.settingsList.phase_shift':
                        this.DialogData = {value:0, type:'phase_shift'}
                        this.DialogPhaseShiftShow = true
                        break
                    //
                    default:
                        break
                }
            },

        }
    }
</script>

<style lang="scss">

        .clock_white {
            /*background: #0f3854;*/
            /*background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);*/
            background-size: 100%;
            font-family: 'Share Tech Mono', monospace;
            color: #ffffff;
            text-align: center;
            color: #636363;
            text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
            .time {
                letter-spacing: 0.05em;
                font-size: 40px;
                padding: 5px 0;
            }
            .date {
                letter-spacing: 0.1em;
                font-size: 24px;
            }
            .text {
                letter-spacing: 0.1em;
                font-size: 12px;
                padding: 20px 0 0;
            }
}

.clock_black {
    background: #0f3854;
    background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
    background-size: 100%;
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
    .time {
        letter-spacing: 0.05em;
        font-size: 40px;
        padding: 5px 0;
    }
    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }
    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
}

</style>
