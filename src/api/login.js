import { zwRequest } from '../network'
import message from '../hooks/useMessage'

// 账号密码登录查询 POST
function userLogin(userInfo) {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe,
    },
    interceptors: {
      responseInterceptors(data) {
        if (data.code === 200) {
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      },
    },
  })
}

// 自动 Cookie 登录查询
function checkCookieLogin() {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    showLoading: false,
    data: {
      isCookieLogin: true,
    },
    interceptors: {
      responseInterceptors(res) {
        if (res.code === 202) {
          message('warning', '自动登陆失败，请重新登陆')
        } else if (res.code === 201) {
          message('success', '登陆成功')
        }
        return res
      },
    },
  })
}

export { userLogin, checkCookieLogin }
