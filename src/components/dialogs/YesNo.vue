<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $t(input.title) }}</v-card-title>
      <v-card-text class="mt-4">{{ $t(input.message) }}</v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn @click="callBack('cancel')" text>{{
          $t("general.cancel")
        }}</v-btn>
        <v-btn @click="callBack('yes')" color="primary">{{
          $t("general.yes")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["input"],

  data: () => ({
    data1: "",
  }),

  computed: {},
  methods: {
    callBack(ev) {
      this.$emit("callback", { answer: ev, data: this.input });
    },
  },
  created() {
    // console.log("data "+this.Data)
  },
};
</script>
