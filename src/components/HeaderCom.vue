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
      <a href="javascript:;" style="cursor: default">你好，{{ username }}</a>
      <el-popconfirm
        confirm-button-text="退出"
        cancel-button-text="取消"
        :icon="InfoFilled"
        icon-color="red"
        title="确定要退出登录吗？"
        @confirm="exitLogin"
      >
        <template #reference>
          <el-button type="text">退出登录</el-button>
        </template>
      </el-popconfirm>
    </div>
    <h1 class="title">土壤成分分析</h1>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { InfoFilled } from "@element-plus/icons";
import { currEl, setCurrEl } from "../hooks/useCurrEl";
import { userState, setLogin } from "../hooks/useUserState";
import message from "../hooks/useMessage";

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
      message("success", "退出登录");
    }

    // 注册点击事件
    function showRegister() {
      // 修改当前高亮元素
      setCurrEl(-2);
      // 跳转到用户登录界面
      router.push("/register").catch((e) => e);
    }

    // 优先去去 userState 找，没有再本地存储中找，再没有返回 “尊敬的客户”，这样避免了切换用户时得刷新才能拿到数据（不知道怎么把本地存储变成响应式）
    const username = computed(() => {
      return (
        userState.value.userInfo.username ||
        window.localStorage.getItem("username") ||
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
      InfoFilled,
    };
  },
};
</script>

<style scoped>
.head-wrapper {
  display: flex;
  justify-content: space-between;
}

.title {
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