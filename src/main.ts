import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';
import App from './App.vue'
import './style.css'
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'light',
        }
    }
})

app.use(ToastService)

app.mount('#app')