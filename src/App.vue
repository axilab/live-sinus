<template>
  <v-app>

    <v-navigation-drawer app
                         v-model="drawer"
                         absolute
                         temporary

    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            LiveSinus
          </v-list-item-title>
          <v-list-item-subtitle>
            ver 1.0
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-list-item
              v-for="item in menu"
              :key="item.title"
              :to="item.url"
      >
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="headline text-uppercase">
        <span>Live</span>
        <span class="font-weight-light">Sinus | {{pageName}}</span>
      </v-toolbar-title>
      <v-spacer/>

    </v-app-bar>

    <v-main>
        <router-view/>
    </v-main>

    <v-footer app> {{$t("main.statusTitle")}}: {{ $t(getStatus)  }} </v-footer>

  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import { mapGetters } from "vuex";
import Db from "@/core/Db"

export default {
  name: "App",

  components: {
    //HelloWorld,
  },

  data: () => ({
    drawer: false,
    menu: [
            {title: 'menu.home', icon:'mdi-home', url: {name: 'Home'}},
            {title: 'menu.settings', icon:'mdi-cog ', url: {name: 'Settings'}},
            {title: 'menu.about', icon:'mdi-information', url: {name: 'About'}},
            {title: 'menu.debug', icon:'mdi-bugs', url: {name: 'Debug'}},
    ]
  }),

  computed:{
    ...mapGetters(["getStatus"]),
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

    // methods: {
    //   init() {
    //
    //   },
    // },


  },
  async created() {

    this.$store.commit('setDb', new Db())
      const db = this.$store.getters.getDb
    //await db.dropTable('pref')
      const theme = await db.getPref('theme','no-value')
      if (theme==='dark') this.$vuetify.theme.dark = true


    this.$store.commit('appLoadSettings')

    if (this.$route.path !== "/home") {
      this.$router.push({ name: "Home" });
    }
  },

};
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>
