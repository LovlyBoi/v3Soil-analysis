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
import { checkUser } from "../api";
import { ElMessage } from "element-plus";
import { setLogin, setUserInfo } from "../hooks/useUserState";
import { setCurrEl } from "../hooks/useCurrEl";

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
    async function login(userName, passWord) {
      // 禁用表单
      disablebtn.value = true;
      // api 调用
      let userInfo = {
        username: userName,
        password: passWord,
        rememberMe: remember.value,
      };
      let res = await checkUser(userInfo);
      disablebtn.value = false;

      // console.log("res-----",res);

      try {
        if (res.data && res.data.code == 202) {
          loginForm.value.pass = "";
        } else if (res.data && res.data.code == 200) {
          // 禁用表单
          // this.disablebtn = true;
          // 更改登录信息
          setLogin(true);
          // 路由导航到 fun1
          router.replace("/fun1");
          setCurrEl(1);
          // 提交用户信息到 store
          setUserInfo(loginForm.value);
          // 提交用户信息到 localStorage
          if (window.localStorage) {
            let username = loginForm.value.username || "";
            window.localStorage.setItem("username", username);
          }
        }
      } catch (e) {
        ElMessage({
          message: "好像哪里出错了呢",
          type: "error",
          duration: 1500,
        });
        console.warn(e);
      }
    }

    function submit() {
      form.value.validate((valid) => {
        if (valid) {
          // 登录逻辑
          login(loginForm.value.username, loginForm.value.pass);
        } else {
          ElMessage({
            message: "请完善信息哦",
            type: "error",
            duration: 1500,
          });
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