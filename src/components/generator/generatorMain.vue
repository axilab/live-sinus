<template>
    <div>
        <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
        <radio-select :input="DialogData" @Callback="DialogSelectCallback($event)"></radio-select>
        </v-dialog>

        <v-dialog v-if="DialogPowerShow" v-model="DialogPowerShow" scrollable>
            <power-select :input="DialogData" @Callback="DialogSelectCallback($event)"></power-select>
        </v-dialog>

        <v-dialog v-if="DialogfrequencyShow" v-model="DialogfrequencyShow" scrollable>
            <num3_2Select :input="DialogData" @Callback="DialogSelectCallback($event)"></num3_2Select>
        </v-dialog>

        <v-dialog v-if="DialogPhaseShiftShow" v-model="DialogPhaseShiftShow" scrollable>
            <num3select :input="DialogData" @Callback="DialogSelectCallback($event)"></num3select>
        </v-dialog>


        <div id="clock" :class="clockClass">
            <p class="time" style="margin-bottom: 0px;">{{ getTimer }}</p>
        </div>

        <div style="width: 100%; height: 100%;" class="mt-14">
        <v-list>
            <v-list-item-group
                    color="primary"
            >
                <v-list-item
                        v-for="(item, i) in settings"
                        :key="i"
                        @click="clickSetting(item)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                        <v-list-item-subtitle>{{subtitle(item.text)}}</v-list-item-subtitle>
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
                        <td align="right">{{ indicator(item.name) }}</td>
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
    import num3_2Select from "@/components/dialogs/num3_2Select"
    import num3select from "@/components/dialogs/num3select"
    //import constans from ".@/core/constans";
    import bluetooth from "@/core/bluetooth"

    export default {
        name: "GeneratorMain",
        mixins: [bluetooth],
        components: {radioSelect, powerSelect, num3_2Select, num3select},
        data() {
            return {
                DialogData: null,
                DialogSelectShow: false,
                DialogPowerShow: false,
                DialogfrequencyShow: false,
                DialogPhaseShiftShow: false,

                items: [
                    { text: 'main.settingsList.generator_mode', icon: 'mdi-image-filter-tilt-shift' },
                    { text: 'main.settingsList.waveform', icon: 'mdi-waveform' },
                    { text: 'main.settingsList.power', icon: 'mdi-wifi' },
                    { text: 'main.settingsList.timer_off', icon: 'mdi-clock-time-two-outline' },
                    { text: 'main.settingsList.timer_on', icon: 'mdi-update' },
                    { text: 'main.settingsList.phase_shift', icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.frequency', icon: 'mdi-cog-outline' },
                    ],
            }
        },
        computed: {
            settings(){
                //console.log('settings', this.$store.getters.getD75)
                if (this.$store.getters.getD75 === 'generator_modes.engineering'){
                    return [
                        { text: 'main.settingsList.generator_mode', icon: 'mdi-image-filter-tilt-shift' },
                        { text: 'main.settingsList.waveform', icon: 'mdi-waveform' },
                        { text: 'main.settingsList.power', icon: 'mdi-wifi' },
                        { text: 'main.settingsList.timer_off', icon: 'mdi-clock-time-two-outline' },
                        { text: 'main.settingsList.timer_on', icon: 'mdi-update' },
                        { text: 'main.settingsList.phase_shift', icon: 'mdi-cog-outline' },
                        { text: 'main.settingsList.frequency', icon: 'mdi-cog-outline' },
                    ]
                }else if (this.$store.getters.getD75 === 'generator_modes.profi'){
                    return [
                        { text: 'main.settingsList.generator_mode', icon: 'mdi-image-filter-tilt-shift' },
                        { text: 'main.settingsList.waveform', icon: 'mdi-waveform' },
                        { text: 'main.settingsList.power', icon: 'mdi-wifi' },
                        { text: 'main.settingsList.timer_off', icon: 'mdi-clock-time-two-outline' },
                        { text: 'main.settingsList.timer_on', icon: 'mdi-update' },
                        { text: 'main.settingsList.phase_shift', icon: 'mdi-cog-outline' }
                    ]
                }else {
                    return [
                        { text: 'main.settingsList.generator_mode', icon: 'mdi-image-filter-tilt-shift' },
                        { text: 'main.settingsList.waveform', icon: 'mdi-waveform' },
                        { text: 'main.settingsList.power', icon: 'mdi-wifi' },
                        { text: 'main.settingsList.timer_off', icon: 'mdi-clock-time-two-outline' },
                        { text: 'main.settingsList.timer_on', icon: 'mdi-update' },
                    ]
                }
            },
            indicators(){
                if (this.$store.getters.getD75 === 'generator_modes.engineering') {
                    return [
                        {name: "main.indicatorsList.voltage"},
                        {name: "main.indicatorsList.rms"},
                        {name: "main.indicatorsList.q_factor"},
                    ]
                }else {
                    return [
                        {name: "main.indicatorsList.frequency"},
                        {name: "main.indicatorsList.voltage"},
                        {name: "main.indicatorsList.rms"},
                        {name: "main.indicatorsList.q_factor"},
                    ]
                }
            },

            clockClass(){
                let theme = this.$store.getters.getTheme
                if (theme=='light'){return 'clock_white'}else {return 'clock_black'}
            },
            getTimer(){
                return this.$store.getters.getD20
            },

        },
        methods: {

            indicator(param){
                switch (param) {
                    case 'main.indicatorsList.frequency':
                        return this.$store.getters.getD07
                    case 'main.indicatorsList.voltage':
                         return this.$store.getters.getD39
                    case 'main.indicatorsList.rms':
                         return this.$store.getters.getD40
                    case 'main.indicatorsList.q_factor':
                         return this.$store.getters.getD11
                    default:
                        return 'nodata'
                }

            },
            subtitle(param){
                switch (param) {
                    case 'main.settingsList.generator_mode':
                        return this.$t(this.$store.getters.getD75)
                    case 'main.settingsList.waveform':
                        return this.$t(this.$store.getters.getD09)
                    case 'main.settingsList.power':
                        return this.$store.getters.getD13
                    case 'main.settingsList.timer_off':
                        return this.$store.getters.getD20
                    case 'main.settingsList.timer_on':
                        return this.$store.getters.getD24
                    case 'main.settingsList.phase_shift':
                        return this.$store.getters.getD18
                    case 'main.settingsList.frequency':
                        return this.$store.getters.getD07
                    default:
                        return 'no value'
                }

            },

            DialogSelectCallback(ev){
                this.DialogSelectShow = false
                this.DialogPowerShow = false
                this.DialogfrequencyShow = false
                this.DialogPhaseShiftShow = false
                if (ev==null){return}

                switch (ev.type) {
                    case 'generator_mode':
                        this.setGeneratorMode(ev.result, false)
                        break
                    case 'waveform':
                        this.setGeneratorWaveForm(ev.result, false)
                        break
                    case 'power':
                        this.setGeneratorPower(ev.result.toString())
                        break
                    case 'timer_off':
                         this.setTimerOff((ev.result * 15).toString())
                         break
                    case 'timer_on':
                        this.setGeneratorTimerOn((ev.result * 60).toString())
                        break
                    case 'phase_shift':
                        this.setGeneratorPhaseShift(ev.result, false)
                        break
                    case 'frequency':
                        this.setGeneratorFrequency(ev.result, false)
                        break
                    default:
                       console.log('type undefined', ev)

                }

            },

            clickSetting(item){
                //console.log('item', item)
                switch (item.text) {
                    case 'main.settingsList.waveform':
                        this.DialogData = {title:"main.titles.carrier_type", list:[{id:'0',text:'wave_form.sinus'},{id:'1',text:'wave_form.meander'},{id:'2',text:'wave_form.triangle'}],select:this.$store.getters.get_D09,type:'waveform'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.timer_off':
                        this.DialogData = {title:"main.titles.session_duration", list:[{id:0,text:'timer_off_values.off'},{id:1,text:'timer_off_values.m15'},{id:2,text:'timer_off_values.m30'},{id:3,text:'timer_off_values.m45'}, {id:4,text:'timer_off_values.m60'}],select:3,type:'timer_off'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.timer_on':
                        this.DialogData = {title:"main.titles.period_between_on",
                            list:[{id:0,text:'timer_on_values.off'}, {id:1,text:'timer_on_values.h1'}, {id:2,text:'timer_on_values.h2'}, {id:3,text:'timer_on_values.h3'},
                            {id:4,text:'timer_on_values.h4'}, {id:5,text:'timer_on_values.h5'}, {id:6,text:'timer_on_values.h6'}, {id:7,text:'timer_on_values.h7'},
                            {id:8,text:'timer_on_values.h8'}, {id:9,text:'timer_on_values.h9'}, {id:12,text:'timer_on_values.h12'}, {id:24,text:'timer_on_values.h24'},],
                            select: 0,type:'timer_on'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.generator_mode':
                        this.DialogData = {title:"main.titles.generator_mode", list:[{id:'0',text:'generator_modes.auto'},{id:'1',text:'generator_modes.profi'},{id:'2',text:'generator_modes.engineering'}],select: this.$store.getters.get_D75, type:'generator_mode'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.power':
                        this.DialogData = {title: "main.titles.load_current",value: this.$store.getters.getD14,type:'power'}
                        this.DialogPowerShow = true
                        break
                    case 'main.settingsList.frequency':
                        this.DialogData = {value: this.$store.getters.getD07, type:'frequency',title: 'main.titles.generator_frequency'}
                        this.DialogfrequencyShow = true
                        break
                    case 'main.settingsList.phase_shift':
                        this.DialogData = {value: this.$store.getters.getD18, type:'phase_shift'}
                        this.DialogPhaseShiftShow = true
                        break
                    //
                    default:
                        break
                }
            },

        },

    }
</script>

<style lang="scss">

        .clock_white {
            position: fixed;
            top: 6rem;
            left: 0;
            right: 0;
            z-index: 2;
            background: #FFFFFF;

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
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    z-index: 2;
    background: #1E1E1E;
    /*background: #121212;*/
    /*background: #0f3854;*/
    /*background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);*/

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
