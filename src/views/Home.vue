<template>
  <div style="margin: 0; padding: 0">

    <v-dialog v-model="menu" width="500"
    >

      <v-card>

        <v-card @click="clikMenuItem(item.title)"
                v-for="(item) in getMenu"
                :key="item.title"
                link
                class="mx-auto"
        >
          <v-card-title>{{$t(item.title)}}</v-card-title>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
                  color="primary"
                  text
                  @click="menu = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tabs v-model="tab" v-on:change="tabChanhe" class="fixed-tabs-bar">
      <v-tab key="general">{{$t("main.tabs.main")}}</v-tab>
      <v-tab key="modulation" v-if="tabModulationVisable">{{$t("main.tabs.modulation")}}</v-tab>
      <v-tab key="addirionally">{{$t("main.tabs.addirionally")}}</v-tab>

      <v-tab-item>
        <generator-main></generator-main>
      </v-tab-item>

      <v-tab-item v-if="tabModulationVisable">
        <generator-modulation></generator-modulation>
      </v-tab-item>

      <v-tab-item>
        <generator-additionally></generator-additionally>
      </v-tab-item>

    </v-tabs>
    <v-fab-transition>
      <v-btn bottom color="pink" dark fab fixed right @click="menuclick">
        <v-icon :class="fabClass">{{ fabIcon }}</v-icon>
      </v-btn>
    </v-fab-transition>

  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
//import { mapActions } from "vuex";
//import util from "@/core/util";
import bluetooth from "@/core/bluetooth"
import generatorMain from "@/components/generator/generatorMain.vue"
import generatorModulation from "@/components/generator/generatorModulation.vue"
import generatorAdditionally from "@/components/generator/generatorAdditionally.vue"
import constans from "../core/constans";


//import constans from "../core/constans";
export default {
  name: "Home",
  mixins: [bluetooth],
  components: {generatorMain, generatorModulation, generatorAdditionally},
  data() {
    return {
      menu:false,
      tab:null,

    };
  },
  computed: {
    tabModulationVisable(){
      console.log('генератор моде', this.$store.getters.getD35)
      if (this.$store.getters.getD35==='generator_modes.auto'){
        return false
      }else {
        return true
      }
    },

    fabIcon(){
      const status = this.$store.getters.getD03
      console.log('status',status)

      if (status=='OFF'||status=='PAUSE'||status=='init'){
        return "mdi-cursor-pointer"
      }else {
        return "mdi-cached"
      }
    },

    fabClass(){
      const status = this.$store.getters.getD03
      if (status=='OFF'||status=='PAUSE'||status=='init'){
        return ""
      }else {
        return "custom-loader"
      }
    },

    getMenu(){
      const status = this.$store.getters.getD03
      if (status=='OFF'){
        return [
          {title:"main.fabcommands.START"},
        ]
      }
      else if (status=='PAUSE'){
        return [
          {title:"main.fabcommands.RESUME"},
          {title:"main.fabcommands.STOP"},
        ]

      }
      else {
        return [
          {title:"main.fabcommands.STOP"},
          {title:"main.fabcommands.PAUSE"},
        ]
      }


    }
  },
  methods: {
    clikMenuItem(item){
      //console.log('item', item)

      switch (item) {
        case "main.fabcommands.START":

          this.writePort(constans.command.START)
          break
        case "main.fabcommands.PAUSE":
          this.writePort(constans.command.PAUSE)
          break
        case "main.fabcommands.STOP":
          this.writePort(constans.command.STOP)
          break
        case "main.fabcommands.RESUME":
          this.writePort(constans.command.RESUME)
          break
        default:
          break
      }


      this.menu=false
    },

    // ...mapMutations([""]),
    //...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),
    tabChanhe(){
       //console.log('tab change')
    },
    async menuclick() {

      let conn = await this.bluetoothIsConnected()
      if (conn=='OK'){
        this.menu=!this.menu
      }else {
        this.$store.commit('setError','Нет соединения с генератором')
      }
      console.log('conn', conn)
    },

  },
  mounted() {
    //console.log('mounted')
    document.addEventListener(
      /* eslint-disable */
                    typeof cordova !== 'undefined' ? 'deviceready' : 'DOMContentLoaded',
                    () => {
                      //console.log('cordova', cordova)
                      this.bluetoothle = window.bluetoothle
                      //console.log('init ok')
                    }
            )

    //console.log('>>', this.getLocaleList())
    //console.log('locale ', this.getUserLocale())
  }


};

//.getAdapterInfo


</script>
<style>


  .fixed-tabs-bar .v-tabs-bar {
    position: -webkit-sticky;
    position: sticky;
    top: 3.5rem;
    z-index: 2;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
