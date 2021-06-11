export default {
  startByte: ":",
  stopByte: "\r",
  command: {
    START: ":04" + "\r",
    STOP: ":05" + "\r",
    PAUSE: ":481" + "\r",
    RESUME: ":480" + "\r",
    GET_FIRMWARE: ":02" + "\r",
    GET_STATUS: ":03" + "\r",
    GET_Resonant_frequency: ":06" + "\r", //Запрос резонансной частоты контура катушки, кГц
    GET_current_operating_frequency: ":07" + "\r", //Запрос текущей рабочей частоты генератора, кГц
    ACTIVATE_resonant_frequency_search: ":08" + "\r", //Активировать режим поиска резонансной частоты контура катушки
  },
  statuses: {
    0: "OFF", //генератор отключен, переведен в спящий режим
    1: "ON_search_for_resonant_frequency", //включен в режиме поиска резонансной частоты
    2: "ON_calculating_the_Qfactor_of_the_coil", //включен в режиме вычисления добротности катушки
    3: "ON_in_the_mode_of_tuning_the_resonant_frequency", //включен в режиме подстройки резонансной частоты
    4: "PAUSE", //включен режиме PAUSE, отключена генерация на выходе и заморожены таймеры
    5: "ON", //включен в режиме штатной генерации
    6: "ON_in_coil_urrent_trim_mode", //включен в режиме подстройки тока катушки
    "-1": "init",
  },
  generatorMode: {
    auto: "0",
    manual: "1",
    manualProfi: "2",
  },
  waveForm: {
    sinus: "0",
    meander: "1",
    triangle: "2",
  },
  waveWormFromIndex: {
    0: "wave_form.sinus",
    1: "wave_form.meander",
    2: "wave_form.triangle",
    3: "wave_form.sawtooth",
    4: "wave_form.rectangular",
  },
  am_form: [
    { id: "0", text: "wave_form.sinus" },
    { id: "1", text: "wave_form.meander" },
    { id: "2", text: "wave_form.triangle" },
    { id: "3", text: "wave_form.sawtooth" },
    { id: "4", text: "wave_form.rectangular" },
  ],
  am_dutyCycle: [
    { id: 0, text: "am_depth_values.p0" },
    { id: 10, text: "am_depth_values.p10" },
    { id: 20, text: "am_depth_values.p20" },
    { id: 30, text: "am_depth_values.p30" },
    { id: 40, text: "am_depth_values.p40" },
    { id: 50, text: "am_depth_values.p50" },
    { id: 60, text: "am_depth_values.p60" },
    { id: 70, text: "am_depth_values.p70" },
    { id: 80, text: "am_depth_values.p80" },
    { id: 90, text: "am_depth_values.p90" },
    { id: 100, text: "am_depth_values.p100" },
  ],
  am_depth: [
    { id: 10, text: "am_depth_values.p10" },
    { id: 20, text: "am_depth_values.p20" },
    { id: 30, text: "am_depth_values.p30" },
    { id: 40, text: "am_depth_values.p40" },
    { id: 50, text: "am_depth_values.p50" },
    { id: 60, text: "am_depth_values.p60" },
    { id: 70, text: "am_depth_values.p70" },
    { id: 80, text: "am_depth_values.p80" },
    { id: 90, text: "am_depth_values.p90" },
    { id: 100, text: "am_depth_values.p100" },
  ],
  fm_form: [
    { id: "0", text: "wave_form.sinus" },
    { id: "1", text: "wave_form.meander" },
    { id: "2", text: "wave_form.triangle" },
    { id: "3", text: "wave_form.sawtooth" },
    { id: "4", text: "wave_form.rectangular" },
  ],
  fm_dutyCycle: [
    { id: 0, text: "am_depth_values.p0" },
    { id: 10, text: "am_depth_values.p10" },
    { id: 20, text: "am_depth_values.p20" },
    { id: 30, text: "am_depth_values.p30" },
    { id: 40, text: "am_depth_values.p40" },
    { id: 50, text: "am_depth_values.p50" },
    { id: 60, text: "am_depth_values.p60" },
    { id: 70, text: "am_depth_values.p70" },
    { id: 80, text: "am_depth_values.p80" },
    { id: 90, text: "am_depth_values.p90" },
    { id: 100, text: "am_depth_values.p100" },
  ],
};
