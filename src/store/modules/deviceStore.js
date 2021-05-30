import constans from "@/core/constans"
export default {
    state: {


        d03: "-1", //Рабочий Статус генератора - locales: generatorStatus
        d07: "0.0", //Запрос текущей рабочей частоты генератора, кГц
        d11: "0",
        d20: "0",
        d39: "0",
        d40: "0",

    },
    mutations: {
        setStateDevice(state,payload){
            let command = payload.command
            let data = payload.data
            switch(command) {
                case '03':
                    state.d03 = data
                    break
                case '07':
                    state.d07 = data
                    break
                case '11':
                    state.d11 = data
                    break

                case '20':
                    state.d20 = data
                    break
                case '39':
                    state.d39 = data
                    break
                case '40':
                    state.d40 = data
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
        getD07(state){
            return state.d07
        },
        getD11(state){
            return state.d11
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
        },
        getD39(state){
            return state.d39
        },
        getD40(state){
            return state.d40
        }
    },
};
