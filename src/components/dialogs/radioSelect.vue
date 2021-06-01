<template>
            <v-card>
                <v-card-title>{{$t(title)}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-radio-group
                            v-model="selected"
                            column
                    >
                        <v-radio v-for="item in list"
                                :label="$t(item.text)"
                                :value="item.id"
                                :key="item.id"
                        ></v-radio>

                    </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                            color="blue darken-1"
                            @click="clickSelect"
                    >
                        {{$t('settings.selectDeviceDialogButtonSelect')}}
                    </v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="clickClose"
                    >
                        {{$t('settings.selectDeviceDialogButtonCancel')}}
                    </v-btn>
                </v-card-actions>
            </v-card>

</template>

<script>
    export default {
        props:['input'],
        data () {
            return {
                selected: '',
                dialog: false,
                title:"",
                list:"",
                type:""
            }
        },
        methods:{
            clickClose(){
                //console.log('clickBack()')
                this.$emit('Callback', {result:null})
            },
            clickSelect(){
                this.$emit('Callback', {result:this.selected, type: this.type})
            }
        },
        created() {
            this.selected = this.input.select
            this.title = this.input.title
            this.list  = this.input.list
            this.type  = this.input.type
        }
    }
</script>
