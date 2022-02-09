// message样式，不知道为啥得自己引入
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-icon.css'
// 响应式断点隐藏
// 注意：element-plus自带的媒体查询在断点处会全部应用，会导致两个类全部被隐藏，所以我们把他的代码重写一遍，不引入他的display
// import 'element-plus/theme-chalk/display.css'
import '../../public/css/reactive_display.css'
