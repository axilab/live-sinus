import constans from "./constans";

export default {
  methods: {
    getBluetoothEnable() {
      return new Promise((resolve, reject) => {
        window.bluetoothSerial.isEnabled(
          (success) => resolve(success),
          (failure) => {
            reject(failure);
          }
        );
      });
    },

    bluetoothEnable() {
      return new Promise((resolve, reject) => {
        window.bluetoothSerial.enable(
          (success) => resolve(success),
          (failure) => reject(failure)
        );
      });
    },

    bluetoothIsConnected() {
      return new Promise((resolve) => {
        window.bluetoothSerial.isConnected(
          (success) => resolve(success),
          (failure) => resolve(failure)
        );
      });
    },

    openBluetoothPort() {
      return new Promise((resolve, reject) => {
        let device = this.$store.getters.getCurrentDevice;

        console.log("device->>", device);
        if (device == null || device == undefined) {
          reject({ status: "error", message: "device not selected", code: 0 });
          //this.commit('setError', "Генератор не выбран")
        }

        //console.log('device.address', device.address)
        let macAddress = device.address;

        const serial = window.bluetoothSerial;
        serial.connect(
          macAddress,
          () => {
            //console.log('>>bluetoothSubscribe>>')
            this.deviceInit();
            //this.$store.commit('setStateDevice',{command:'03', data:'-1'})
            this.$store.commit("bluetoothSubscribe");
            resolve({ status: "ok", message: "port opened", code: 200 });
          },
          (error) => {
            console.log("serial.connect error", error);
            reject({ status: "error", message: error, code: 1 });
          }
        );
      });
    },

    closeBluetoothPort() {
      return new Promise((resolve, reject) => {
        const serial = window.bluetoothSerial;
        serial.disconnect(
          () => {
            console.log("serial.disconnect success");
            resolve({ status: "ok", code: 200 });
          },
          (error) => {
            console.log("serial.disconnect error", error);
            reject({ status: "error", code: 1, message: error });
          }
        );
      });
    },

    writePort(data) {
      const serial = window.bluetoothSerial;
      console.log("send ", data);
      serial.write(
        data,
        () => {},
        () => {
          console.log("error write port");
        }
      );
    },

    readPort() {
      return new Promise((resolve, reject) => {
        const serial = window.bluetoothSerial;
        serial.read(
          (data) => {
            console.log("read data", data);
            resolve(data);
          },
          (error) => {
            console.log("read data error", error);
            reject(error);
          }
        );
      });
    },

    /* режима работы - constans.generatorMode */

    setGeneratorFibonchi(mode, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "61" + mode + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "62" + mode + constans.stopByte);
      }
    },
    setGeneratorMinMa(ma) {
      this.writePort(constans.startByte + "15" + ma + constans.stopByte);
    },
    setGeneratorMidMa(ma) {
      this.writePort(constans.startByte + "16" + ma + constans.stopByte);
    },
    setGeneratorMaxMa(ma) {
      this.writePort(constans.startByte + "17" + ma + constans.stopByte);
    },
    setGeneratorTimerOff1(min) {
      this.writePort(constans.startByte + "21" + min + constans.stopByte);
    },
    setGeneratorTimerOff2(min) {
      this.writePort(constans.startByte + "22" + min + constans.stopByte);
    },
    setGeneratorTimerOff3(min) {
      this.writePort(constans.startByte + "23" + min + constans.stopByte);
    },
    setGeneratorSoundOn(mode, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "38" + mode + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "58" + mode + constans.stopByte);
      }
    },
    setGeneratorStartSearchResonance(khz) {
      this.writePort(constans.startByte + "46" + khz + constans.stopByte);
    },
    setGeneratorFinishSearchResonance(khz) {
      this.writePort(constans.startByte + "47" + khz + constans.stopByte);
    },
    setGeneratorPowerStepMode(mode, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "54" + mode + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "53" + mode + constans.stopByte);
      }
    },
    setGeneratorStepPower(sec) {
      this.writePort(constans.startByte + "55" + sec + constans.stopByte);
    },
    setGeneratorStepModeButtonPower(mode) {
      this.writePort(constans.startByte + "56" + mode + constans.stopByte);
    },
    setGeneratorStepPowerMin(ma) {
      this.writePort(constans.startByte + "85" + ma + constans.stopByte);
    },
    setGeneratorStepPowerMid(ma) {
      this.writePort(constans.startByte + "86" + ma + constans.stopByte);
    },
    setGeneratorStepPowerMax(ma) {
      this.writePort(constans.startByte + "87" + ma + constans.stopByte);
    },
    setGeneratorStep1Percent(percent) {
      this.writePort(constans.startByte + "88" + percent + constans.stopByte);
    },
    setGeneratorStep2Percent(percent) {
      this.writePort(constans.startByte + "89" + percent + constans.stopByte);
    },

    setGeneratorMode(mode, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "35" + mode + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "75" + mode + constans.stopByte);
      }
    },

    setGeneratorWaveForm(mode, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "10" + mode + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "09" + mode + constans.stopByte);
      }
    },

    setGeneratorPower(mA) {
      this.writePort(constans.startByte + "14" + mA + constans.stopByte);
    },

    setGeneratorTimerOn(minutes, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "25" + minutes + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "24" + minutes + constans.stopByte);
      }
    },

    setGeneratorPhaseShift(gr, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "19" + gr + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "18" + gr + constans.stopByte);
      }
    },

    setGeneratorFrequency(kHz, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "76" + kHz + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "07" + kHz + constans.stopByte);
      }
    },

    setGeneratorModulation(on, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "26" + on + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "66" + on + constans.stopByte);
      }
    },

    setGeneratorAmForm(form, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "29" + form + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "69" + form + constans.stopByte);
      }
    },

    setGeneratorFmForm(form, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "33" + form + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "73" + form + constans.stopByte);
      }
    },

    setGeneratorFmDeviation(khz, EEPROM) {
      console.log("setGeneratorFmDeviation", khz);
      if (EEPROM) {
        this.writePort(constans.startByte + "31" + khz + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "71" + khz + constans.stopByte);
      }
    },

    setGeneratorAmDepth(depth, EEPROM) {
      console.log("setGeneratorAmDepth");
      if (EEPROM) {
        this.writePort(constans.startByte + "27" + depth + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "67" + depth + constans.stopByte);
      }
    },

    setGeneratorAmFrequency(hz, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "28" + hz + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "68" + hz + constans.stopByte);
      }
    },

    setGeneratorFmFrequency(hz, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "32" + hz + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "72" + hz + constans.stopByte);
      }
    },

    setAmperageStabilization(on, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "78" + on + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "79" + on + constans.stopByte);
      }
    },

    setFrequencyAutotuning(on, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "37" + on + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "77" + on + constans.stopByte);
      }
    },

    setErrorOff(on, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "45" + on + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "65" + on + constans.stopByte);
      }
    },

    setIncubator(on) {
      this.writePort(constans.startByte + "80" + on + constans.stopByte);
    },

    setTimerOff(minutes) {
      this.writePort(constans.startByte + "20" + minutes + constans.stopByte);
    },

    setGeneratorDutyCycleAM(percent, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "30" + percent + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "70" + percent + constans.stopByte);
      }
    },

    setGeneratorDutyCycleFM(percent, EEPROM) {
      if (EEPROM) {
        this.writePort(constans.startByte + "34" + percent + constans.stopByte);
      } else {
        this.writePort(constans.startByte + "74" + percent + constans.stopByte);
      }
    },

    getGeneratorData(register) {
      this.writePort(constans.startByte + register + constans.stopByte);
    },

    reset() {
      this.writePort(constans.startByte + "01" + constans.stopByte);
    },
    setDefaultEEPROM() {
      this.writePort(constans.startByte + "9999" + constans.stopByte);
    },
    deviceInit() {
      this.writePort(
        constans.startByte +
          "50" +
          "1000" +
          "03" +
          "07" +
          "11" +
          "20" +
          "39" +
          "40" +
          "13" +
          "14" +
          "24" +
          "18" +
          "66" +
          "75" +
          "79" +
          "80" +
          "77" +
          "65" +
          "69" +
          "67" +
          "68" +
          "73" +
          "71" +
          "72" +
          "70" +
          "74" +
          "61" +
          "62" +
          "58" +
          "85" +
          "86" +
          "87" +
          "88" +
          "89" +
          "53" +
          "54" +
          "55" +
          constans.stopByte
      );

      this.$store.commit("bluetoothSubscribe");
    },
  },
};
