import '@/main/core/main.css'
import { registerServices } from '@/main/services/dependency-injection'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/main/core/App.vue'
import router from '@/main/routes/index'

const app = createApp(App)
registerServices(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
