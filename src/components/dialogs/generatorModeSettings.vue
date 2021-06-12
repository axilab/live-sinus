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
              @change="switchFibonachiChange"
              :label="$t('generatorMode.fibonachi')"
            ></v-switch>
          </v-col>
        </v-row>

        <v-row class="mt-n12">
          <v-col class="d-flex" cols="12">
            <v-select
              v-model="listMode"
              :items="$t('generatorMode.modes')"
              :label="$t('generatorMode.selectTitle')"
              item-text="value"
              item-value="key"
              @change="listModeChange"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mt-n10">
          <v-col class="d-flex" cols="12">
            <v-select
              v-model="listStep"
              :items="$t('generatorMode.stepModes')"
              :label="$t('generatorMode.stepTitle')"
              item-text="value"
              item-value="key"
              @change="listStepChange"
            ></v-select>
          </v-col>
        </v-row>

        <div v-if="stepMode !== '0'">
          <div v-if="stepMode == '1'">
            <v-row class="mt-n8">
              <v-col class="d-flex" cols="12">
                {{ $t("generatorMode.stepsPower") }}
              </v-col>
            </v-row>

            <v-row class="mt-n6">
              <v-col class="d-flex" cols="4">
                <v-chip color="green" text-color="white" @click="setPowerSet(1)"
                  >{{ powerStep1 }} ma</v-chip
                >
              </v-col>
              <v-col class="d-flex" cols="4">
                <v-chip
                  color="orange"
                  text-color="white"
                  @click="setPowerSet(2)"
                  >{{ powerStep2 }} ma</v-chip
                >
              </v-col>
              <v-col class="d-flex" cols="4">
                <v-chip color="red" text-color="white" @click="setPowerSet(3)"
                  >{{ powerStep3 }} ma</v-chip
                >
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex" cols="12">
                {{ $t("generatorMode.timeWork") }} {{ steps }}:
              </v-col>
            </v-row>

            <v-row class="mt-n8">
              <v-col class="d-flex" cols="12">
                <v-range-slider
                  v-model="stepMode1Power"
                  hint="Im a hint"
                  min="0"
                  max="100"
                ></v-range-slider>
              </v-col>
            </v-row>
          </div>

          <div v-if="stepMode == '2'">
            <v-row class="mt-n8">
              <v-col class="d-flex" cols="12">
                Таймер переключения ступеней:
              </v-col>
            </v-row>
            <div class="text-center mt-n2">
              <v-chip @click="timerStep2modeClick" class="ma-2">
                {{ timerStepMode2 }}
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

    powerStep1() {
      return this.$store.getters.getD85;
    },

    powerStep2() {
      return this.$store.getters.getD86;
    },

    powerStep3() {
      return this.$store.getters.getD87;
    },
    generatorMode() {
      return this.$store.getters.get_D75;
    },
    stepMode() {
      return this.$store.getters.getD53;
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
          this.setGeneratorStepPowerMin(ev.result);
          break;
        case "power2":
          this.setGeneratorStepPowerMid(ev.result);
          break;
        case "power3":
          this.setGeneratorStepPowerMax(ev.result);
          break;
        default:
          break;
      }
    },
    DialogTimerCallback(ev) {
      this.Dialognum2selectShow = false;
      if (ev != null) {
        this.setGeneratorStepPower(ev.result);
      }
    },
    setPowerSet(step) {
      let power = 0;
      if (step == 1) {
        power = this.$store.getters.getD85;
      }
      if (step == 2) {
        power = this.$store.getters.getD86;
      }
      if (step == 3) {
        power = this.$store.getters.getD87;
      }

      this.DialogData = {
        title: "generatorMode.step" + step + "PowerTitle",
        value: power,
        type: "power" + step,
      };
      this.DialogPowerShow = true;
    },

    listStepChange() {
      this.setGeneratorPowerStepMode(this.listStep, false);
    },
    listModeChange() {
      this.setGeneratorMode(this.listMode, false);
    },
    switchFibonachiChange() {
      let val = this.switchFibonachi ? "1" : "0";
      let old = String(this.$store.getters.getD61);
      if (val !== old) {
        this.setGeneratorFibonchi(val);
      }
    },

    timerStep2modeClick() {
      this.DialogData = {
        value: this.$store.getters.getD55,
        type: "stepTimer",
        title: this.$t("generatorMode.stepMode2TimerTitle"),
      };
      this.Dialognum2selectShow = true;
    },

    clickClose() {
      this.$emit("Callback", { result: null });
    },

    clickSelect() {
      this.$emit("Callback", {
        result: "ok",
        type: this.type,
      });
    },
  },
  created() {
    this.type = this.input.type;
    this.title = this.input.title;

    this.switchFibonachi =
      String(this.$store.getters.getD61) === "1" ? true : false;

    this.stepMode1Power[0] = Number(this.$store.getters.getD88);
    this.stepMode1Power[1] =
      Number(this.$store.getters.getD88) + Number(this.$store.getters.getD89);

    this.listMode = this.$store.getters.get_D75;
    this.listStep = this.$store.getters.getD53;
  },
};
</script>
