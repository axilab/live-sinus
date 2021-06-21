<template>
  <v-card>
    <v-card-title>
      <v-btn icon v-on:click="clickBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      {{ $t("settings.selectDeviceDialogTitle") }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-radio-group v-model="selectDevice" column>
        <v-radio
          v-for="item in devices"
          :key="item.id"
          :label="item.name + ' (' + item.address + ')'"
          :value="item.address"
        ></v-radio>
      </v-radio-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="clickSelect">{{
        $t("settings.selectDeviceDialogButtonSelect")
      }}</v-btn>
      <v-btn color="primary" text @click="clickBack">{{
        $t("settings.selectDeviceDialogButtonCancel")
      }}</v-btn>
      <div class="flex-grow-1"></div>
    </v-card-actions>
  </v-card>
</template>

<script>
// import util from "../core/util";
export default {
  name: "DeviceSelect",
  props: ["prevDevice"],
  mixins: [],
  components: {},
  data() {
    return {
      selectDevice: null,
    };
  },
  computed: {
    devices() {
      if (this.$store.getters.getDevices == undefined) return [];
      return this.$store.getters.getDevices;
      //console.log('devices', this.$store.getters.getDevices)
      //return this.$store.getters.getDevices
    },
  },
  methods: {
    clickBack() {
      console.log("clickBack()");
      this.$emit("DialogDevicesSelectCallback", { result: null });
    },
    clickSelect() {
      const res = this.devices.find((item) => {
        if (item.address == this.selectDevice) return true;
      });
      this.$emit("DialogDevicesSelectCallback", { result: res });
    },
  },
  created() {
    console.log("DeviceSelect create");
    this.$store.dispatch("bluetoothListBound");
    console.log("prevAddress", this.prevDevice);
    if (this.prevDevice != null) {
      this.selectDevice = this.prevDevice.address;
    }
  },
};
</script>
