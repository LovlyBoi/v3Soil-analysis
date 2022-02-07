import { zwRequest } from '../network'
import message from '../hooks/useMessage'

// 注册
function register(userInfo) {
  return zwRequest.request({
    method: 'POST',
    url: '/registerUsers',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      id_card: userInfo.ID,
      peasantName: userInfo.peasantName,
    },
    interceptors: {
      responseInterceptors(data) {
        if (data.code === 201) {
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      },
    },
  })
}

// 检查用户名是否重复
function checkUsernameRepeat(username) {
  return zwRequest.request({
    method: 'POST',
    url: '/checkRepeatUsername',
    showLoading: false,
    data: {
      username,
    },
  })
}

// 检查身份证号是否重复
function checkIDCard(ID) {
  return zwRequest.request({
    method: 'POST',
    url: '/checkRepeatId_card',
    showLoading: false,
    data: {
      id_card: ID,
    },
  })
}

export { register, checkIDCard, checkUsernameRepeat }
