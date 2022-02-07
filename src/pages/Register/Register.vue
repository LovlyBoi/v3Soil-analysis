<template>
  <div class="register">
    <div class="wrapper">
      <el-form
        v-loading="loading"
        :model="registerInfo"
        status-icon
        :rules="rules"
        ref="formRef"
        label-width="100px"
        class="demo-registerInfo"
      >
        <h2 class="title">用户注册</h2>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="registerInfo.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model.trim="registerInfo.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model.trim="registerInfo.checkPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input
            v-model.trim="registerInfo.idcard"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="peasantname">
          <el-input
            v-model.trim="registerInfo.peasantname"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitRegister"
            ref="sub"
            :loading="loadingbtn"
            >立即注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../api'
import { setLogin, setUserInfo } from '../../hooks/useUserState'
import { useToFun1 } from '../../hooks/useToFun'
import { useRules } from './config/register-config'
import { clearInfo, makeLoadingTrigger } from './utils'
import { cache } from '../../utils/cache'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const toFun1 = useToFun1(router)

    const loadingbtn = ref(false)
    const loading = ref(false)
    // 通过柯里化来避免调用两次loading
    const loadingTrigger = makeLoadingTrigger([loadingbtn, loading])

    const registerInfo = reactive({
      username: '',
      pass: '',
      checkPass: '',
      idcard: '',
      peasantname: '',
    })

    const formRef = ref(null)

    const rules = useRules(formRef, registerInfo, loadingbtn)

    function submitRegister() {
      // 开启遮罩
      loadingTrigger(true)
      formRef.value.validate((valid) => {
        // 校验整个表单成功，进行提交逻辑
        if (!valid) {
          // 关闭遮罩
          loadingTrigger(false)
          return
        }
        let userInfo = {
          username: registerInfo.username,
          password: registerInfo.pass,
          ID: registerInfo.idcard,
          peasantName: registerInfo.peasantname,
        }
        // 提交请求
        register(userInfo)
          .then((data) => {
            if (data.code === '201') {
              // 注册成功
              // 更改登录信息
              setLogin(true)
              // 路由导航到 fun1
              toFun1()
              // 提交用户信息到 store
              setUserInfo(registerInfo)
              // 提交用户信息到 localStorage
              cache.setCache('username', registerInfo.username || '')
              // 最后清除注册信息，防止退出登录之后再回来会有残留信息
              clearInfo(registerInfo)
            } else {
              // 注册失败
              return Promise.reject(data)
            }
          })
          .catch((reason) => {
            console.warn('注册失败', reason)
          })
          .finally(() => {
            loadingTrigger(false)
          })
      })
    }

    return {
      loading,
      loadingbtn,
      registerInfo,
      formRef,
      rules,
      submitRegister,
    }
  },
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.wrapper {
  width: 40%;
  min-width: 250px;
  max-width: 500px;
}

.title {
  font-weight: 400;
  letter-spacing: 1.5px;
  margin-bottom: 20px;
  margin-left: 20%;
}
</style>
