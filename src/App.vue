<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="logo.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title"> LiveSinus </v-list-item-title>
          <v-list-item-subtitle> ver {{ appVersion }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item v-for="item in menu" :key="item.title" :to="item.url">
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline text-uppercase">
        <span>Live</span>
        <span class="font-weight-light">Sinus | {{ pageName }}</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn @click.native="closeError" dark>Закрыть</v-btn>
      </v-snackbar>
    </template>

    <v-footer app> {{ $t("main.statusTitle") }}: {{ $t(getStatus) }} </v-footer>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import bluetooth from "./core/bluetooth";
//import constans from "./core/constans";
// import { mapGetters } from "vuex";

/* eslint-disable */


export default {
  name: "App",
  mixins: [bluetooth],
  components: {
  },

  data: () => ({
    timerId: null,
    drawer: false,
    menu: [
            {title: 'menu.home', icon:'mdi-home', url: {name: 'Home'}},
            {title: 'menu.settings', icon:'mdi-cog ', url: {name: 'Settings'}},
            {title: 'menu.about', icon:'mdi-information', url: {name: 'About'}},
            // {title: 'menu.debug', icon:'mdi-bugs', url: {name: 'Debug'}},
    ]
  }),

  methods:{

    closeError () {
      this.$store.commit('clearError')
    },

    async onDeviceReady() {
        this.$store.commit('dbInit')
        const db = this.$store.getters.getDb


        const theme = await db.getPref('theme','no-value')

        if (theme==='dark') this.$vuetify.theme.dark = true
        this.$store.commit('appLoadSettings')

      const device = await db.getPref('device','{"adrress":"00:00:00:00", "name":"not select"}')
      console.log('select-device', device)

        let res = await this.getBluetoothEnable().catch(async err =>  {
          let enableBle = await this.bluetoothEnable()
          if (enableBle=='OK'){
            let conn = await this.bluetoothIsConnected()
            if (conn!=='OK'){
              this.openBluetoothPort()
            }
          }
        })
        if (res=='OK'){//Bluetooth ON
          console.log('Bluetooth ON')
          let conn = await this.bluetoothIsConnected()
          if (conn!=='OK'){
            this.openBluetoothPort().then(()=>{this.deviceInit()})
          }else{
            console.log('port is open')
            this.deviceInit()
          }
        }


    },
    async onPause(){
      console.log('onPAUSE')
      this.stopTimer()
      let res = await this.closeBluetoothPort().catch(err=>console.log('error:', err))
      console.log('res', res)
      this.$store.commit('setStateDevice',{command:'03', data:'-1'})

    },

    async onResume(){
      console.log('onRESUME')
      let conn = await this.bluetoothIsConnected()
      if (conn!=='OK'){
        console.log('generator disconnect')
        this.openBluetoothPort()
      }
      this.startTimer()
    },
    async timer(){
      if (await this.bluetoothIsConnected()!=='OK'){
        this.$store.commit('setStateDevice',{command:'03', data:'-1'})
        this.openBluetoothPort()
      }
    },
    startTimer(){
      this.timerId = setInterval(() => this.timer(), 5000);
    },
    stopTimer(){
      if (this.timerId!=null){
        clearInterval(this.timerId)
        this.timerId = null
      }
    }
  },
  computed:{
    // ...mapGetters(["getStatus"]),
    appVersion() {
      return this.$store.getters.appVersion;
    },

    getStatus(){
      return "main.status."+this.$store.getters.getD03
    },
    error () {
      return this.$store.getters.error
    },
    pageName(){
      switch (this.$route.name) {
        case "Home":
          return this.$t('menu.home')
        case "Settings":
          return this.$t('menu.settings')
        case "About":
          return this.$t('menu.about')
        case "Debug":
          return this.$t('menu.debug')
        default:
          return ""
      }

    },

  },
  async mounted() {

  },

  async created() {
    console.log('!!created!!')
    this.startTimer()
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener("pause", this.onPause, false);
    document.addEventListener("resume", this.onResume, false);

    if (this.$route.path !== "/home") {
      this.$router.push({ name: "Home" });
    }
  },

};
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>
