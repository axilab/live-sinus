<template>

    <v-list>
        <v-list-item-group
                color="primary"
        >
            <v-list-item>
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-checkbox
                                :input-value="active"
                                color="primary"
                        ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Модуляция</v-list-item-title>
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
</template>

<script>

    export default {
        name: "GeneratorMain",

        components: {},
        data() {
            return {
                items: [
                    { text: 'main.settingsList.am_form',subtitle:"синус", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.am_depth',subtitle:"50%", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.am_frequency',subtitle:"285.0", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_form',subtitle:"синус", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_deviation',subtitle:"0.00", icon: 'mdi-cog-outline' },
                    { text: 'main.settingsList.fm_frequency',subtitle:"0.1", icon: 'mdi-cog-outline' },
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
