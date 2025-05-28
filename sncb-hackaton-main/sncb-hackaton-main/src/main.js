import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n' // 👈 importa la instancia de Vue I18n

const app = createApp(App)

app.use(router)
app.use(i18n) // 👈 usa I18n ANTES de montar la app

app.mount('#app')
