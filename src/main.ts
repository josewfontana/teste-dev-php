import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import maska from "maska";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(maska)

app.mount('#app')
