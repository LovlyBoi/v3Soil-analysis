import { setLogin } from '../hooks/useUserState'
import message from '../hooks/useMessage'
// 退出登录
function exitLogin() {
  // 状态退出
  setLogin(false)
  // 清除cookie
  document.cookie = 'u=;JSESSIONID=;'
  message('success', '退出登录')
}

export default exitLogin
