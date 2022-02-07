import { checkUsernameRepeat, checkIDCard } from '../../../api'
function useRules(formRef, registerInfo, loadingbtn) {
  // 检查密码
  function validatePass(rule, value, callback) {
    if (value === '') {
      // 解禁按钮
      callback(new Error('请输入密码'))
    } else {
      // 重新检查确认密码来确保两次密码输入一致
      formRef.value.validateField('checkPass')
      callback()
    }
  }
  // 检查确认密码
  function validatePassAgain(rule, value, callback) {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== registerInfo.pass) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  // 检查真实姓名
  function checkPeasantname(rule, value, callback) {
    let regx = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z].\s]{1,20})$/
    if (!value) {
      return callback(new Error('请填写姓名！'))
    } else if (regx.test(value) === false) {
      callback(new Error('姓名格式错误'))
    } else {
      callback()
    }
  }
  // 检查身份证号
  function checkIdCard(rule, value, callback) {
    let regx = /(^\d{15}$)|(^\d{17}(\d|X)$)/
    if (!value) {
      return callback(new Error('身份证号不能为空'))
    } else if (regx.test(value) === false) {
      callback(new Error('身份证格式错误'))
    }
    // 检查时禁用提交按钮
    loadingbtn.value = true
    // 请求检验身份证是否被注册
    checkIDCard(value)
      .then(
        (data) => {
          // 对返回值进行判断
          if (data.code === '200') {
            return callback()
          } else {
            callback(new Error(data.msg))
          }
        },
        (reason) => {
          callback(new Error('服务器被吃了┭┮﹏┭┮'))
          console.warn(reason)
        }
      )
      .finally(() => {
        // 解禁提交按钮
        loadingbtn.value = false
      })
  }

  // 检查用户名
  function checkUsername(rule, value, callback) {
    if (!value) {
      return callback(new Error('用户名不能为空'))
    }
    // 禁用提交按钮
    loadingbtn.value = true
    // 发送请求验证是否被注册
    checkUsernameRepeat(value)
      .then((data) => {
        // 对返回值进行判断
        if (data.code === '200') {
          return callback()
        } else {
          callback(new Error(data.msg))
        }
      })
      .catch((reason) => {
        callback(new Error('服务器被吃了┭┮﹏┭┮'))
        console.warn('检查用户名失败', reason)
      })
      .finally(() => {
        // 解禁提交按钮
        loadingbtn.value = false
      })
  }

  return {
    pass: [
      { validator: validatePass, trigger: 'blur' },
      {
        min: 6,
        max: 20,
        message: '长度在 6 到 20 个字符',
        trigger: 'blur',
      },
    ],
    checkPass: [
      { validator: validatePassAgain, trigger: 'blur' },
      {
        min: 6,
        max: 20,
        message: '长度在 6 到 20 个字符',
        trigger: 'blur',
      },
    ],
    idcard: [{ validator: checkIdCard, trigger: 'blur' }],
    peasantname: [{ validator: checkPeasantname, trigger: 'blur' }],
    username: [
      { validator: checkUsername, trigger: 'blur' },
      {
        min: 4,
        max: 16,
        message: '长度在 4 到 16 个字符',
        trigger: 'blur',
      },
    ],
  }
}

export { useRules }
