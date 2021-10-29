import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { onAuthReady } from './firebase'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import './styles/utilities.css'

const app = createApp(App)
  .use(router)
  .use(createPinia())

onAuthReady(() => {
  app.mount('#app')
})
