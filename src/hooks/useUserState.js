// 保存用户状态
import {ref} from 'vue'

const userState = ref({
  // 用户信息
  userInfo: {
    username: '',
  },
  // 是否已经登录
  isLogin: false
})

// 设置登录接口
function setLogin(state){
  userState.value.isLogin = state
  // console.log(userState)
}

// 提交用户信息接口
function setUserInfo(userinfo){
  userState.value.userInfo.username = userinfo.username || ""
  // console.log("userInfo: ",this.state.userInfo)
}


export {
  userState,
  setLogin,
  setUserInfo,
}
