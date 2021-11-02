import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import '../public/css/reset.css'
// message样式，不知道为啥得自己引入
import "element-plus/theme-chalk/el-message.css"
// 响应式断点隐藏
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
