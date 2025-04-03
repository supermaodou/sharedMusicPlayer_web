import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store'
import router from './router'
import websocket from './utils/websocket'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

// 初始化 WebSocket
websocket.init(store)

app.mount('#app')
