<template>
    <v-card
            class="mx-auto my-12"
    >
        <v-img  class="ma-3"
                src="logo.png"
        ></v-img>

        <v-card-title>Live sinus</v-card-title>


    <v-card-text>
        <v-row align="center" class="mx-0">
            Мобильное приложение для управления генератором LS 5BT
        </v-row>
        <v-row align="center" class="mx-0">
            Версия: 1.0
        </v-row>
        <v-row align="center" class="mx-0">
            Дата версии: 31.05.2021
        </v-row>

        <v-row align="center" class="mx-0">
            <a target="_blank" href="https://www.live-sinus.com">www.live-sinus.com</a>
        </v-row>

        <v-row align="center" class="mx-0">
            <a target="_blank" href="https://vk.com/live_sinus">https://vk.com/live_sinus</a>
        </v-row>

        <v-btn color="blue darken-1" outlined dark @click="mailDevelop" class="mt-4">
            Написать разработчику
        </v-btn>
    </v-card-text>
    </v-card>
</template>

<script>
    // import {mapGetters} from "vuex";

    export default {
        name: "Home",

        components: {},
        data() {
            return {
            };
        },
        methods:{
            mailDevelop(){
                let url = "mailto:axilab@gmail.com"
                let link_url = document.createElement("a")
                link_url.target = "_blank"
                link_url.href = url
                document.body.appendChild(link_url)
                link_url.click()
                document.body.removeChild(link_url)
            }
        }
        //computed: mapGetters(["getAllLogs"]),
        //methods: {}
    }
</script>
