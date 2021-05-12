<template>
  <div class="home">

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
      <v-btn bottom color="pink" dark fab fixed right @click="menu">
        <v-icon :class="fabClass">{{ fabIcon }}</v-icon>
      </v-btn>
    </v-fab-transition>

  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions } from "vuex";
import util from "../core/util";

import generatorMain from "@/components/generator/generatorMain.vue"
import generatorModulation from "@/components/generator/generatorModulation.vue"
import generatorAdditionally from "@/components/generator/generatorAdditionally.vue"


// import constans from "../core/constans";
export default {
  name: "Home",
  mixins: [util],
  components: {generatorMain, generatorModulation, generatorAdditionally},
  data() {
    return {
      tab:null,

      data: 'test data',
      fabClass: "custom-loader",
      fabIcon: "mdi-cached",
    };
  },
  // computed: mapGetters(["getAllLogs"]),
  methods: {
    // ...mapMutations([""]),
     ...mapActions(["bluetoothInitize", "bluetoothScanDevices", "bluetoothListBound", "openPort", "closePort", "writePort", "readPort"]),
    tabChanhe(){
       //console.log('tab change')
    },
    menu() {
      console.log("menu");
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
