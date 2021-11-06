import axios from 'axios'
import { ElMessage } from 'element-plus'


axios.defaults.timeout = 8000;

// 生产版本 baseURL
// axios.defaults.baseURL = "http://120.79.189.55:10086/content1-2.0"

// 开发版本 baseURL
axios.defaults.baseURL = "/api"

// 响应拦截器
axios.interceptors.response.use(success => {
  // console.log(success)
  // 检查重复值，不需要弹窗
  if (success.config.url == '/checkRepeatUsername' ||
    success.config.url == '/checkRepeatId_card') {
    return success
  }

  if (success.status && success.status == 200) {

    if (success.data.code == 500 ||
      success.data.code == 501 ||
      success.data.code == 400 ||
      success.data.code == 403 ||
      success.data.code == 420 ||
      success.data.code == 421 ||
      success.data.code == 422 ||
      success.data.code == 423 ||
      success.data.code == 202) {
      ElMessage({
        center: true,
        message: success.data.msg,
        type: "error",
        duration: 1500
      })
      return success;
    }
    else if (success.data.msg) {
      ElMessage({
        center: true,
        message: success.data.msg,
        type: "success",
        duration: 1500
      })
    }
  }
  return success;
}, error => {
  console.warn(error);
  if (error.message == 'Network Error') {
    ElMessage({
      center: true,
      message: "网络开小差了┭┮﹏┭┮",
      type: "error",
      duration: 1500
    })
  }
  return Promise.reject(error)
})

// 账号密码登录查询 POST
function userLogin(userInfo) {
  return axios({
    method: 'POST',
    url: '/login',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe
    }
  })
}

// 注册
function register(userInfo) {
  return axios({
    method: 'POST',
    url: '/registerUsers',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      id_card: userInfo.ID,
      peasantName: userInfo.peasantName
    }
  })
}

// 自动 Cookie 登录查询
function checkCookieLogin() {
  return axios({
    method: 'POST',
    url: '/login',
    data: {
      isCookieLogin: true
    }
  })
}

// 检查用户名是否重复
function checkUsernameRepeat(username) {
  return axios({
    method: 'POST',
    url: '/checkRepeatUsername',
    data: {
      username
    }
  })
}

// 检查身份证号是否重复
function checkIDCard(ID) {
  return axios({
    method: 'POST',
    url: '/checkRepeatId_card',
    data: {
      "id_card": ID
    }
  })
}

// fun1查询
function queryFun1(jing, wei, crop) {
  return axios({
    method: 'POST',
    url: '/fun1',
    data: {
      longitude: jing + '',
      latitude: wei + '',
      cropName: crop
    }
  })
}

// 发送fun2查询
function queryFun2(MEN, MOP, MOK, MOM, crop) {
  return axios({
    method: 'GET',
    url: '/fun2',
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
  return axios({
    method: 'POST',
    url: '/newExpertSuggest',
    data: {
      longitude: jing,
      latitude: wei,
      elementName,
      cropName,
      suggestValue,
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