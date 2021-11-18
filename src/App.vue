<template>
  <el-container>
    <el-header>
      <!-- 头部组件 -->
      <header-com></header-com>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <!-- 侧边栏组件 -->
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 展示面板，一级路由 -->
          <router-view v-slot="{ Component }">
            <keep-alive exclude="UserLogin">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import headerCom from "./components/HeaderCom";
import sideBar from "./components/SideBar";
import { checkCookieLogin } from "./api";
import { setLogin, setUserInfo } from "./hooks/useUserState";

export default {
  name: 'App',
  components: {
    headerCom,
    sideBar,
  },
  setup() {
    // 拿到Router对象
    const router = useRouter();

    // 尝试 cookie 登录
    async function cookieLogin() {
      let res = await checkCookieLogin();
      if (res.code =='202') {
        console.log('cookie 登陆失败');
        return;
      } else if (res.code == '201') {
        console.log('cookie 登陆成功')
        setLogin(true);
        // cookie登录设置身份
        setUserInfo({
          username: res.data.username,
          role: res.data.roles,
        });
      }
      // 跳转页面到/fun1
      router.replace('/fun1');
    }

    onMounted(() => {
      cookieLogin();
    });
  },
};
</script>

<style>
.el-header {
  background-color: #e9eef3;
  color: #222;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #222;
  text-align: center;
}

.el-main {
  margin-top: 3px;
  background-color: whitesmoke;
  color: #222;
  text-align: center;
  line-height: 18px;
}
</style>
