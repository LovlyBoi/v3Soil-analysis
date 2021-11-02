<template>
  <div class="outer">
    <div class="wrapper">
      <el-form
        v-loading="loading"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h2
          class="title"
          style="
            font-weight: 400;
            letter-spacing: 1.5px;
            margin-bottom: 20px;
            margin-left: 20%;
          "
        >
          用户注册
        </h2>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model.trim="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model.trim="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input
            v-model.trim="ruleForm.idcard"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="peasantname">
          <el-input
            v-model.trim="ruleForm.peasantname"
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { checkUsernameRepeat, checkIDCard, register } from "../api";
import { setLogin, setUserInfo } from "../hooks/useUserState";
import { setCurrEl } from "../hooks/useCurrEl";

export default {
  name: "Register",
  setup() {
    const router = useRouter();

    const loadingbtn = ref(false);

    const loading = ref(false);

    const ruleForm = reactive({
      username: "",
      pass: "",
      checkPass: "",
      idcard: "",
      peasantname: "",
    });

    const form = ref(null);

    // 检查身份证号
    const checkIdCard = (rule, value, callback) => {
      // 检查时禁用提交按钮
      loadingbtn.value = true;

      let regx = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else if (regx.test(value) === false) {
        callback(new Error("身份证格式错误"));
      }
      // 请求检验身份证是否被注册
      checkIDCard(value)
        .then(
          (value) => {
            // 对返回值进行判断
            if (value.data && value.data.code == "200") {
              return callback();
            } else {
              callback(new Error(value.data.msg));
            }
          },
          (reason) => {
            callback(new Error("服务器被吃了┭┮﹏┭┮"));
            console.warn(reason);
          }
        )
        .finally(() => {
          // 解禁提交按钮
          loadingbtn.value = false;
        });
    };

    // 检查用户名
    const checkUsername = (rule, value, callback) => {
      // 检查时禁用提交按钮
      loadingbtn.value = true;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      // 发送请求验证是否被注册
      checkUsernameRepeat(value)
        .then(
          (value) => {
            // 对返回值进行判断
            if (value.data && value.data.code == "200") {
              return callback();
            } else {
              callback(new Error(value.data.msg));
            }
          },
          (reason) => {
            callback(new Error("服务器被吃了┭┮﹏┭┮"));
            console.warn(reason);
          }
        )
        .finally(() => {
          // 解禁提交按钮
          loadingbtn.value = false;
        });
    };

    // 检查密码
    const validatePass = (rule, value, callback) => {
      // 检查时禁用提交按钮
      loadingbtn.value = true;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (ruleForm.checkPass !== "") {
          // 请求重新检查确认密码来确保两次密码输入一致
          form.value.validateField("checkPass");
        }
        // 解禁按钮
        loadingbtn.value = false;
        callback();
      }
    };

    // 检查确认密码
    const validatePassAgain = (rule, value, callback) => {
      // 检查时禁用提交按钮
      loadingbtn.value = true;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 解禁按钮
        loadingbtn.value = false;
        callback();
      }
    };

    // 检查真实姓名
    const checkPeasantname = (rule, value, callback) => {
      // 检查时禁用提交按钮
      loadingbtn.value = true;

      let regx = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z].\s]{1,20})$/;
      if (!value) {
        return callback(new Error("请填写姓名！"));
      } else if (regx.test(value) === false) {
        callback(new Error("姓名格式错误"));
      } else {
        callback();
      }
      // 解禁按钮
      loadingbtn.value = false;
    };

    const rules = reactive({
      pass: [
        { validator: validatePass, trigger: "blur" },
        {
          min: 6,
          max: 20,
          message: "长度在 6 到 20 个字符",
          trigger: "blur",
        },
      ],
      checkPass: [
        { validator: validatePassAgain, trigger: "blur" },
        {
          min: 6,
          max: 20,
          message: "长度在 6 到 20 个字符",
          trigger: "blur",
        },
      ],
      idcard: [{ validator: checkIdCard, trigger: "blur" }],
      peasantname: [{ validator: checkPeasantname, trigger: "blur" }],
      username: [
        { validator: checkUsername, trigger: "blur" },
        {
          min: 4,
          max: 16,
          message: "长度在 4 到 16 个字符",
          trigger: "blur",
        },
      ],
    });

    function submitRegister() {
      form.value.validate((valid) => {
        // 校验整个表单成功，进行提交逻辑
        if (valid) {
          // 开启遮罩层
          loading.value = true;
          // 使按钮进入加载状态
          loadingbtn.value = true;
          let userInfo = {
            username: ruleForm.username,
            password: ruleForm.pass,
            ID: ruleForm.idcard,
            peasantName: ruleForm.peasantname,
          };
          // console.log(userInfo);
          // 提交请求
          register(userInfo)
            .then(
              (value) => {
                if (value.data && value.data.code == "201") {
                  // 注册成功
                  // 更改登录信息
                  setLogin(true);
                  // 路由导航到 fun1
                  router.replace("/fun1");
                  setCurrEl(1);
                  // 提交用户信息到 store
                  setUserInfo(this.ruleForm);
                  // 提交用户信息到 localStorage
                  if (window.localStorage) {
                    let username = this.ruleForm.username || "";
                    window.localStorage.setItem("username", username);
                  }
                } else {
                  // 注册失败
                  // 在拦截器就提示过了，所以什么也不做
                }
              },
              (reason) => {
                console.warn(reason);
              }
            )
            .finally(() => {
              loading.value = false;
              this.loadingbtn = false;
            });
        } else {
          // 校验表单失败
          console.warn("表单校验失败");
          return;
        }
      });
    }

    return {
      loading,
      loadingbtn,
      ruleForm,
      form,
      rules,
      submitRegister,
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
}

.wrapper {
  width: 40%;
  min-width: 250px;
  max-width: 500px;
}
</style>