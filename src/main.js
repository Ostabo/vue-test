// 1. Define route components.
// These can be imported from other files
import {createApp} from "vue";
import {createRouter, createWebHashHistory} from "vue-router";
import App from "@/App";
import AboutPage from "@/components/AboutPage";
import GameField from "@/components/GameField";
import HomePage from "@/components/HomePage";

const routes = [
    {path: '/home', component: HomePage},
    {path: '/game', component: GameField},
    {path: '/about', component: AboutPage},
    {path: '/:pathMatch(.*)*', redirect: '/home'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
