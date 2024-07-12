import './assets/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/theme-chalk/src/message.scss';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import i18n from './locales/index'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(i18n)

app.mount('#app')
