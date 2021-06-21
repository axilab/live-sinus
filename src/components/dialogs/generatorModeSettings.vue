<template>
  <v-card>
    <v-dialog v-if="DialogPowerShow" v-model="DialogPowerShow" scrollable>
      <power-select
        :input="DialogData"
        @Callback="DialogPowerCallback($event)"
      ></power-select>
    </v-dialog>

    <v-dialog
      v-if="Dialognum2selectShow"
      v-model="Dialognum2selectShow"
      scrollable
    >
      <num2select
        :input="DialogData"
        @Callback="DialogTimerCallback($event)"
      ></num2select>
    </v-dialog>

    <v-card-title>{{ $t(title) }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-container fluid>
        <v-row class="mt-n8">
          <v-col class="d-flex" cols="12">
            <v-switch
              v-model="switchFibonachi"
              :label="$t('generatorMode.fibonachi')"
            ></v-switch>
          </v-col>
        </v-row>

        <v-row class="mt-n6">
          <v-col class="d-flex" cols="12">
            <v-select
              v-model="listMode"
              :items="$t('generatorMode.modes')"
              :label="$t('generatorMode.selectTitle')"
              item-text="value"
              item-value="key"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mt-n10">
          <v-col class="d-flex" cols="12">
            <v-select
              v-model="listStep"
              :items="$t('generatorMode.stepModes')"
              :label="$t('generatorMode.stepTitle')"
              item-text="text"
              item-value="id"
            ></v-select>
          </v-col>
        </v-row>

        <div v-if="listStep !== '0'">
          <v-row class="mt-n8">
            <v-col class="d-flex" cols="12">
              {{ $t("generatorMode.stepsPower") }}
            </v-col>
          </v-row>

          <v-row class="mt-n6">
            <v-col class="d-flex" cols="4">
              <v-chip color="green" text-color="white" @click="setPowerSet(1)"
                >{{ power1 }} ma</v-chip
              >
            </v-col>
            <v-col class="d-flex" cols="4">
              <v-chip color="orange" text-color="white" @click="setPowerSet(2)"
                >{{ power2 }} ma</v-chip
              >
            </v-col>
            <v-col class="d-flex" cols="4">
              <v-chip color="red" text-color="white" @click="setPowerSet(3)"
                >{{ power3 }} ma</v-chip
              >
            </v-col>
          </v-row>

          <div v-if="listStep == '1'">
            <v-row class="mt-0">
              <v-col class="d-flex" cols="12">
                {{ $t("generatorMode.timeWork") }} {{ steps }}:
              </v-col>
            </v-row>

            <v-row class="mt-n8">
              <v-col class="d-flex" cols="12">
                <v-range-slider
                  disabled
                  v-model="stepMode1Power"
                  min="0"
                  max="100"
                ></v-range-slider>
              </v-col>
            </v-row>
          </div>

          <div v-if="listStep == '2'">
            <v-row class="mt-n4">
              <v-col class="d-flex" cols="12">
                {{ $t("generatorMode.stepMode2Timer") }}
              </v-col>
            </v-row>
            <div class="text-center mt-n2">
              <v-chip @click="timerStep2modeClick" class="ma-2">
                {{ timer2 }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" @click="clickSelect">
        {{ $t("generatorMode.apply") }}
      </v-btn>
      <v-btn color="blue darken-1" text @click="clickClose">
        {{ $t("settings.selectDeviceDialogButtonCancel") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import util from "../core/util";
import powerSelect from "@/components/dialogs/powerSelect";
import num2select from "@/components/dialogs/num2select";
import bluetooth from "@/core/bluetooth";
import util from "@/core/util";

export default {
  name: "stepMode",
  props: ["input"],
  mixins: [bluetooth, util],
  components: { powerSelect, num2select },
  data() {
    return {
      DialogData: null,
      DialogPowerShow: false,
      Dialognum2selectShow: false,

      stepMode1Power: [33, 67],
      switchFibonachi: false,
      listStep: null,
      listMode: null,
      power1: 0,
      power2: 0,
      power3: 0,
      timer2: 0,

      type: null,
      title: null,
    };
  },
  computed: {
    timerStepMode2() {
      return this.timeFormat(Number(this.$store.getters.getD55));
    },
    steps() {
      const st1 = this.stepMode1Power[0];
      const st2 = this.stepMode1Power[1] - this.stepMode1Power[0];
      const st3 = 100 - this.stepMode1Power[1];
      return "" + st1 + "-" + st2 + "-" + st3 + "%";
    },
  },
  methods: {
    DialogPowerCallback(ev) {
      console.log("DialogPowerCallback", ev);
      this.DialogPowerShow = false;
      if (ev == null) {
        return;
      }

      switch (ev.type) {
        case "power1":
          this.power1 = ev.result;
          break;
        case "power2":
          this.power2 = ev.result;
          break;
        case "power3":
          this.power3 = ev.result;
          break;
        default:
          break;
      }
    },
    DialogTimerCallback(ev) {
      this.Dialognum2selectShow = false;
      if (ev != null) {
        this.timer2 = ev.result;
      }
    },
    setPowerSet(step) {
      let power = 0;
      if (step == 1) {
        power = this.power1;
      }
      if (step == 2) {
        power = this.power2;
      }
      if (step == 3) {
        power = this.power3;
      }

      this.DialogData = {
        title: "generatorMode.step" + step + "PowerTitle",
        value: power,
        type: "power" + step,
      };
      //this.DialogPowerShow = true;
    },

    timerStep2modeClick() {
      this.DialogData = {
        value: this.timer2,
        type: "stepTimer",
        title: this.$t("generatorMode.stepMode2TimerTitle"),
      };
      //this.Dialognum2selectShow = true;
    },

    clickClose() {
      this.$emit("Callback", { result: null });
    },

    clickSelect() {
      const st1 = this.stepMode1Power[0];
      const st2 = this.stepMode1Power[1] - this.stepMode1Power[0];

      this.$emit("Callback", {
        result: {
          fibonachi: this.switchFibonachi,
          generatorMode: this.listMode,
          stepMode: this.listStep,
          power1: this.power1,
          power2: this.power2,
          power3: this.power3,
          percent1: st1,
          percent2: st2,
          timer2: this.timer2,
        },
        type: this.type,
      });
    },
  },
  created() {
    this.type = this.input.type;
    this.title = this.input.title;

    this.switchFibonachi =
      String(this.$store.getters.getD62) === "1" ? true : false;

    this.stepMode1Power[0] = Number(this.$store.getters.getD88);
    this.stepMode1Power[1] =
      Number(this.$store.getters.getD88) + Number(this.$store.getters.getD89);

    this.listMode = this.$store.getters.get_D75;
    this.listStep = this.$store.getters.getD53;

    this.power1 = this.$store.getters.getD85;
    this.power2 = this.$store.getters.getD86;
    this.power3 = this.$store.getters.getD87;

    this.timer2 = this.$store.getters.getD55;
  },
};
</script>
