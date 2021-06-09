<template>
  <v-card>
    <v-card-title>{{ $t("main.titles.phase_shift") }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <div class="parent_div">
        <Scroller
          :itemSelect="Number(currentValue[0])"
          :itemList="vSign"
          @change="setVal(0, $event)"
          class="cont2"
        ></Scroller>
        <Scroller
          :itemSelect="Number(currentValue[1])"
          :itemList="vList"
          @change="setVal(1, $event)"
          class="cont2"
        ></Scroller>
        <Scroller
          :itemSelect="Number(currentValue[2])"
          :itemList="vList"
          @change="setVal(2, $event)"
          class="cont2"
        ></Scroller>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" @click="clickSelect">
        {{ $t("settings.selectDeviceDialogButtonSelect") }}
      </v-btn>
      <v-btn color="blue darken-1" text @click="clickClose">
        {{ $t("settings.selectDeviceDialogButtonCancel") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Scroller from "@/components/Scroller";
export default {
  components: { Scroller },
  props: ["input"],
  data() {
    return {
      currentValue: [0, 0, 0],
      vSign: [
        { value: 0, name: "+" },
        { value: 1, name: "-" },
      ],
      vList: [
        { value: 0, name: "0" },
        { value: 1, name: "1" },
        { value: 2, name: "2" },
        { value: 3, name: "3" },
        { value: 4, name: "4" },
        { value: 5, name: "5" },
        { value: 6, name: "6" },
        { value: 7, name: "7" },
        { value: 8, name: "8" },
        { value: 9, name: "9" },
      ],
    };
  },
  methods: {
    setVal(idx, val) {
      this.currentValue[idx] = val.val;
    },
    clickClose() {
      this.$emit("Callback", { result: null });
    },
    clickSelect() {
      let p = "+";
      if (this.currentValue[0] == 1) {
        p = "-";
      }
      let val = Number(this.currentValue.join("").slice(-2));
      if (val == 0) {
        this.$emit("Callback", { result: "0.0", type: this.type });
      } else {
        this.$emit("Callback", { result: p + val, type: this.type });
      }
    },
  },

  created() {
    this.type = this.input.type;
    let val = parseInt(this.input.value);
    if (val < 0) {
      this.currentValue[0] = 1;
    } else {
      this.currentValue[0] = 0;
    }
    val = "00" + Math.abs(val).toString().slice(-2);
    this.currentValue[1] = Number(val.slice(-2).charAt(0));
    this.currentValue[2] = Number(val.slice(-2).charAt(1));
  },
};
</script>
<style>
.parent_div {
  display: flex;
  flex-wrap: wrap;
}
.cont {
  flex: 1 1 25%;
  width: 800px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
