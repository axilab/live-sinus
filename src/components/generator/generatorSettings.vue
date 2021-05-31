<template>
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



    </v-list>

</template>

<script>

    export default {
        name: "GeneratorSetting",

        components: {},
        data() {
            return {
                items: [
                    { text: 'generator_settings.generator_mode',subtitle:"авто", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_1',subtitle:"00:15:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_2',subtitle:"00:30:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.timer_off_3',subtitle:"00:45:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.period_between_on',subtitle:"00:00", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_min',subtitle:"75", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_mid',subtitle:"150", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.rms_out_max',subtitle:"300", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.generator_frequency',subtitle:"", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.Searching_resonance_min',subtitle:"150", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.Searching_resonance_max',subtitle:"350", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.phase_shift',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.amperage_stabilization',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.frequency_autotuning',subtitle:"", icon: 'mdi-cog-outline' },
                    //  { text: 'generator_settings.mode_incubator',subtitle:"", icon: 'mdi-cog-outline' },
                    //  { text: 'generator_settings.sound_signal',subtitle:"", icon: 'mdi-cog-outline' },
                    //  { text: 'generator_settings.error_off',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.modulation',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.am_form',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.am_depth',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.am_frequency',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.fm_form',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.fm_deviation',subtitle:"", icon: 'mdi-cog-outline' },
                    // { text: 'generator_settings.fm_frequency',subtitle:"", icon: 'mdi-cog-outline' },
                    { text: 'generator_settings.factory_settings',subtitle:"", icon: 'mdi-exclamation' },

                ],
            }
        },
        computed: {
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
                    //
                    default:
                        break
                }
            },

        }
    }
</script>
