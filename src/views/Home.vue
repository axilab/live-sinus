<template>
  <div class="home">

    <v-dialog v-model="menu" width="500"
    >

      <v-card>

        <v-card @click="clikMenuItem($event, i)"
                v-for="(item, i) in getMenu"
                :key="item.title"
                link

                class="mx-auto"
        >
          <v-card-title>{{item.title}}</v-card-title>
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


    <v-tabs v-model="tab" v-on:change="tabChanhe">
      <v-tab key="general">{{$t("main.tabs.main")}}</v-tab>
      <v-tab key="modulation">{{$t("main.tabs.modulation")}}</v-tab>
      <v-tab key="addirionally">{{$t("main.tabs.addirionally")}}</v-tab>

      <v-tab-item>
        <generator-main></generator-main>
      </v-tab-item>

      <v-tab-item>
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
import { mapActions } from "vuex";
import util from "@/core/util";
import bluetooth from "@/core/bluetooth";
import generatorMain from "@/components/generator/generatorMain.vue"
import generatorModulation from "@/components/generator/generatorModulation.vue"
import generatorAdditionally from "@/components/generator/generatorAdditionally.vue"


// import constans from "../core/constans";
export default {
  name: "Home",
  mixins: [util, bluetooth],
  components: {generatorMain, generatorModulation, generatorAdditionally},
  data() {
    return {
      menu:false,
      tab:null,

      data: 'test data',
      fabClass: "custom-loader",
      fabIcon: "mdi-cached",
    };
  },
  computed: {
    getMenu(){
      return [
              {title:"Включить"},
      ]
    }
  },
  methods: {
    clikMenuItem(ev, i){
      console.log('ev',ev,'i',i)

      this.menu=false
    },

    // ...mapMutations([""]),
     ...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),
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
