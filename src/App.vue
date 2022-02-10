<template>
  <el-container>
    <!-- 头部组件 -->
    <el-header class="hidden-xs-only">
      <header-com></header-com>
    </el-header>
    <el-header class="hidden-sm-and-up phone-header">
      <phone-header></phone-header>
    </el-header>
    <el-container>
      <el-aside width="15%" class="hidden-xs-only">
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

  <!-- <test></test> -->
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import headerCom from './components/HeaderCom'
import sideBar from './components/SideBar'
import { checkCookieLogin } from './api'
import { setLogin, setUserInfo } from './hooks/useUserState'

// import Test from './components/test.vue'

export default {
  name: 'App',
  components: {
    headerCom,
    sideBar,

    // Test
  },
  setup() {
    // 拿到Router对象
    const router = useRouter()

    // 尝试 cookie 登录
    async function cookieLogin() {
      let res = await checkCookieLogin()
      if (res.code === 202) {
        console.log('cookie 登陆失败')
        return
      } else if (res.code === 201) {
        console.log('cookie 登陆成功')
        setLogin(true)
        // cookie登录设置身份
        setUserInfo({
          username: res.data.username,
          role: res.data.roles,
        })
      }
      // 跳转页面到/fun1
      router.replace('/fun1')
    }

    onMounted(() => {
      cookieLogin()
    })
  },
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .el-drawer {
    width: 80% !important;
  }
  .el-message-box {
    width: 70vw !important;
  }
  .el-main {
    margin-top: 60px !important;
  }
}
@media only screen and (min-width: 768px) {
}

.phone-header {
  width: 100%;
  position: fixed;
  z-index: 99;
}

.el-header {
  background-color: #e9eef3;
  color: #222;
  /* text-align: center; */
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

/* 由于我没有找到关闭控件的API，就在这用css干掉了 */
.rotate-circle,
.tmap-zoom-control {
  display: none !important;
}
</style>
