import constans from "@/core/constans";
import util from "@/core/util";

export default {
  state: {
    d02: "0", // Версия прошивки генератора
    d03: "-1", // Рабочий Статус генератора - locales: generatorStatus
    d07: "0.0", // Запрос текущей рабочей частоты генератора, кГц
    d09: "0", // Запрос текущей генерируемой формы волны генератора, 0-2
    d10: "0", // Запрос генерируемой формы волны генератора в EEPROM, 0-2
    d11: "0",
    d13: "0", // Запрос текущего рабочего тока через контур катушки, мА.
    d14: "0", // Запрос задатчика тока для контура катушки, мА.
    d15: "0", // Задатчик тока-1 (MINIMUM) в EEPROM, в мА. Зеленая индикация LED.
    d16: "0", // Задатчик тока-2 (MIDDLE) в EEPROM, в мА. Желтая индикация LED.
    d17: "0", // Задатчик тока-3 (MAXIMUM) в EEPROM, в мА. Красная индикация LED
    d18: "0", // Запрос задатчика фазы между током и напряжением контура катушки
    d19: "0", // Задатчик фазы в EEPROM, -180...+180 градусов
    d20: "0", // Запрос текущего времени таймера выключения генератора, в минутах
    d21: "0", // Задатчик времени для таймера выключения - №1 в EEPROM, в минутах
    d22: "0", // Задатчик времени для таймера выключения - №2 в EEPROM, в минутах
    d23: "0", // Задатчик времени для таймера выключения - №3 в EEPROM, в минутах
    d24: "0", // Запрос текущего времени таймера включения генератора, в минутах
    d25: "0", // Задатчик времени для таймера включения в EEPROM, в минутах
    d26: "0", // Переключатель активности модуляции, 0-1
    d27: "0", // Задатчик глубины АМ модуляции в EEPROM, в процентах 0-100%
    d28: "0", // Задатчик частоты АМ модуляции в EEPROM, 0.1-1000 Гц
    d29: "0", // Задатчик формы огибающей АМ модуляции, 0-4
    d30: "0", // Задатчик скважности огибающей пилообразной и прямоугольной формы АМ модуляции в EEPROM, в процентах 0-100%
    d31: "0", // Задатчик девитации FM модуляции в EEPROM, в кГц
    d32: "0", // Задатчик частоты FM модуляции в EEPROM, 0.1-1000 Гц
    d33: "0", // Задатчик формы огибающей FM модуляции в EEPROM, 0-4
    d34: "0", // Задатчик скважности огибающей пилообразной и прямоугольной формы FM модуляции в EEPROM, в процентах 0-100%
    d35: "0", // Задатчик режима работы в EEPROM, 0-2
    d37: "0", // Задатчик периода подстройки рез. частоты в EEPROM, для режима работы №1 (ручной с периодической подстройкой), в секундах.
    d38: "0", // Задатчик разрешения звукового сигнала в EEPROM, 0-1
    d39: "0", // Запрос напряжения питания усилителя мощности генератора, в Вольтах
    d40: "0", // Запрос RMS выходного напряжения генератора, в Вольтах
    d45: "0", // Задатчик разрешения выключения генератора по причине невозможности найти рез. частоту или отсутствия тока через катушку, в EEPROM, 0-1
    d46: "0", // Задатчик стартовой частоты поиска резонансна в EEPROM, в кГц
    d47: "0", // Задатчик максимальной частоты поиска резонансна в EEPROM, в кГц
    d53: "0", // Разрешение режима ступенчатого сценария мощности, 0-2
    d54: "0", // Разрешение режима ступенчатого сценария мощности в EEPROM, 0-2
    d55: "0", // Задатчик таймера, для переключения ступеней мощности в EEPROM, в сек
    d56: "0", // Разрешение ступенчатого сценария-2 для кнопки «Power» в EEPROM, 0-1
    d58: "0", // Задатчик разрешения звукового сигнала, пока есть питание, 0-1
    d61: "0", // Переключатель активности модуляции Фибоначчи в EEPROM, 0-1
    d62: "0", // Переключатель активности модуляции Фибоначчи, 0-1
    d65: "0", // Задатчик разрешения выключения генератора по причине невозможности найти рез. частоту или отсутствия тока через катушку, 0-1
    d66: "0", // Переключатель активности модуляции, 0-1
    d67: "0", // Задатчик глубины АМ модуляции, в процентах 0-100%
    d68: "0", // Задатчик частоты АМ модуляции, 0.1-1000 Гц
    d69: "0", // Задатчик формы огибающей АМ модуляции, 0-4
    d70: "0", // Задатчик скважности огибающей пилообразной и прямоугольной формы АМ модуляции, в процентах 0-100%
    d71: "0", // Задатчик девитации FM модуляции, в кГц
    d72: "0", // Задатчик частоты FM модуляции, 0.1-1000 Гц
    d73: "0", // Задатчик формы огибающей FM модуляции, 0-4
    d74: "0", // Задатчик скважности огибающей пилообразной и прямоугольной формы FM модуляции, в процентах 0-100%
    d75: "0", // Задатчик режима работы, 0-2
    d76: "0", // Задатчик частоты генератора PROFI режима в EEPROM, в кГц
    d77: "0", // Задатчик периода подстройки рез. частоты, для режима работы №1 (ручной с периодической подстройкой), в секундах.
    d78: "0", // Разрешение стабилизации тока ПРОФИ режима в EEPROM, 0-1
    d79: "0", // Разрешение стабилизации тока ПРОФИ режима временная, 0-1
    d80: "0", // Разрешение режима Инкубатора (при включении питания), 0-1
    d85: "0", // Задатчик тока-1 (MINIMUM) в EEPROM, в мА. Ступенчатый сценарий
    d86: "0", // Задатчик тока-2 (MEDIUM) в EEPROM, в мА. Ступенчатый сценарий
    d87: "0", // Задатчик тока-3 (MAXIMUM ) в EEPROM, в мА. Ступенчатый сценарий
    d88: "0", // Задатчик процента-1 от времени текущего таймера выключения в EEPROM. Этот процент для тока-1 (MINIMUM), 0-100%.
    d89: "0", // Задатчик процента-2 от времени текущего таймера выключения в EEPROM. Этот процент для тока-2 (MEDIUM), 0-100%
    d90: "0", // GUID. Текстовая константа в EEPROM.
  },
  mutations: {
    setStateDevice(state, payload) {
      state["d" + payload.command] = payload.data;
    },
  },
  actions: {},
  getters: {
    getD02(state) {
      return state.d02;
    },
    getD03(state) {
      return constans.statuses[state.d03];
      //return state.d03
    },
    getD07(state) {
      return state.d07;
    },
    get_D09(state) {
      return state.d09;
    },
    getD09(state) {
      switch (state.d09) {
        case constans.waveForm.sinus:
          return "wave_form.sinus";
        case constans.waveForm.meander:
          return "wave_form.meander";
        case constans.waveForm.triangle:
          return "wave_form.triangle";
        default:
          return "general.nodata";
      }
    },
    get_D10(state) {
      return state.d10;
    },
    getD10(state) {
      switch (state.d10) {
        case constans.waveForm.sinus:
          return "wave_form.sinus";
        case constans.waveForm.meander:
          return "wave_form.meander";
        case constans.waveForm.triangle:
          return "wave_form.triangle";
        default:
          return "general.nodata";
      }
    },

    getD11(state) {
      return state.d11;
    },
    getD13(state) {
      if (state.d13 < 10) {
        return 0;
      } else {
        return state.d13;
      }
    },
    getD14(state) {
      return state.d14;
    },
    getD15(state) {
      return state.d15;
    },
    getD16(state) {
      return state.d16;
    },
    getD17(state) {
      return state.d17;
    },
    getD18(state) {
      return state.d18;
    },
    getD19(state) {
      return state.d19;
    },
    getD20(state) {
      //Timer Off
      return util.methods.timeFormat(state.d20);
    },
    getD21(state) {
      return util.methods.timeFormat(state.d21);
    },
    getD22(state) {
      return util.methods.timeFormat(state.d22);
    },
    getD23(state) {
      return util.methods.timeFormat(state.d23);
    },

    get_D21(state) {
      return state.d21;
    },
    get_D22(state) {
      return state.d22;
    },
    get_D23(state) {
      return state.d23;
    },

    getD24(state) {
      //Timer On
      return util.methods.timeFormat(Number(state.d24 * 60));
    },
    getD25(state) {
      //Timer On
      return util.methods.timeFormat(Number(state.d25 * 60));
    },

    get_D25(state) {
      //Timer On
      return Number(state.d25 * 60);
    },

    getD26(state) {
      return state.d26;
    },
    getD27(state) {
      return state.d27;
    },
    getD28(state) {
      return state.d28;
    },
    getD29(state) {
      return state.d29;
    },
    getD30(state) {
      return state.d30;
    },

    getD31(state) {
      return state.d31;
    },
    getD32(state) {
      return state.d32;
    },

    getD33(state) {
      return state.d33;
    },

    getD34(state) {
      return state.d34;
    },

    getD35(state) {
      switch (state.d35) {
        case constans.generatorMode.auto:
          return "generator_modes.auto";
        case constans.generatorMode.manual:
          return "generator_modes.profi";
        case constans.generatorMode.manualProfi:
          return "generator_modes.engineering";
        default:
          return "generator_modes.auto";
      }
    },
    get_D35(state) {
      return state.d35;
    },

    getD37(state) {
      return state.d37;
    },
    getD38(state) {
      return state.d38;
    },
    getD39(state) {
      return state.d39;
    },
    getD40(state) {
      return state.d40;
    },
    getD45(state) {
      return state.d45;
    },
    getD46(state) {
      return state.d46;
    },
    getD47(state) {
      return state.d47;
    },
    getD53(state) {
      return state.d53;
    },
    getD54(state) {
      return state.d54;
    },
    getD55(state) {
      return state.d55;
    },
    getD56(state) {
      return state.d56;
    },
    getD58(state) {
      return state.d58;
    },
    getD61(state) {
      return state.d61;
    },
    getD62(state) {
      return state.d62;
    },

    getD65(state) {
      return state.d65;
    },
    getD66(state) {
      return state.d66;
    },
    getD67(state) {
      return state.d67;
    },
    getD68(state) {
      return state.d68;
    },

    getD69(state) {
      return state.d69;
    },
    getD70(state) {
      return state.d70;
    },

    getD71(state) {
      return state.d71;
    },
    getD72(state) {
      return state.d72;
    },

    getD73(state) {
      return state.d73;
    },
    getD74(state) {
      return state.d74;
    },

    getD75(state) {
      switch (state.d75) {
        case constans.generatorMode.auto:
          return "generator_modes.auto";
        case constans.generatorMode.manual:
          return "generator_modes.profi";
        case constans.generatorMode.manualProfi:
          return "generator_modes.engineering";
        default:
          return "generator_modes.auto";
      }
    },
    get_D75(state) {
      return state.d75;
    },
    getD76(state) {
      return state.d76;
    },
    getD77(state) {
      return state.d77;
    },
    getD78(state) {
      return state.d78;
    },
    getD79(state) {
      return state.d79;
    },
    getD80(state) {
      return state.d80;
    },
    getD85(state) {
      return state.d85;
    },
    getD86(state) {
      return state.d86;
    },
    getD87(state) {
      return state.d87;
    },
    getD88(state) {
      return state.d88;
    },
    getD89(state) {
      return state.d89;
    },
    getD90(state) {
      return state.d90;
    },
  },
};
