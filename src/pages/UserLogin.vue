<template>
  <div class="outer">
    <div class="wrapper">
      <el-form
        ref="form"
        :rules="rules"
        :model="loginForm"
        label-width="80px"
        class="login-container"
        :disabled="disablebtn"
        size="medium"
      >
        <h2 class="title" style="font-weight: 400; letter-spacing: 1.5px">
          系统登录
        </h2>

        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            id="username"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model.trim="loginForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
            id="password"
          ></el-input>
        </el-form-item>

        <el-checkbox v-model="remember" style="display: block" class="chkbox"
          >记住我</el-checkbox
        >

        <el-button
          type="primary"
          id="logbtn"
          @click="submit"
          :loading="disablebtn"
          >立即登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../api";
import { setLogin, setUserInfo } from "../hooks/useUserState";
import { setCurrEl } from "../hooks/useCurrEl";
import message from "../hooks/useMessage";

export default {
  name: "UserLogin",
  setup() {
    const router = useRouter();

    const loginForm = ref({
      username: window.localStorage.getItem("username") || "",
      pass: "",
      code: "",
    });
    const remember = ref(false);
    const disablebtn = ref(false);
    const form = ref(null);

    const rules = ref({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 4,
          max: 16,
          message: "长度在 4 到 16 个字符",
          trigger: "blur",
        },
      ],
      pass: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 20,
          message: "长度在 6 到 20 个字符",
          trigger: "blur",
        },
      ],
    });

    // 登录
    function login(userName, passWord) {
      // 禁用表单
      disablebtn.value = true;
      // 要提交的用户信息
      let userData = {
        username: userName,
        password: passWord,
        rememberMe: remember.value,
      };
      // 账号密码登录，发送请求
      userLogin(userData)
      .then(({data}) => {
        // 密码错误
        if(data.code == 202){
          loginForm.value.pass = "";
          return
        }
        // 其他错误
        if(data.code != 200){
          return Promise.reject(data)
        }
        // 登陆成功
        let res = data.data;
        // 更改登录信息
        setLogin(true);
        // 路由导航到 fun1，设置高亮
        router.replace("/fun1");
        setCurrEl(1);
        // 提交用户信息到 userState
        setUserInfo({
          username: loginForm.value.username,
          role: res.roles,
        });
        // 提交用户信息到 localStorage
        if (window.localStorage) {
          let username = loginForm.value.username || "";
          window.localStorage.setItem("username", username);
        }
      })
      .catch(reason => {
        message('error', '登录失败')
        console.warn('登录请求错误', reason)
      })
      .finally(() => {
        // 解禁按钮
        disablebtn.value = false;
      })
    }

    function submit() {
      form.value.validate((valid) => {
        if (valid) {
          // 登录逻辑
          login(loginForm.value.username, loginForm.value.pass);
        } else {
          message("error", "请完善信息哦");
          return;
        }
      });
    }

    return {
      loginForm,
      form,
      remember,
      disablebtn,
      submit,
      rules,
    };
  },
};
</script>

<style scoped>
.outer {
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
</style>