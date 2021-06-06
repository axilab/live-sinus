<template>
    <v-card>
        <v-card-title>{{$t(title)}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <div class="parent_div">
                <Scroller :itemSelect="Number(currentValue[0])" :itemList="vList" @change="setVal(0,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(currentValue[1])" :itemList="vList" @change="setVal(1,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(currentValue[2])" :itemList="vList" @change="setVal(2,$event)" class="cont3"></Scroller>
                <div class="cont03">.</div>
                <Scroller :itemSelect="Number(currentValue[3])" :itemList="vList" @change="setVal(3,$event)" class="cont3"></Scroller>
                <Scroller :itemSelect="Number(currentValue[4])" :itemList="vList" @change="setVal(4,$event)" class="cont3"></Scroller>
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
                title:"",
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
                let val = String(this.currentValue[0])+String(this.currentValue[1])+String(this.currentValue[2])+'.'+String(this.currentValue[3])+String(this.currentValue[4])
                this.$emit('Callback', {result: val, type: this.type})
            }
        },

        created() {
            this.value = ("00000"+this.input.value.toString()).slice(-6)
            this.currentValue[0] = Number(this.value.charAt(0))
            this.currentValue[1] = Number(this.value.charAt(1))
            this.currentValue[2] = Number(this.value.charAt(2))
            this.currentValue[3] = Number(this.value.charAt(4))
            this.currentValue[4] = Number(this.value.charAt(5))
            this.type  = this.input.type
            this.title = this.input.title
        }
    }
</script>
<style>
    .parent_div {
        display: flex;
        flex-wrap: wrap;
    }
    .cont03 {
        flex: 1 1 5%;
        /*width: 800px;*/
        /*height: 150px;*/
        display: flex;
        align-items: center;
        justify-content: center;
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
