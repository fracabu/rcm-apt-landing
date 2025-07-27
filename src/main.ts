import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'
import { initEmailJS } from './services/email'

// Inizializza EmailJS
initEmailJS()

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')