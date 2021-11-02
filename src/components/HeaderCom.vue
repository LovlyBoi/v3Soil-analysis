<template>
  <div class="head-wrapper">
    <div v-if="!userState.isLogin">
      <a
        href="javascript:;"
        id="logina"
        @click="showLogin"
        :class="{
          active: currEl === -1,
        }"
        >登录</a
      >
      <a
        href="javascript:;"
        id="zhucea"
        @click="showRegister"
        :class="{
          active: currEl === -2,
        }"
        >注册</a
      >
    </div>
    
    <div v-else class="showHello">
      <a href="javascript:;" style="cursor: auto">你好{{ "，" + username }}</a>
      <a href="javascript:;" id="exit" @click="exitLogin">退出登录</a>
    </div>
    <h1 class="title">土壤成分分析</h1>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { currEl, setCurrEl } from "../hooks/useCurrEl";
import { userState, setLogin } from "../hooks/useUserState";
export default {
  name: "Header",
  setup() {
    // 拿到router
    const router = useRouter();

    // 登录点击事件
    function showLogin() {
      // 修改当前高亮元素
      setCurrEl(-1);
      // 跳转到用户登录界面
      router.push("/login").catch((e) => e);
    }

    // 退出登录
    function exitLogin() {
      setLogin(false);
    }

    // 注册点击事件
    function showRegister() {
      // 修改当前高亮元素
      setCurrEl(-2);
      // 跳转到用户登录界面
      router.push("/register").catch((e) => e);
    }

    // 优先去本地存储中找名字，没有再去 store 找，再没有返回 “用户”
    const username = computed(() => {
      return (
        window.localStorage.getItem("username") ||
        userState.value.userInfo.username ||
        "尊敬的客户"
      );
    });

    return {
      currEl,
      showLogin,
      exitLogin,
      showRegister,
      username,
      userState,
    };
  },
};
</script>

<style scoped>
.head-wrapper {
  display: flex;
  justify-content: space-between;
}

.title{
  font-size: 2vw;
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translateX(-6vw);
}

#logina,
#zhuce {
  margin: 0 10px;
}

#logina:hover,
#zhucea:hover {
  transition: all 150ms;
  color: #409eff;
}

/* 高亮时变蓝色 */
.active {
  color: #409eff;
}

#exit {
  margin-right: 30px;
}

#exit:hover {
  color: #409eff;
  text-decoration: underline;
}

.showHello {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>