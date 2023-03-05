import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ProgramPage from "./pages/ProgramPage.vue";
import NewProgramPage from "./pages/NewProgramPage.vue";
import New2ProgramPage from "./pages/New2ProgramPage.vue";
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProgramPage },
    { path: '/new', component: NewProgramPage },
    { path: '/new2', component: New2ProgramPage },
  ],
})

const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
