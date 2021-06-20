<template>
  <v-card class="mx-auto my-12">
    <v-img class="ma-3" src="logo.png" />

    <v-card-title>{{ $t("about.title") }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        {{ $t("about.description") }}
      </v-row>
      <v-row align="center" class="mx-0">
        {{ $t("about.version_title") }} {{ appVersion }}
      </v-row>
      <v-row align="center" class="mx-0">
        {{ $t("about.version_date_title") }} {{ appDate }}
      </v-row>

      <v-row align="center" class="mx-0">
        <a target="_blank" href="https://live-sinus.com"
          >https://live-sinus.com</a
        >
      </v-row>

      <v-row align="center" class="mx-0">
        <a target="_blank" href="https://vk.com/live_sinus"
          >https://vk.com/live_sinus</a
        >
      </v-row>

      <v-btn
        color="blue darken-1"
        outlined
        dark
        @click="mailDevelop"
        class="mt-4"
      >
        Написать разработчику
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
// import {mapGetters} from "vuex";

export default {
  name: "Home",

  components: {},
  data() {
    return {};
  },
  methods: {
    mailDevelop() {
      let url = "mailto:axilab@gmail.com";
      let link_url = document.createElement("a");
      link_url.target = "_blank";
      link_url.href = url;
      document.body.appendChild(link_url);
      link_url.click();
      document.body.removeChild(link_url);
    },
  },
  computed: {
    appVersion() {
      return this.$store.getters.appVersion;
    },
    appDate() {
      return this.$store.getters.appDate;
    },
  },
  //computed: mapGetters(["getAllLogs"]),
  //methods: {}
};
</script>
