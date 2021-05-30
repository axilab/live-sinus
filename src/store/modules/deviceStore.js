import constans from "@/core/constans"
export default {
    state: {

        d02: "", //Версия прошивки генератора
        d03: "-1", //Рабочий Статус генератора - locales: generatorStatus
        d06: "", //Запрос резонансной частоты контура катушки, кГц
        d07: "", //Запрос текущей рабочей частоты генератора, кГц
        d09: "", //Запрос текущей генерируемой формы волны генератора - locales: generatorWaveform
        d10: "", //Запрос генерируемой формы волны генератора в EEPROM - locales: generatorWaveform
        d11: "", //Запрос добротности контура катушки
        d13: "", //Запрос текущего рабочего тока через контур катушки
        d14: "", //Запрос задатчика тока для контура катушки
        // d15: "", //Задатчик тока-1 (MINIMUM) в EEPROM, в мА
        // d16: "", //Задатчик тока-1 (MINIMUM) в EEPROM, в мА
        // d17: "", //Задатчик тока-1 (MINIMUM) в EEPROM, в мА
        d20: "0",

    },
    mutations: {
        setStateDevice(state,payload){
            let command = payload.command
            let data = payload.data
            switch(command) {
                case '03':
                    state.d03 = data
                    break
                case '20':
                    state.d20 = data
                    break


                default:
                    break
            }
        },
    },
    actions: {},
    getters: {
        getD03(state){
            return constans.statuses[state.d03]
          //return state.d03
        },
        getD20(state){
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
        }
    },
};
