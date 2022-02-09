// 保存用户状态
import { ref } from 'vue'

const userState = ref({
  // 用户信息
  userInfo: {
    username: '',
    // 用户身份，默认最低级用户
    role: 'admin',
  },
  // 是否已经登录
  isLogin: false,
})

// 设置登录接口
function setLogin(state) {
  userState.value.isLogin = state
}

// 提交用户信息接口
function setUserInfo(userinfo) {
  userState.value.userInfo.username = userinfo.username
  userState.value.userInfo.role = userinfo.role
}

export { userState, setLogin, setUserInfo }
