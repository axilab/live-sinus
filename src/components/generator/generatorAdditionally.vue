<template>
  <div>
    <v-dialog
      v-if="Dialognum2selectShow"
      v-model="Dialognum2selectShow"
      scrollable
    >
      <num2select
        :input="DialogData"
        @Callback="DialogSelectCallback($event)"
      ></num2select>
    </v-dialog>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox
                v-model="selectedErrorOff"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="selectedErrorOff = !selectedErrorOff">
              <v-list-item-title>{{
                $t("main.settingsList.error_off")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item v-if="amperageStabilizationVisable">
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

      <v-list-item-group color="primary" v-if="frequencyAutotuningVisable">
        <v-list-item
          @click="clickSetting('main.settingsList.frequency_autotuning')"
        >
          <v-list-item-icon>
            <v-icon v-text="'mdi-progress-clock'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t('main.settingsList.frequency_autotuning')"
            ></v-list-item-title>
            <v-list-item-subtitle>{{
              frequencyAutotuningValue
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import num2select from "@/components/dialogs/num2select";
import bluetooth from "@/core/bluetooth";

export default {
  name: "generatorAdditionally",
  mixins: [bluetooth],
  components: { num2select },
  data() {
    return {
      settings: [],
      Dialognum2selectShow: false,
      DialogData: null,

      selectedAmperageStabilization: false,
      selectedErrorOff: false,
    };
  },
  watch: {
    selectedErrorOff(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD65);
      if (val !== old) {
        this.setErrorOff(val, false);
      }
    },
    modeErrorOff(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.selectedErrorOff) {
        this.selectedErrorOff = val;
      }
    },
    selectedAmperageStabilization(newValue) {
      let val = newValue ? "1" : "0";
      let old = String(this.$store.getters.getD79);
      if (val !== old) {
        this.setAmperageStabilization(val, false);
      }
    },
    modeAmperageStabilization(newValue) {
      let val = Boolean(parseInt(newValue));
      if (val != this.selectedAmperageStabilization) {
        this.selectedAmperageStabilization = val;
      }
    },
  },
  computed: {
    modeAmperageStabilization() {
      return this.$store.getters.getD79;
    },
    modeErrorOff() {
      return this.$store.getters.getD65;
    },
    frequencyAutotuningValue() {
      return this.$store.getters.getD77;
    },
    amperageStabilizationVisable() {
      if (this.$store.getters.getD75 === "generator_modes.engineering") {
        return true;
      }
      return false;
    },
    frequencyAutotuningVisable() {
      if (
        this.$store.getters.getD75 === "generator_modes.engineering" ||
        this.$store.getters.getD75 === "generator_modes.profi"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    DialogSelectCallback(ev) {
      console.log("DialogSelectCallback", ev);
      this.Dialognum2selectShow = false;
      if (ev !== null) {
        switch (ev.type) {
          case "frequency_autotuning":
            this.setFrequencyAutotuning(ev.result, false);
            break;
          default:
            break;
        }
      }
    },

    clickSetting(item) {
      console.log("item", item);
      switch (item) {
        case "main.settingsList.frequency_autotuning":
          this.DialogData = {
            value: this.$store.getters.getD77,
            type: "frequency_autotuning",
            title: "main.titles.frequency_autotuning",
          };
          this.Dialognum2selectShow = true;
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.selectedErrorOff =
      String(this.$store.getters.getD65) === "1" ? true : false;
    this.selectedAmperageStabilization =
      String(this.$store.getters.getD79) === "1" ? true : false;
  },
};
</script>
