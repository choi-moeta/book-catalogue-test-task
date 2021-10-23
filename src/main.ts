import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { onAuthReady } from './firebase'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'

const app = createApp(App)
  .use(router)

onAuthReady(() => {
  app.mount('#app')
})
