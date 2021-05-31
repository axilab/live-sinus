<template>
    <v-card>
        <v-card-title>{{$t('main.titles.generator_frequency')}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <div class="parent_div">
                <Scroller :itemSelect="Number(value.charAt(0))" :itemList="vList" @change="setVal(0,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(value.charAt(1))" :itemList="vList" @change="setVal(1,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(value.charAt(2))" :itemList="vList" @change="setVal(2,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(value.charAt(3))" :itemList="vList" @change="setVal(3,$event)" class="cont3"></Scroller>
                <div class="cont3">.</div>
                <Scroller :itemSelect="Number(value.charAt(4))" :itemList="vList" @change="setVal(4,$event)" class="cont3"></Scroller>
            </div>
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
    import Scroller from "@/components/Scroller"
    export default {
        components: {Scroller},
        props:['input'],
        data () {
            return {
                currentValue:[],
                vList: [
                    { value: 0, name: '0' },
                    { value: 1, name: '1' },
                    { value: 2, name: '2' },
                    { value: 3, name: '3' },
                    { value: 4, name: '4' },
                    { value: 5, name: '5' },
                    { value: 6, name: '6' },
                    { value: 7, name: '7' },
                    { value: 8, name: '8' },
                    { value: 9, name: '9' },
                ],

            }
        },
        methods:{
            setVal(idx,val){

                this.currentValue[idx]=val.val
            },
            clickClose(){
                this.$emit('Callback', {result:null})
            },
            clickSelect(){
                console.log('return', Number(this.currentValue.join('')))
                this.$emit('Callback', {result: Number(this.currentValue.join('')), type: this.type})
            }
        },

        created() {
            const val = "00000"+this.input.value.toString()
            this.value = val.slice(-5)
            console.log('val', this.value)
            this.currentValue[0] = Number(this.value.charAt(0))
            this.currentValue[1] = Number(this.value.charAt(1))
            this.currentValue[2] = Number(this.value.charAt(2))
            this.currentValue[3] = Number(this.value.charAt(3))
            this.currentValue[4] = Number(this.value.charAt(4))
            this.type  = this.input.type
        }
    }
</script>
<style>
    .parent_div {
        display: flex;
        flex-wrap: wrap;
    }
    .cont3 {
        flex: 1 1 15%;
        /*width: 800px;*/
        /*height: 150px;*/
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
