<template>
  <div class="user-login">
    <div class="wrapper">
      <el-form
        ref="formRef"
        :rules="rules"
        :model="userInfo"
        label-width="80px"
        :disabled="disablebtn"
      >
        <h2 class="title">用户登录</h2>

        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="userInfo.username"
            placeholder="请输入用户名"
            id="username"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model.trim="userInfo.pass"
            autocomplete="off"
            placeholder="请输入密码"
            id="password"
          ></el-input>
        </el-form-item>

        <el-checkbox v-model="remember" style="display: block"
          >记住我</el-checkbox
        >

        <el-button type="primary" @click="submit" :loading="disablebtn"
          >立即登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userLogin } from '../../api'
import { setLogin, setUserInfo } from '../../hooks/useUserState'
import message from '../../hooks/useMessage'
import { useToFun1 } from '../../hooks/useToFun'
import { rules } from './config/login-config'
import { cache } from '../../utils/cache'

export default {
  name: 'UserLogin',
  setup() {
    const router = useRouter()
    const toFun1 = useToFun1(router)

    const userInfo = ref({
      // username: "123",
      username: cache.getCache('username') || '',
      pass: '',
      code: '',
    })
    const remember = ref(false)
    const disablebtn = ref(false)
    const formRef = ref(null)

    // 登录
    function login(userName, passWord, rememberMe) {
      // 禁用表单
      disablebtn.value = true
      // 账号密码登录，发送请求
      userLogin({
        username: userName,
        password: passWord,
        rememberMe,
      })
        .then((data) => {
          // 密码错误，不进catch
          if (data.code == 202) {
            userInfo.value.pass = ''
            return
          }
          // 其他错误，进catch
          if (data.code != 200) {
            return Promise.reject(data)
          }
          // 登陆成功
          // 更改登录信息
          setLogin(true)
          // 路由导航到 fun1，设置高亮
          toFun1()
          // 提交用户信息到 userState
          setUserInfo({
            username: userName,
            role: data.data.roles,
          })
          // 提交用户信息到 localStorage
          cache.setCache('username', userName || '')
        })
        .catch((reason) => {
          message('error', '登录失败')
          console.warn('登录请求错误', reason)
        })
        .finally(() => {
          // 解禁按钮
          disablebtn.value = false
        })
    }

    function submit() {
      formRef.value.validate((valid) => {
        if (!valid) {
          message('error', '请完善信息哦')
          return
        }
        login(userInfo.value.username, userInfo.value.pass, remember.value)
      })
    }

    return {
      userInfo,
      formRef,
      remember,
      disablebtn,
      submit,
      rules,
    }
  },
}
</script>

<style scoped>
.user-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 50px;
}

.wrapper {
  width: 40%;
  min-width: 250px;
  max-width: 400px;
}

.title {
  font-weight: 400;
  letter-spacing: 1.5px;
}
</style>
