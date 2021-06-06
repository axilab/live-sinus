import constans from "@/core/constans"
//import util from '@/core/util'

export default {
    state: {
        d02: "0", // Версия прошивки генератора
        d03: "-1", // Рабочий Статус генератора - locales: generatorStatus
        d07: "0.0", // Запрос текущей рабочей частоты генератора, кГц
        d09: "0", // Запрос текущей генерируемой формы волны генератора, 0-2
        d11: "0",
        d13: "0", // Запрос текущего рабочего тока через контур катушки, мА.
        d14: "0", // Запрос задатчика тока для контура катушки, мА.
        d18: "0", // Запрос задатчика фазы между током и напряжением контура катушки
        d19: "0", // Задатчик фазы в EEPROM, -180...+180 градусов
        d20: "0", // Запрос текущего времени таймера выключения генератора, в минутах
        d24: "0", // Запрос текущего времени таймера включения генератора, в минутах
        d25: "0", // Задатчик времени для таймера включения в EEPROM, в минутах
        d26: "0", // Переключатель активности модуляции, 0-1
        d35: "0", // Задатчик режима работы в EEPROM, 0-2
        d37: "0", // Задатчик периода подстройки рез. частоты в EEPROM, для режима работы №1 (ручной с периодической подстройкой), в секундах.
        d39: "0", // Запрос напряжения питания усилителя мощности генератора, в Вольтах
        d40: "0", // Запрос RMS выходного напряжения генератора, в Вольтах
        d45: "0", // Задатчик разрешения выключения генератора по причине невозможности найти рез. частоту или отсутствия тока через катушку, в EEPROM, 0-1
        d65: "0", // Задатчик разрешения выключения генератора по причине невозможности найти рез. частоту или отсутствия тока через катушку, 0-1
        d66: "0", // Переключатель активности модуляции, 0-1
        d75: "0", // Задатчик режима работы, 0-2
        d77: "0", // Задатчик периода подстройки рез. частоты, для режима работы №1 (ручной с периодической подстройкой), в секундах.
        d78: "0", // Разрешение стабилизации тока ПРОФИ режима в EEPROM, 0-1
        d79: "0", // Разрешение стабилизации тока ПРОФИ режима временная, 0-1
        d80: "0", // Разрешение режима Инкубатора (при включении питания), 0-1
        d90: "0", // GUID. Текстовая константа в EEPROM.

    },
    mutations: {
        setStateDevice(state,payload){
            state['d'+payload.command] = payload.data
        },
    },
    actions: {},
    getters: {
        getD02(state){
            return state.d02
        },
        getD03(state){
            return constans.statuses[state.d03]
          //return state.d03
        },
        getD07(state){
            return state.d07
        },
        get_D09(state){
            return state.d09
        },
        getD09(state){
            switch (state.d09) {
                case constans.waveForm.sinus:
                    return 'wave_form.sinus'
                case constans.waveForm.meander:
                    return 'wave_form.meander'
                case constans.waveForm.triangle:
                    return 'wave_form.triangle'
                default:
                    return 'general.nodata'
            }
        },
        getD11(state){
            return state.d11
        },
        getD13(state){
            return state.d13
        },
        getD14(state){
            return state.d14
        },
        getD18(state){
            return state.d18
        },
        getD19(state){
            return state.d19
        },
        getD20(state){ //Timer Off
            const timestamp = Number(state.d20)
            let hours = Math.floor(timestamp / 60 / 60);
            let minutes = Math.floor(timestamp / 60) - (hours * 60);
            let seconds = timestamp % 60;

            let formattedTimer = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            return formattedTimer
        },
        getD24(state){ //Timer On
            const timestamp = Number(state.d24)
            let hours = Math.floor(timestamp / 60 / 60);
            let minutes = Math.floor(timestamp / 60) - (hours * 60);
            let seconds = timestamp % 60;

            let formattedTimer = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            return formattedTimer
        },
        getD25(state){ //Timer On
            const timestamp = Number(state.d25)
            let hours = Math.floor(timestamp / 60 / 60);
            let minutes = Math.floor(timestamp / 60) - (hours * 60);
            let seconds = timestamp % 60;

            let formattedTimer = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            return formattedTimer
        },
        getD26(state){
            return state.d26
        },
        getD35(state){
            switch (state.d35) {
                case constans.generatorMode.auto:
                    return 'generator_modes.auto'
                case constans.generatorMode.manual:
                    return 'generator_modes.profi'
                case constans.generatorMode.manualProfi:
                    return 'generator_modes.engineering'
                default:
                    return 'generator_modes.auto'
            }

        },
        getD37(state){
            return state.d37
        },
        getD39(state){
            return state.d39
        },
        getD40(state){
            return state.d40
        },
        getD45(state){
            return state.d45
        },
        getD65(state){
            return state.d65
        },
        getD66(state){
            return state.d66
        },
        getD75(state){
            switch (state.d75) {
                case constans.generatorMode.auto:
                    return 'generator_modes.auto'
                case constans.generatorMode.manual:
                    return 'generator_modes.profi'
                case constans.generatorMode.manualProfi:
                    return 'generator_modes.engineering'
                default:
                    return 'generator_modes.auto'
            }

        },
        get_D75(state){
            return state.d75
        },
        getD77(state){
            return state.d77
        },
        getD78(state){
            return state.d78
        },
        getD79(state){
            return state.d79
        },
        getD80(state){
            return state.d80
        },
        getD90(state){
            return state.d90
        },


    },
};
