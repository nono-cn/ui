import { createApp } from 'vue'
import App from '@docs/App.vue'
import { router } from '@docs/router'
import '@docs/styles.css'

createApp(App).use(router).mount('#app')
