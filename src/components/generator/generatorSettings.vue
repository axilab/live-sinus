<template>
  <div>
    <v-dialog v-if="DialogSelectShow" v-model="DialogSelectShow" scrollable>
      <radio-select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></radio-select>
    </v-dialog>

    <v-dialog v-if="DialogTimerShow" v-model="DialogTimerShow" scrollable>
      <timer-select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></timer-select>
    </v-dialog>

    <v-dialog v-if="DialogPowerShow" v-model="DialogPowerShow" scrollable>
      <power-select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></power-select>
    </v-dialog>

    <v-dialog v-model="DialogYesNoShow" width="500">
      <dialog-yes-no
        :input="DialogData"
        @callback="
          DialogCallback({
            result: $event,
            type: 'generator_settings.factory_settings',
          })
        "
      ></dialog-yes-no>
    </v-dialog>

    <v-dialog
      v-if="DialogPhaseShiftShow"
      v-model="DialogPhaseShiftShow"
      scrollable
    >
      <num3select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></num3select>
    </v-dialog>

    <v-dialog
      v-if="Dialognum2selectShow"
      v-model="Dialognum2selectShow"
      scrollable
    >
      <num2select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></num2select>
    </v-dialog>

    <v-dialog v-if="DialogNum3_1Show" v-model="DialogNum3_1Show" scrollable>
      <num3_1Select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></num3_1Select>
    </v-dialog>

    <v-dialog
      v-if="DialogfrequencyShow"
      v-model="DialogfrequencyShow"
      scrollable
    >
      <num3_2Select
        :input="DialogData"
        @Callback="DialogCallback($event)"
      ></num3_2Select>
    </v-dialog>

    <p>{{ $t("settings.firmwareVer") }} {{ generatorVer }}</p>

    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="clickSetting(item)"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
          <v-list-item-subtitle>{{ subtitle(item.text) }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group color="primary" v-if="generatorMode == '2'">
      <v-list-item>
        <template>
          <v-list-item-action>
            <v-checkbox
              v-model="selectedAmperageStabilization"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content
            @click="
              selectedAmperageStabilization = !selectedAmperageStabilization
            "
          >
            <v-list-item-title>{{
              $t("main.settingsList.amperage_stabilization")
            }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>

    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ $t("generator_settings.step_mode") }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in stepItems"
                :key="i"
                @click="clickSetting(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                  <v-list-item-subtitle>{{
                    subtitle(item.text)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                      v-model="StepMode2"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content @click="StepMode2 = !StepMode2">
                    <v-list-item-title>{{
                      $t("generator_settings.activateStepMode2")
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ $t("generator_settings.timers") }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in timers"
                :key="i"
                @click="clickSetting(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                  <v-list-item-subtitle>{{
                    subtitle(item.text)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ $t("generator_settings.power") }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in powers"
                :key="i"
                @click="clickSetting(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                  <v-list-item-subtitle>{{
                    subtitle(item.text)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-list-item>
        <template>
          <v-list-item-action>
            <v-checkbox
              v-model="selectFibonachiOn"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content @click="selectFibonachiOn = !selectFibonachiOn">
            <v-list-item-title>{{
              $t("main.settingsList.fibonachi")
            }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>

      <v-expansion-panel
        :disabled="selectFibonachiOn"
        v-if="generatorMode != '0'"
      >
        <v-expansion-panel-header>
          {{ $t("generator_settings.fixing_modulation") }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item>
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                      v-model="checkboxModulation"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content
                    @click="checkboxModulation = !checkboxModulation"
                  >
                    <v-list-item-title>{{
                      $t("generator_settings.modulation")
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>

            <v-divider></v-divider>
            <p>{{ $t("generator_settings.am_modulation") }}</p>
            <v-list-item-group color="primary">
              <v-list-item
                :disabled="!checkboxModulation || selectFibonachiOn"
                v-for="(item, i) in items2"
                :key="i"
                @click="clickSetting(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                  <v-list-item-subtitle>{{
                    subtitle(item.text)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

            <v-divider></v-divider>
            <p>{{ $t("generator_settings.fm_modulation") }}</p>
            <v-list-item-group color="primary">
              <v-list-item
                :disabled="!checkboxModulation || selectFibonachiOn"
                v-for="(item, i) in items3"
                :key="i"
                @click="clickSetting(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
                  <v-list-item-subtitle>{{
                    subtitle(item.text)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                v-model="checkboxSoundSignal"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content
              @click="checkboxSoundSignal = !checkboxSoundSignal"
            >
              <v-list-item-title>{{
                $t("generator_settings.sound_signal")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                v-model="checkboxErrorOff"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="checkboxErrorOff = !checkboxErrorOff">
              <v-list-item-title>{{
                $t("generator_settings.error_off")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                v-model="checkboxIncubator"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content
              @click="checkboxIncubator = !checkboxIncubator"
            >
              <v-list-item-title>{{
                $t("generator_settings.mode_incubator")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item @click="clickSetting(factory_settings)">
          <v-list-item-icon>
            <v-icon v-text="factory_settings.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t(factory_settings.text)"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-html="factory_settings.subtitle"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import radioSelect from "@/components/dialogs/radioSelect";
import timerSelect from "@/components/dialogs/timerSelect";
import powerSelect from "@/components/dialogs/powerSelect";
import dialogYesNo from "@/components/dialogs/YesNo";
import num3select from "@/components/dialogs/num3select";
import num2select from "@/components/dialogs/num2select";
import num3_1Select from "@/components/dialogs/num3_1Select";
import num3_2Select from "@/components/dialogs/num3_2Select";

import bluetooth from "@/core/bluetooth";
import util from "@/core/util";
import constans from "../../core/constans";

export default {
  name: "GeneratorSetting",
  mixins: [bluetooth, util],
  components: {
    radioSelect,
    timerSelect,
    powerSelect,
    dialogYesNo,
    num3select,
    num2select,
    num3_1Select,
    num3_2Select,
  },
  data() {
    return {
      checkboxIncubator: false,
      checkboxSoundSignal: false,
      checkboxErrorOff: false,
      checkboxModulation: false,
      selectFibonachiOn: false,

      DialogSelectShow: false,
      DialogTimerShow: false,
      DialogPowerShow: false,
      DialogYesNoShow: false,
      DialogPhaseShiftShow: false,
      Dialognum2selectShow: false,
      DialogNum3_1Show: false,
      DialogData: null,
      DialogfrequencyShow: false,

      panel: [],
      selectedAmperageStabilization: false,
      StepMode2: false,

      timers: [
        { text: "generator_settings.timer_off_1", icon: "mdi-cog-outline" },
        { text: "generator_settings.timer_off_2", icon: "mdi-cog-outline" },
        { text: "generator_settings.timer_off_3", icon: "mdi-cog-outline" },
        {
          text: "generator_settings.period_between_on",
          icon: "mdi-cog-outline",
        },
      ],

      powers: [
        { text: "generator_settings.rms_out_min", icon: "mdi-cog-outline" },
        { text: "generator_settings.rms_out_mid", icon: "mdi-cog-outline" },
        { text: "generator_settings.rms_out_max", icon: "mdi-cog-outline" },
      ],

      stepItems: [
        { text: "generator_settings.stepMode", icon: "mdi-cog-outline" },
        { text: "generator_settings.step1Power", icon: "mdi-cog-outline" },
        { text: "generator_settings.step2Power", icon: "mdi-cog-outline" },
        { text: "generator_settings.step3Power", icon: "mdi-cog-outline" },
        { text: "generator_settings.percentStep1", icon: "mdi-cog-outline" },
        { text: "generator_settings.percentStep2", icon: "mdi-cog-outline" },
        { text: "generator_settings.percentStep3", icon: "mdi-cog-outline" },
        { text: "generator_settings.timerStepMode2", icon: "mdi-cog-outline" },
      ],

      factory_settings: {
        text: "generator_settings.factory_settings",
        subtitle: "",
        icon: "mdi-exclamation",
      },
    };
  },
  computed: {
    items() {
      if (this.generatorMode === "0") {
        //Режим авто
        return [
          {
            text: "generator_settings.generator_mode",
            icon: "mdi-cog-outline",
          },
          { text: "main.settingsList.waveform", icon: "mdi-cog-outline" },
          {
            text: "generator_settings.Searching_resonance_min",
            icon: "mdi-cog-outline",
          },
          {
            text: "generator_settings.Searching_resonance_max",
            icon: "mdi-cog-outline",
          },
        ];
      }

      if (this.generatorMode === "1") {
        //Режим профи
        return [
          {
            text: "generator_settings.generator_mode",
            icon: "mdi-cog-outline",
          },
          { text: "main.settingsList.waveform", icon: "mdi-cog-outline" },
          {
            text: "generator_settings.Searching_resonance_min",
            icon: "mdi-cog-outline",
          },
          {
            text: "generator_settings.Searching_resonance_max",
            icon: "mdi-cog-outline",
          },
          { text: "generator_settings.phase_shift", icon: "mdi-cog-outline" },
          {
            text: "generator_settings.frequency_autotuning",
            icon: "mdi-cog-outline",
          },
        ];
      }
      if (this.generatorMode === "2") {
        //Режим инженерный
        let arr = [
          {
            text: "generator_settings.generator_mode",
            icon: "mdi-cog-outline",
          },
          { text: "main.settingsList.frequency", icon: "mdi-cog-outline" },
          { text: "main.settingsList.waveform", icon: "mdi-cog-outline" },
          { text: "generator_settings.phase_shift", icon: "mdi-cog-outline" },
        ];
        if (!this.selectedAmperageStabilization) {
          arr.push({
            text: "generator_settings.frequency_autotuning",
            icon: "mdi-cog-outline",
          });
        }
        return arr;
      }
      return [];
    },

    generatorMode() {
      console.log("generatorMode", this.$store.getters.get_D35);
      return this.$store.getters.get_D35;
    },

    modeAmperageStabilization() {
      return this.$store.getters.getD78;
    },

    modeStepMode2() {
      return this.$store.getters.getD56;
    },

    items2() {
      if (
        this.$store.getters.getD29 === "0" ||
        this.$store.getters.getD29 === "1" ||
        this.$store.getters.getD29 === "2"
      ) {
        return [
          { text: "generator_settings.am_form", icon: "mdi-cog-outline" },
          { text: "generator_settings.am_depth", icon: "mdi-cog-outline" },
          { text: "generator_settings.am_frequency", icon: "mdi-cog-outline" },
        ];
      } else {
        return [
          { text: "generator_settings.am_form", icon: "mdi-cog-outline" },
          { text: "generator_settings.am_dutyCycle", icon: "mdi-cog-outline" },
          { text: "generator_settings.am_depth", icon: "mdi-cog-outline" },
          { text: "generator_settings.am_frequency", icon: "mdi-cog-outline" },
        ];
      }
    },

    items3() {
      if (
        this.$store.getters.getD33 === "0" ||
        this.$store.getters.getD33 === "1" ||
        this.$store.getters.getD33 === "2"
      ) {
        return [
          { text: "generator_settings.fm_form", icon: "mdi-cog-outline" },
          { text: "generator_settings.fm_deviation", icon: "mdi-cog-outline" },
          { text: "generator_settings.fm_frequency", icon: "mdi-cog-outline" },
        ];
      } else {
        return [
          { text: "generator_settings.fm_form", icon: "mdi-cog-outline" },
          { text: "generator_settings.fm_dutyCycle", icon: "mdi-cog-outline" },
          { text: "generator_settings.fm_deviation", icon: "mdi-cog-outline" },
          { text: "generator_settings.fm_frequency", icon: "mdi-cog-outline" },
        ];
      }
    },

    compCheckboxIncubator() {
      return this.$store.getters.getD80;
    },
    compCheckboxSoundSignal() {
      return this.$store.getters.getD38;
    },
    compCheckboxErrorOff() {
      return this.$store.getters.getD45;
    },

    compCheckboxModulation() {
      return this.$store.getters.getD26;
    },
    generatorVer() {
      return this.$store.getters.getD02;
    },
  },
  watch: {
    modeStepMode2(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.StepMode2) {
        this.StepMode2 = val;
      }
    },

    StepMode2(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD56);
      if (val !== old) {
        this.setGeneratorStepModeButtonPower(val);
      }
    },

    modeAmperageStabilization(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.selectedAmperageStabilization) {
        this.selectedAmperageStabilization = val;
      }
    },
    selectedAmperageStabilization(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD78);
      if (val !== old) {
        this.setAmperageStabilization(val, true);
      }
    },

    selectFibonachiOn(newValue) {
      this.panel = [];
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD61);
      if (val !== old) {
        this.setGeneratorFibonchi(val, true);
      }
    },

    compCheckboxIncubator(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.checkboxIncubator) {
        this.checkboxIncubator = val;
      }
    },
    compCheckboxSoundSignal(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.checkboxSoundSignal) {
        this.checkboxSoundSignal = val;
      }
    },
    compCheckboxErrorOff(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.checkboxErrorOff) {
        this.checkboxErrorOff = val;
      }
    },
    compCheckboxModulation(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.checkboxModulation) {
        this.checkboxModulation = val;
      }
    },

    checkboxIncubator(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD80);
      if (val !== old) {
        this.setIncubator(val);
      }
    },

    checkboxSoundSignal(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD38);
      if (val !== old) {
        this.setGeneratorSoundOn(val, true);
      }
    },

    checkboxErrorOff(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD45);
      if (val !== old) {
        this.setErrorOff(val, true);
      }
    },

    checkboxModulation(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD26);
      if (val !== old) {
        this.setGeneratorModulation(val, true);
      }
    },
  },
  methods: {
    async DialogCallback(ev) {
      console.log("DialogCallback", ev);
      if (ev !== null) {
        const res = ev.result;
        const type = ev.type;
        console.log("type", type, "res", res);
        switch (ev.type) {
          case "frequency":
            console.log("main.settingsList.frequency", ev.result);
            this.setGeneratorFrequency(ev.result, true);
            this.getGeneratorData("76");
            break;
          case "main.settingsList.waveform":
            this.setGeneratorWaveForm(ev.result, true);
            this.getGeneratorData("10");
            break;
          case "main.titles.generator_mode":
            this.setGeneratorMode(ev.result, true);
            this.getGeneratorData("35"); // Режим работы
            break;
          case "generator_settings.timer_off_1":
            this.setGeneratorTimerOff1(ev.result);
            this.getGeneratorData("21"); // Таймер откл. №1
            break;
          case "generator_settings.timer_off_2":
            this.setGeneratorTimerOff2(ev.result);
            this.getGeneratorData("22"); // Таймер откл. №2
            break;
          case "generator_settings.timer_off_3":
            this.setGeneratorTimerOff3(ev.result);
            this.getGeneratorData("23"); // Таймер откл. №3
            break;
          case "generator_settings.period_between_on":
            console.log("generator_settings.period_between_on", ev.result);
            this.setGeneratorTimerOn(ev.result, true);
            this.getGeneratorData("25");
            break;
          case "generator_settings.rms_out_min":
            this.setGeneratorMinMa(ev.result);
            this.getGeneratorData("15");
            break;
          case "generator_settings.rms_out_mid":
            this.setGeneratorMidMa(ev.result);
            this.getGeneratorData("16");
            break;
          case "generator_settings.rms_out_max":
            this.setGeneratorMaxMa(ev.result);
            this.getGeneratorData("17");
            break;
          case "generator_settings.Searching_resonance_min":
            this.setGeneratorStartSearchResonance(ev.result);
            this.getGeneratorData("46");
            break;
          case "generator_settings.Searching_resonance_max":
            this.setGeneratorFinishSearchResonance(ev.result);
            this.getGeneratorData("47");
            break;
          case "generator_settings.phase_shift":
            this.setGeneratorPhaseShift(ev.result, true);
            this.getGeneratorData("19");
            break;
          case "generator_settings.frequency_autotuning":
            this.setFrequencyAutotuning(ev.result, true);
            this.getGeneratorData("37");
            break;
          case "generator_settings.am_form":
            this.setGeneratorAmForm(ev.result, true);
            this.getGeneratorData("29");
            break;
          case "generator_settings.am_dutyCycle":
            this.setGeneratorDutyCycleAM(String(ev.result), true);
            this.getGeneratorData("30");
            break;
          case "generator_settings.am_depth":
            this.setGeneratorAmDepth(String(ev.result), true);
            this.getGeneratorData("27");
            break;
          case "generator_settings.am_frequency":
            this.setGeneratorAmFrequency(ev.result, true);
            this.getGeneratorData("28");
            break;
          case "generator_settings.fm_form":
            this.setGeneratorFmForm(ev.result, true);
            this.getGeneratorData("33");
            break;
          case "generator_settings.fm_dutyCycle":
            this.setGeneratorDutyCycleFM(String(ev.result), true);
            this.getGeneratorData("34");
            break;
          case "generator_settings.fm_deviation":
            this.setGeneratorFmDeviation(ev.result, true);
            this.getGeneratorData("31");
            break;
          case "generator_settings.fm_frequency":
            this.setGeneratorFmFrequency(ev.result, true);
            this.getGeneratorData("32");
            break;
          case "generator_settings.factory_settings":
            console.log("factory_settings", ev.result);
            if (ev.result.answer === "yes") {
              this.setDefaultEEPROM();
              await this.sleep(1000);
              this.getEEPROMAllData();
            }
            break;
          case "generator_settings.stepMode":
            this.setGeneratorPowerStepMode(ev.result, true);
            break;
          case "generator_settings.step1Power":
            this.setGeneratorStepPowerMin(ev.result);
            break;
          case "generator_settings.step2Power":
            this.setGeneratorStepPowerMid(ev.result);
            break;
          case "generator_settings.step3Power":
            this.setGeneratorStepPowerMax(ev.result);
            break;
          case "generator_settings.percentStep1":
            this.setGeneratorStep1Percent(ev.result);
            break;
          case "generator_settings.percentStep2":
            this.setGeneratorStep2Percent(ev.result);
            break;
          case "generator_settings.timerStepMode2":
            this.setGeneratorStepPower(ev.result);
            break;
        }
        //this.getEEPROMAllData()
      }

      this.DialogSelectShow = false;
      this.DialogTimerShow = false;
      this.DialogPowerShow = false;
      this.DialogYesNoShow = false;
      this.DialogPhaseShiftShow = false;
      this.Dialognum2selectShow = false;
      this.DialogNum3_1Show = false;
      this.DialogfrequencyShow = false;
    },

    clickSetting(item) {
      console.log("item", item);
      switch (item.text) {
        case "main.settingsList.frequency":
          this.DialogData = {
            value: this.$store.getters.getD76,
            type: "frequency",
            title: "main.titles.generator_frequency",
          };
          this.DialogfrequencyShow = true;
          break;
        case "main.settingsList.waveform":
          this.DialogData = {
            title: "main.titles.carrier_type",
            list: [
              { id: "0", text: "wave_form.sinus" },
              { id: "1", text: "wave_form.meander" },
              { id: "2", text: "wave_form.triangle" },
            ],
            select: this.$store.getters.get_D10,
            type: "main.settingsList.waveform",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.stepMode":
          this.DialogData = {
            title: "generator_settings.stepMode",
            list: this.$t("generatorMode.stepModes"),
            select: this.$store.getters.getD54,
            type: "generator_settings.stepMode",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.step1Power":
          this.DialogData = {
            title: "generator_settings.step1Power",
            value: this.$store.getters.getD85,
            type: "generator_settings.step1Power",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.step2Power":
          this.DialogData = {
            title: "generator_settings.step2Power",
            value: this.$store.getters.getD86,
            type: "generator_settings.step2Power",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.step3Power":
          this.DialogData = {
            title: "generator_settings.step3Power",
            value: this.$store.getters.getD87,
            type: "generator_settings.step3Power",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.percentStep1":
          this.DialogData = {
            value: this.$store.getters.getD88,
            type: "generator_settings.percentStep1",
            title: "generator_settings.percentStep1",
          };
          this.Dialognum2selectShow = true;
          break;
        case "generator_settings.percentStep2":
          this.DialogData = {
            value: this.$store.getters.getD89,
            type: "generator_settings.percentStep2",
            title: "generator_settings.percentStep2",
          };
          this.Dialognum2selectShow = true;
          break;
        case "generator_settings.timerStepMode2":
          this.DialogData = {
            value: this.$store.getters.getD55,
            type: "generator_settings.timerStepMode2",
            title: "generator_settings.timerStepMode2",
          };
          this.Dialognum2selectShow = true;
          break;
        case "generator_settings.generator_mode":
          (this.DialogData = {
            title: "main.titles.generator_mode",
            list: [
              { id: "0", text: "generator_modes.auto" },
              { id: "1", text: "generator_modes.profi" },
              { id: "2", text: "generator_modes.engineering" },
            ],
            select: this.$store.getters.get_D35,
            type: "main.titles.generator_mode",
          }),
            (this.DialogSelectShow = true);
          break;
        case "generator_settings.timer_off_1":
          this.DialogData = {
            title: "generator_settings.timer_off_1",
            value: this.timerFormat(this.$store.getters.get_D21),
            type: "generator_settings.timer_off_1",
          };
          this.DialogTimerShow = true;
          break;
        case "generator_settings.timer_off_2":
          this.DialogData = {
            title: "generator_settings.timer_off_2",
            value: this.timerFormat(this.$store.getters.get_D22),
            type: "generator_settings.timer_off_2",
          };
          this.DialogTimerShow = true;
          break;
        case "generator_settings.timer_off_3":
          this.DialogData = {
            title: "generator_settings.timer_off_3",
            value: this.timerFormat(this.$store.getters.get_D23),
            type: "generator_settings.timer_off_3",
          };
          this.DialogTimerShow = true;
          break;
        case "generator_settings.period_between_on":
          console.log("get period_between_on", this.$store.getters.get_D25);
          this.DialogData = {
            title: "generator_settings.period_between_on",
            value: this.timerFormat(this.$store.getters.get_D25),
            type: "generator_settings.period_between_on",
          };
          this.DialogTimerShow = true;
          break;
        case "generator_settings.rms_out_min":
          this.DialogData = {
            title: "generator_settings.rms_out_min",
            value: this.$store.getters.getD15,
            type: "generator_settings.rms_out_min",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.rms_out_mid":
          this.DialogData = {
            title: "generator_settings.rms_out_mid",
            value: this.$store.getters.getD16,
            type: "generator_settings.rms_out_mid",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.rms_out_max":
          this.DialogData = {
            title: "generator_settings.rms_out_max",
            value: this.$store.getters.getD17,
            type: "generator_settings.rms_out_max",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.Searching_resonance_min":
          this.DialogData = {
            title: "generator_settings.Searching_resonance_min",
            value: this.$store.getters.getD46,
            type: "generator_settings.Searching_resonance_min",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.Searching_resonance_max":
          this.DialogData = {
            title: "generator_settings.Searching_resonance_max",
            value: this.$store.getters.getD47,
            type: "generator_settings.Searching_resonance_max",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.phase_shift":
          this.DialogData = {
            title: "generator_settings.phase_shift",
            type: "generator_settings.phase_shift",
            value: this.$store.getters.getD19,
          };
          this.DialogPhaseShiftShow = true;
          break;
        case "generator_settings.frequency_autotuning":
          this.DialogData = {
            value: this.$store.getters.getD37,
            type: "generator_settings.frequency_autotuning",
            title: "main.titles.frequency_autotuning",
          };
          this.Dialognum2selectShow = true;
          break;
        case "generator_settings.am_form":
          this.DialogData = {
            title: "main.titles.am_form",
            list: constans.am_form,
            select: this.$store.getters.getD29,
            type: "generator_settings.am_form",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.am_dutyCycle":
          this.DialogData = {
            title: "main.settingsList.am_dutyCycle",
            list: constans.am_dutyCycle,
            select: Number(this.$store.getters.getD30),
            type: "generator_settings.am_dutyCycle",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.am_depth":
          this.DialogData = {
            title: "main.titles.am_depth",
            list: constans.am_depth,
            select: Number(this.$store.getters.getD27),
            type: "generator_settings.am_depth",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.am_frequency":
          this.DialogData = {
            value: this.$store.getters.getD28,
            type: "generator_settings.am_frequency",
            title: "main.titles.am_frequency",
          };
          this.DialogNum3_1Show = true;
          break;
        case "generator_settings.fm_form":
          this.DialogData = {
            title: "main.titles.fm_form",
            list: constans.fm_form,
            select: this.$store.getters.getD33,
            type: "generator_settings.fm_form",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.fm_dutyCycle":
          this.DialogData = {
            title: "main.settingsList.fm_dutyCycle",
            list: constans.fm_dutyCycle,
            select: Number(this.$store.getters.getD34),
            type: "generator_settings.fm_dutyCycle",
          };
          this.DialogSelectShow = true;
          break;
        case "generator_settings.fm_deviation":
          this.DialogData = {
            value: this.$store.getters.getD31,
            type: "generator_settings.fm_deviation",
            title: "main.titles.fm_deviation",
          };
          this.DialogfrequencyShow = true;
          break;
        case "generator_settings.fm_frequency":
          this.DialogData = {
            value: this.$store.getters.getD32,
            type: "generator_settings.fm_frequency",
            title: "main.titles.fm_frequency",
          };
          this.DialogNum3_1Show = true;
          break;

        case "generator_settings.factory_settings":
          this.DialogData = {
            title: "general.warning",
            message: "generator_settings.factory_settings_answer",
            type: "generator_settings.factory_settings_answer",
          };
          this.DialogYesNoShow = true;
          break;
        default:
          break;
      }
    },
    getEEPROMAllData() {
      this.getGeneratorData("02"); // Версия прошивки генератора
      this.getGeneratorData("10"); // Запрос генерируемой формы волны генератора в EEPROM, 0-2
      this.getGeneratorData("35"); // Режим работы
      this.getGeneratorData("21"); // Таймер откл. №1
      this.getGeneratorData("22"); // Таймер откл. №2
      this.getGeneratorData("23"); // Таймер откл. №3
      this.getGeneratorData("25"); // Период между включениями
      this.getGeneratorData("15"); // Ток вых. RMS Min (mA)
      this.getGeneratorData("16"); // Ток вых. RMS Mid (mA)
      this.getGeneratorData("17"); // Ток вых. RMS Max (mA)
      this.getGeneratorData("46"); // Поиск резонанса - границв min кГц
      this.getGeneratorData("47"); // Поиск резонанса - границв max кГц
      this.getGeneratorData("19"); // Сдвиг фазы между током и напряжением
      this.getGeneratorData("37"); // Периодичность авто подстройки резонансной частоты
      this.getGeneratorData("80"); // Режим инкубатор
      this.getGeneratorData("38"); // Звуковой сигнал (вкл)
      this.getGeneratorData("45"); // Отключение по ошибке
      this.getGeneratorData("26"); // Модуляция (вкл)
      this.getGeneratorData("29"); // AM форма огибающей
      this.getGeneratorData("30"); // AM скважность огибающей
      this.getGeneratorData("27"); // AM глубина
      this.getGeneratorData("28"); // AM частота
      this.getGeneratorData("33"); // FM форма огибающей
      this.getGeneratorData("34"); // FM скважность огибающей
      this.getGeneratorData("31"); // FM девиация
      this.getGeneratorData("32"); // FM частота
      this.getGeneratorData("61"); // Фибоначчи
      this.getGeneratorData("76"); // Частота генератора
      this.getGeneratorData("78"); // Стабилизация тока
      this.getGeneratorData("80"); // 80 Режим инкубатор
      this.getGeneratorData("38"); // 38 Звуковой сигнал (вкл)
      this.getGeneratorData("45"); // 45 Отключение при ошибке
      this.getGeneratorData("26"); // 26 Модуляция (вкл)
      this.getGeneratorData("54"); // Ступенчатый режим работы
      this.getGeneratorData("56"); // Ступенчатый режим работы

      // 61 Фибоначчи
    },

    subtitle(param) {
      switch (param) {
        case "main.settingsList.frequency":
          return this.$store.getters.getD76;
        case "main.settingsList.waveform":
          return this.$t(this.$store.getters.getD10);
        case "generator_settings.stepMode":
          return this.$t("generatorMode.stepModes").find((item) => {
            if (item.id == this.$store.getters.getD54) {
              return true;
            }
          }).text;
        case "generator_settings.step1Power":
          return this.$store.getters.getD85;
        case "generator_settings.step2Power":
          return this.$store.getters.getD86;
        case "generator_settings.step3Power":
          return this.$store.getters.getD87;
        case "generator_settings.percentStep1":
          return this.$store.getters.getD88;
        case "generator_settings.percentStep2":
          return this.$store.getters.getD89;
        case "generator_settings.percentStep3":
          return (
            100 -
            (Number(this.$store.getters.getD88) +
              Number(this.$store.getters.getD89))
          );
        case "generator_settings.timerStepMode2":
          return this.$store.getters.getD55;
        case "generator_settings.generator_mode":
          return this.$t(this.$store.getters.getD35);
        case "generator_settings.timer_off_1":
          return this.$store.getters.getD21;
        case "generator_settings.timer_off_2":
          return this.$store.getters.getD22;
        case "generator_settings.timer_off_3":
          return this.$store.getters.getD23;
        case "generator_settings.period_between_on":
          return this.$store.getters.getD25;
        case "generator_settings.rms_out_min":
          return this.$store.getters.getD15;
        case "generator_settings.rms_out_mid":
          return this.$store.getters.getD16;
        case "generator_settings.rms_out_max":
          return this.$store.getters.getD17;
        case "generator_settings.Searching_resonance_min":
          return this.$store.getters.getD46;
        case "generator_settings.Searching_resonance_max":
          return this.$store.getters.getD47;
        case "generator_settings.phase_shift":
          return this.$store.getters.getD19;
        case "generator_settings.frequency_autotuning":
          return this.$store.getters.getD37;
        case "generator_settings.am_form":
          return this.$t(
            constans.waveWormFromIndex[this.$store.getters.getD29]
          );
        case "generator_settings.am_dutyCycle":
          return this.$store.getters.getD30;
        case "generator_settings.am_depth":
          return this.$store.getters.getD27;
        case "generator_settings.am_frequency":
          return this.$store.getters.getD28;
        case "generator_settings.fm_form":
          return this.$t(
            constans.waveWormFromIndex[this.$store.getters.getD33]
          );
        case "generator_settings.fm_dutyCycle":
          return this.$store.getters.getD34;
        case "generator_settings.fm_deviation":
          return this.$store.getters.getD31;
        case "generator_settings.fm_frequency":
          return this.$store.getters.getD32;
        // case '':
        //     return this.$store.getters.getD07
        default:
          return "no value";
      }
    },
  },
  created() {
    this.getEEPROMAllData();

    this.checkboxIncubator =
      String(this.$store.getters.getD80) === "1" ? true : false;

    this.checkboxSoundSignal =
      String(this.$store.getters.getD38) === "1" ? true : false;

    this.checkboxErrorOff =
      String(this.$store.getters.getD45) === "1" ? true : false;

    this.checkboxModulation =
      String(this.$store.getters.getD26) === "1" ? true : false;

    this.selectFibonachiOn =
      String(this.$store.getters.getD61) === "1" ? true : false;

    this.selectedAmperageStabilization =
      String(this.$store.getters.getD78) === "1" ? true : false;

    this.StepMode2 = String(this.$store.getters.getD56) === "1" ? true : false;
  },
};
</script>
