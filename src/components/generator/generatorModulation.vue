<template>
<div>

    <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
        <radio-select :input="DialogData" @Callback="DialogSelectCallback($event)"></radio-select>
    </v-dialog>

    <v-dialog v-if="DialogNum3_1Show" v-model="DialogNum3_1Show" scrollable>
        <num3_1Select :input="DialogData" @Callback="DialogNum3_1Show=!DialogNum3_1Show"></num3_1Select>
    </v-dialog>

    <v-list>
        <v-list-item-group
                color="primary"
        >
            <v-list-item v-model="modulation_on" @change="modulation_change">
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox
                                :input-value="active"
                                color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
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
</div>
</template>

<script>
    import radioSelect from "@/components/dialogs/radioSelect"
    import num3_1Select from "@/components/dialogs/num3_1Select"
    export default {
        name: "GeneratorMain",
        components: {radioSelect, num3_1Select},
        data() {
            return {
                modulation_on: false,
                DialogData: null,
                DialogSelectShow: false,
                DialogNum3_1Show: null,

                items: [
                    { text: 'main.settingsList.am_form',subtitle:"синус", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.am_depth',subtitle:"50%", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.am_frequency',subtitle:"285.0", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_form',subtitle:"синус", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_deviation',subtitle:"0.00", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_frequency',subtitle:"0.1", icon: 'mdi-cog-outline' },
                ],
                DialogAmFormSelectData: {title:"main.titles.am_form", list:[{id:'1',text:'wave_form.sinus'},{id:'2',text:'wave_form.meander'},{id:'3',text:'wave_form.triangle'}],select:'1',type:'am_form'},
                DialogFmFormSelectData: {title:"main.titles.fm_form", list:[{id:'1',text:'wave_form.sinus'},{id:'2',text:'wave_form.meander'},{id:'3',text:'wave_form.triangle'}],select:'1',type:'fm_form'},
                DialogAmFormDepthSelectData: {title:"main.titles.am_depth", list:[{id:'1',text:'am_depth_values.p10'},{id:'2',text:'am_depth_values.p20'},{id:'3',text:'am_depth_values.p30'},
                        {id:'4',text:'am_depth_values.p40'},{id:'5',text:'am_depth_values.p50'},{id:'6',text:'am_depth_values.p60'},
                        {id:'7',text:'am_depth_values.p70'},{id:'8',text:'am_depth_values.p80'},{id:'9',text:'am_depth_values.p90'},
                        {id:'10',text:'am_depth_values.p100'},
                    ],select:'1',type:'am_depth'},

            }
        },
        computed: {
        },
        methods: {
            modulation_change(){
              console.log('modulation change')
            },

            DialogSelectCallback(ev){
                //console.log('DialogWaveformSelectCallback', ev)
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
                    case 'main.settingsList.am_form':
                        console.log('main.settingsList.am_form')
                        this.DialogData = this.DialogAmFormSelectData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.am_depth':
                        console.log('main.settingsList.am_depth')
                        this.DialogData = this.DialogAmFormDepthSelectData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.am_frequency':
                        console.log('main.settingsList.am_frequency')
                        this.DialogData = {value:100,type:'am_frequency',title:"main.titles.am_frequency"}
                        this.DialogNum3_1Show = true
                        break
                    case 'main.settingsList.fm_form':
                        console.log('main.settingsList.fm_form')
                        this.DialogData = this.DialogFmFormSelectData
                        this.DialogSelectShow = true
                        break
                    case 'main.settingsList.fm_deviation':
                        console.log('main.settingsList.fm_deviation')
                        this.DialogData = {value:100,type:'fm_deviation',title:"main.titles.fm_deviation"}
                        this.DialogNum3_1Show = true
                        break
                    case 'main.settingsList.fm_frequency':
                        console.log('main.settingsList.fm_frequency')
                        this.DialogData = {value:100,type:'fm_frequency',title:"main.titles.fm_frequency"}
                        this.DialogNum3_1Show = true
                        break
                    default:
                        break
                }
            },

        }
    }
</script>
