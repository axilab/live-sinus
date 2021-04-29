import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings";
import About from "../views/About";
import Debug from "../views/Debug";

Vue.use(VueRouter);

const routes = [
    { path: "/home", name: "Home", component: Home },
    { path: "/settings", name: "Settings", component: Settings },
    { path: "/about", name: "About", component: About },
    { path: "/debug", name: "Debug", component: Debug },
    ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
