<template>
<div>

    <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
        <radio-select :input="DialogData" @Callback="DialogSelectCallback($event)"></radio-select>
    </v-dialog>

    <v-dialog v-if="DialogNum3_1Show" v-model="DialogNum3_1Show" scrollable>
        <num3_1Select :input="DialogData" @Callback="DialogSelectCallback($event)"></num3_1Select>
    </v-dialog>

    <v-dialog v-if="DialogfrequencyShow" v-model="DialogfrequencyShow" scrollable>
        <num3_2Select :input="DialogData" @Callback="DialogSelectCallback($event)"></num3_2Select>
    </v-dialog>

    <v-list>
        <v-list-item-group
                color="primary"
        >
            <v-list-item>
                <template>
                    <v-list-item-action>
                        <v-checkbox
                                v-model="selectModulationOn"
                                color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content @click="selectModulationOn=!selectModulationOn">
                        <v-list-item-title>{{$t('main.settingsList.modulation')}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list-item-group>

            <v-list-item-group
                    color="primary"
            >
                <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="clickSetting(item.text)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                        <v-list-item-subtitle v-html="subtitle(item.text)"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>


    </v-list>
</div>
</template>

<script>
    import radioSelect from "@/components/dialogs/radioSelect"
    import num3_1Select from "@/components/dialogs/num3_1Select"
    import num3_2Select from "@/components/dialogs/num3_2Select"
    import bluetooth from "@/core/bluetooth"
    import constans from "../../core/constans";

    export default {
        name: "GeneratorModulation",
        mixins: [bluetooth],
        components: {radioSelect, num3_1Select, num3_2Select},
        data() {
            return {
                selectModulationOn: false,
                DialogData: null,
                DialogSelectShow: false,
                DialogfrequencyShow: false,
                DialogNum3_1Show: null,
            }
        },
        computed: {

            items(){
                let options = []
                options.push({ text: 'main.settingsList.am_form', icon: 'mdi-cog-outline' })
                if (this.$store.getters.getD69==='3'||this.$store.getters.getD69==='4'){
                    options.push({ text: 'main.settingsList.am_dutyCycle', icon: 'mdi-cog-outline' })
                }

                options.push({ text: 'main.settingsList.am_depth', icon: 'mdi-cog-outline' })
                options.push({ text: 'main.settingsList.am_frequency', icon: 'mdi-cog-outline' })
                options.push({ text: 'main.settingsList.fm_form', icon: 'mdi-cog-outline' })

                if (this.$store.getters.getD73==='3'||this.$store.getters.getD73==='4')
                {
                    options.push({text: 'main.settingsList.fm_dutyCycle', icon: 'mdi-cog-outline'})
                }
                options.push({ text: 'main.settingsList.fm_deviation', icon: 'mdi-cog-outline' })
                options.push({ text: 'main.settingsList.fm_frequency', icon: 'mdi-cog-outline' })
                return options
            },

            ModulationOn(){
                return this.$store.getters.getD66
            },
        },
        watch:{
            ModulationOn(newValue) {
                let val = Boolean(parseInt(newValue))
                if (val!=this.selectModulationOn){
                    this.selectModulationOn = val
                }
            },
            selectModulationOn(newValue){
                let val = newValue ? "1": "0"
                let old = String(this.$store.getters.getD66)
                if (val!==old){this.setModulation(val, false)}
            },
        },
        methods: {
            DialogSelectCallback(ev){
                this.DialogSelectShow = false
                this.DialogNum3_1Show = false
                this.DialogfrequencyShow = false
                if (ev!==null){
                    //console.log('type', ev.type, 'res',ev.result)
                    switch (ev.type) {
                        case 'main.settingsList.am_form':
                            this.setGeneratorAmForm(ev.result, false)
                            break
                        case 'main.settingsList.am_dutyCycle':
                            this.setGeneratorDutyCycleAM(String((ev.result)), false)
                            break
                        case 'main.settingsList.am_depth':
                            this.setGeneratorAmDepth(String((ev.result)), false)
                            break
                        case 'main.titles.am_frequency':
                            this.setGeneratorAmFrequency(ev.result, false)
                            break
                        case 'main.settingsList.fm_form':
                            this.setGeneratorFmForm(ev.result, false)
                            break
                        case 'main.settingsList.fm_dutyCycle':
                            this.setGeneratorDutyCycleFM(String((ev.result)), false)
                            break
                        case 'main.titles.fm_deviation':
                            this.setGeneratorFmDeviation(ev.result, false)
                            break
                        case 'main.titles.fm_frequency':
                            this.setGeneratorFmFrequency(ev.result, false)
                            break
                        default:
                            break
                    }
                }
            },

            clickSetting(item){
                // console.log('item', item)
                switch (item) {
                    case 'main.settingsList.am_form':
                        this.DialogData = {title:"main.titles.am_form", list:[{id:'0',text:'wave_form.sinus'},{id:'1',text:'wave_form.meander'},{id:'2',text:'wave_form.triangle'}, {id:'3',text:'wave_form.sawtooth'},{id:'4',text:'wave_form.rectangular'}],select: this.$store.getters.getD69, type: 'main.settingsList.am_form'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.am_dutyCycle':
                        this.DialogData = {title:'main.settingsList.am_dutyCycle', list:[{id:0,text:'am_depth_values.p0'},{id:10,text:'am_depth_values.p10'},{id:20,text:'am_depth_values.p20'},{id:30,text:'am_depth_values.p30'},
                                {id:40,text:'am_depth_values.p40'},{id:50,text:'am_depth_values.p50'},{id:60,text:'am_depth_values.p60'},
                                {id:70,text:'am_depth_values.p70'},{id:80,text:'am_depth_values.p80'},{id:90,text:'am_depth_values.p90'},
                                {id:100,text:'am_depth_values.p100'},
                            ],select: (Number(this.$store.getters.getD70)), type:'main.settingsList.am_dutyCycle'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.am_depth':
                        this.DialogData = {title:'main.titles.am_depth', list:[{id:10,text:'am_depth_values.p10'},{id:20,text:'am_depth_values.p20'},{id:30,text:'am_depth_values.p30'},
                                {id:40,text:'am_depth_values.p40'},{id:50,text:'am_depth_values.p50'},{id:60,text:'am_depth_values.p60'},
                                {id:70,text:'am_depth_values.p70'},{id:80,text:'am_depth_values.p80'},{id:90,text:'am_depth_values.p90'},
                                {id:100,text:'am_depth_values.p100'},
                            ],select: Number(this.$store.getters.getD67), type:'main.settingsList.am_depth'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.am_frequency':
                        this.DialogData = {value: this.$store.getters.getD68,type:'main.titles.am_frequency',title:"main.titles.am_frequency"}
                        this.DialogNum3_1Show = true
                        break
                    case 'main.settingsList.fm_form':
                        this.DialogData = {title:"main.titles.fm_form", list:[{id:'0',text:'wave_form.sinus'},{id:'1',text:'wave_form.meander'},{id:'2',text:'wave_form.triangle'}, {id:'3',text:'wave_form.sawtooth'},{id:'4',text:'wave_form.rectangular'}],select:this.$store.getters.getD73, type: 'main.settingsList.fm_form'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.fm_dutyCycle':
                        this.DialogData = {title:'main.settingsList.fm_dutyCycle', list:[{id:0,text:'am_depth_values.p0'}, {id:10,text:'am_depth_values.p10'},{id:20,text:'am_depth_values.p20'},{id:30,text:'am_depth_values.p30'},
                                {id:40,text:'am_depth_values.p40'},{id:50,text:'am_depth_values.p50'},{id:60,text:'am_depth_values.p60'},
                                {id:70,text:'am_depth_values.p70'},{id:80,text:'am_depth_values.p80'},{id:90,text:'am_depth_values.p90'},
                                {id:100,text:'am_depth_values.p100'},
                            ],select: (Number(this.$store.getters.getD74)), type:'main.settingsList.fm_dutyCycle'}
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.fm_deviation':
                        this.DialogData = {value:this.$store.getters.getD71,type:'main.titles.fm_deviation',title:"main.titles.fm_deviation"}
                        this.DialogfrequencyShow = true
                        break
                    case 'main.settingsList.fm_frequency':
                        this.DialogData = {value: this.$store.getters.getD72,type:'main.titles.fm_frequency',title:"main.titles.fm_frequency"}
                        this.DialogNum3_1Show = true
                        break
                    default:
                        break
                }
            },

            subtitle(param) {
                switch (param) {
                    case 'main.settingsList.am_form':
                        return this.$t(constans.waveWormFromIndex[this.$store.getters.getD69])
                    case 'main.settingsList.am_dutyCycle':
                        return this.$store.getters.getD70
                    case 'main.settingsList.am_depth':
                        return this.$store.getters.getD67
                    case 'main.settingsList.am_frequency':
                        return this.$store.getters.getD68
                    case 'main.settingsList.fm_form':
                        return this.$t(constans.waveWormFromIndex[this.$store.getters.getD73])
                    case 'main.settingsList.fm_dutyCycle':
                        return this.$store.getters.getD74
                    case 'main.settingsList.fm_deviation':
                        return this.$store.getters.getD71
                    case 'main.settingsList.fm_frequency':
                        return this.$store.getters.getD72
                    default:
                        return 'no value'
                }
            }
        },
        created() {
            this.selectModulationOn= (String(this.$store.getters.getD66)==="1") ? true : false
        }
    }
</script>
