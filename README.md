# live-sinus

## Мобильное приложение для генератора Live Sinus 

Скачать [APK]/android/app/release/app-release.apk) для Android

```
git clone https://github.com/axilab/live-sinus.git
```

Установка зависимостей проекта:
```
npm install
```

Сборка приложения:
```
npm run build
```

```
npx cap open android
```

### Отладка приложения
Устройство должно быть подключено кабелем к ПК
Для отладки приложения нужно собрать приложение и запустить его на устройстве после чего в браузере chrome перейти по
```
chrome://inspect/#devices
```
и подключится к устройству

Для использования режима hot-reload при отладке необходимо: 
1. запустить локальный веб сервер проекта:
```
npm run serve
```

2. добавить в файле capacitor.config.json раздел:
           "server": {
             "url": "http://192.168.31.15:8080"
           }
указав ip и порт своего локального веб сервера

3. собрать приложение
```
npm run build
```
и запустить его на устройстве 

### Используемые зависимости:
Фреймворк: Vue включая пакеты: Vuetify, vue-router, vuex, vue-i18n
Фреймворк: Capacitor

Плагины cordova:
cordova-plugin-bluetooth-serial
cordova-sqlite-storage
cordova-plugin-app-exit

