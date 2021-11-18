import { zwRequest } from '../network'
import message from '../hooks/useMessage';

// 账号密码登录查询 POST
function userLogin(userInfo) {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe
    },
    interceptors: {
      responseInterceptors(data){
        if(data.code == 200){
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      }
    }
  })
}

// 注册
function register(userInfo) {
  return zwRequest.request({
    method: 'POST',
    url: '/registerUsers',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      id_card: userInfo.ID,
      peasantName: userInfo.peasantName
    },
    interceptors: {
      responseInterceptors(data){
        if(data.code == 201) {
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      }
    }
  })
}

// 自动 Cookie 登录查询
function checkCookieLogin() {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    showLoading: false,
    data: {
      isCookieLogin: true
    },
    interceptors: {
      responseInterceptors(res){
        if(res.code == 202) {
          message('warning', '自动登陆失败，请重新登陆')
        }
        else if(res.code == 201) {
          message('success', '登陆成功')
        }
        return res
      }
    }
  })
}

// 检查用户名是否重复
function checkUsernameRepeat(username) {
  return zwRequest.request({
    method: 'POST',
    url: '/checkRepeatUsername',
    showLoading: false,
    data: {
      username
    }
  })
}

// 检查身份证号是否重复
function checkIDCard(ID) {
  return zwRequest.request({
    method: 'POST',
    url: '/checkRepeatId_card',
    showLoading: false,
    data: {
      "id_card": ID
    }
  })
}

// fun1查询
function queryFun1(jing, wei, crop, showMessage = true) {
  const config = {
    method: 'POST',
    url: '/fun1',
    data: {
      longitude: jing + '',
      latitude: wei + '',
      cropName: crop
    }
  }
  if(showMessage){
    config.interceptors = {
      responseInterceptors(data){
        if(data.code == 200) {
          message('success', data.msg)
        }
        else {
          message('error', data.msg)
        }
        return data
      }
    }
  }
  return zwRequest.request(config)
}

// 发送fun2查询
function queryFun2(MEN, MOP, MOK, MOM, crop) {
  return zwRequest.request({
    method: 'GET',
    url: '/fun2',
    showLoading: false,
    params: {
      mea_Effective_N: MEN,
      mea_Olsen_P: MOP,
      mea_Olsen_K: MOK,
      mea_Organic_matter: MOM,
      cropName: crop,
    }
  })
}

// 专家修改建议值
function updateExpertSuggest({ jing, wei, elementName, cropName, suggestValue }) {
  return zwRequest.request({
    method: 'POST',
    url: '/newExpertSuggest',
    data: {
      longitude: jing,
      latitude: wei,
      elementName,
      cropName,
      suggestValue,
    },
    interceptors: {
      responseInterceptors(data) {
        if(data.code == 200){
          message('success', data.msg)
        }
        else{
          message('error', data.msg)
        }
        return data
      }
    }
  })
}

export {
  userLogin,
  register,
  checkCookieLogin,
  checkUsernameRepeat,
  checkIDCard,
  queryFun1,
  queryFun2,
  updateExpertSuggest,
}