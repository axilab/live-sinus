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
        @callback="DialogCallback($event)"
      ></dialog-yes-no>
    </v-dialog>

    <v-list>
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
            <v-list-item-subtitle>{{
              subtitle(item.text)
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                $t("generator_settings.mode_incubator")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                $t("generator_settings.sound_signal")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                $t("generator_settings.error_off")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                $t("generator_settings.modulation")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group color="primary">
        <v-list-item
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
import bluetooth from "@/core/bluetooth";
import util from "@/core/util";
import constans from "../../core/constans";

export default {
  name: "GeneratorSetting",
  mixins: [bluetooth, util],
  components: { radioSelect, timerSelect, powerSelect, dialogYesNo },
  data() {
    return {
      DialogSelectShow: false,
      DialogTimerShow: false,
      DialogPowerShow: false,
      DialogYesNoShow: false,

      DialogData: null,

      items: [
        { text: "generator_settings.generator_mode", icon: "mdi-cog-outline" },
        { text: "generator_settings.timer_off_1", icon: "mdi-cog-outline" },
        { text: "generator_settings.timer_off_2", icon: "mdi-cog-outline" },
        { text: "generator_settings.timer_off_3", icon: "mdi-cog-outline" },
        {
          text: "generator_settings.period_between_on",
          icon: "mdi-cog-outline",
        },
        { text: "generator_settings.rms_out_min", icon: "mdi-cog-outline" },
        { text: "generator_settings.rms_out_mid", icon: "mdi-cog-outline" },
        { text: "generator_settings.rms_out_max", icon: "mdi-cog-outline" },
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
      ],
      items2: [
        { text: "generator_settings.am_form", icon: "mdi-cog-outline" },
        { text: "generator_settings.am_dutyCycle", icon: "mdi-cog-outline" },
        { text: "generator_settings.am_depth", icon: "mdi-cog-outline" },
        { text: "generator_settings.am_frequency", icon: "mdi-cog-outline" },
        { text: "generator_settings.fm_form", icon: "mdi-cog-outline" },
        { text: "generator_settings.fm_dutyCycle", icon: "mdi-cog-outline" },
        { text: "generator_settings.fm_deviation", icon: "mdi-cog-outline" },
        { text: "generator_settings.fm_frequency", icon: "mdi-cog-outline" },
      ],
      factory_settings: {
        text: "generator_settings.factory_settings",
        subtitle: "",
        icon: "mdi-exclamation",
      },
    };
  },
  computed: {},
  methods: {
    DialogCallback(ev) {
      console.log("DialogSelectCallback", ev);
      if (ev !== null) {
        const res = ev.result;
        const type = ev.type;
        console.log("type", type, "res", res);
        switch (ev.type) {
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
        }
        //this.getEEPROMAllData()
      }

      this.DialogSelectShow = false;
      this.DialogTimerShow = false;
      this.DialogPowerShow = false;
      this.DialogYesNoShow = false;
    },

    clickSetting(item) {
      console.log("item", item);
      switch (item.text) {
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
            type: "rms_out_min",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.rms_out_mid":
          this.DialogData = {
            title: "generator_settings.rms_out_mid",
            value: this.$store.getters.getD16,
            type: "rms_out_mid",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.rms_out_max":
          this.DialogData = {
            title: "generator_settings.rms_out_max",
            value: this.$store.getters.getD17,
            type: "rms_out_max",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.Searching_resonance_min":
          this.DialogData = {
            title: "generator_settings.Searching_resonance_min",
            value: this.$store.getters.getD46,
            type: "Searching_resonance_min",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.Searching_resonance_max":
          this.DialogData = {
            title: "generator_settings.Searching_resonance_max",
            value: this.$store.getters.getD47,
            type: "Searching_resonance_max",
          };
          this.DialogPowerShow = true;
          break;
        case "generator_settings.factory_settings":
          this.DialogData = {
            title: "general.warning",
            message: "generator_settings.factory_settings_answer",
            type: "factory_settings",
          };
          this.DialogYesNoShow = true;
          break;
        default:
          break;
      }
    },
    getEEPROMAllData() {
      this.getGeneratorData("02"); // Версия прошивки генератора
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
      this.getGeneratorData("67"); // AM глубина
      this.getGeneratorData("68"); // AM частота
      this.getGeneratorData("73"); // FM форма огибающей
      this.getGeneratorData("74"); // FM скважность огибающей
      this.getGeneratorData("31"); // FM девиация
      this.getGeneratorData("32"); // FM частота
      this.getGeneratorData("61"); // Фибоначчи

      // 61 Фибоначчи
      // 80 Режим инкубатор
      // 38 Звуковой сигнал (вкл)
      // 45 Отключение при ошибке
      // 26 Модуляция (вкл)
    },

    subtitle(param) {
      switch (param) {
        case "generator_settings.generator_mode":
          //return this.$t(this.$store.getters.getD35)
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
          return this.$store.getters.getD67;
        case "generator_settings.am_frequency":
          return this.$store.getters.getD68;
        case "generator_settings.fm_form":
          return this.$t(
            constans.waveWormFromIndex[this.$store.getters.getD33]
          );
        case "generator_settings.fm_dutyCycle":
          return this.$store.getters.getD74;
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
  },
};
</script>
