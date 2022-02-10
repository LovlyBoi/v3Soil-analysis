<template>
  <input type="checkbox" ref="toggler" id="toggler" />
  <label for="toggler">
    <div class="hamburger-content">
      <span></span>
      <span></span>
    </div>
  </label>
  <div class="nav-container">
    <ul>
      <li>
        <el-button type="text" style="color: #363636" @click="toFun1">查成分</el-button>
      </li>
      <li>
        <el-button type="text" style="color: #363636" @click="toFun2">建议量</el-button>
      </li>
    </ul>
  </div>
  <div class="cover" @click="coverClickHandle"></div>
  <div class="action-wrapper" v-if="!userState.isLogin">
    <el-button type="text" @click="showLogin">登录</el-button>
    <el-button type="text" @click="showRegister">注册</el-button>
  </div>
  <div class="action-wrapper" v-else>
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
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { InfoFilled } from '@element-plus/icons'
import { useToFun1, useToFun2, useGoto } from '../hooks/useToFun'
import { userState } from '../hooks/useUserState'
import exitLogin from '../hooks/useExitLogin'

export default {
  setup() {
    const router = useRouter()
    const goto = useGoto(router)

    let toggler = ref(null)

    function closeToggler() {
      toggler.value.checked = false
    }

    function coverClickHandle() {
      toggler.value.checked = false
    }

    let toFun1 = function () {
      useToFun1(router)()
      closeToggler()
    }

    let toFun2 = function () {
      useToFun2(router)()
      closeToggler()
    }

    let showLogin = function () {
      goto(-1)
    }

    let showRegister = function () {
      goto(-2)
    }

    return {
      toggler,
      toFun1,
      toFun2,
      userState,
      exitLogin,
      showLogin,
      showRegister,
      InfoFilled,
      coverClickHandle,
    }
  },
}
</script>

<style scoped>
li {
  line-height: 16px;
}

ul {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.cover {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0;
  display: none;
}

.action-wrapper {
  /* display: inline-block; */
  float: right;
}

.el-button--text {
  font-size: 20px;
}

header {
  width: 100%;
  height: 44px;
  padding: 0 15px;
  background-color: #eee;
}

#toggler {
  display: none;
}

.hamburger-content {
  width: 20px;
  height: 10px;
  position: relative;
  margin: auto 0;
  display: inline-block;
  cursor: pointer;
  z-index: 999;
}

.hamburger-content > span {
  display: block;
  background-color: #000;
  height: 1px;
  border-radius: 1px;
  position: relative;
  transition: transform 0.2s ease-in-out, top 0.2s ease-in-out 0.2s;
  top: 0;
}

.hamburger-content > span:nth-child(2) {
  margin-top: 7px;
}

#toggler:checked + label .hamburger-content span:nth-child(1) {
  transform: rotate(45deg);
  transition: top 0.2s ease-in-out, transform 0.2s ease-in-out 0.2s;
  top: 4px;
}

#toggler:checked + label .hamburger-content span:nth-child(2) {
  transform: rotate(-45deg);
  transition: top 0.2s ease-in-out, transform 0.2s ease-in-out 0.2s;
  top: -4px;
}

.nav-container {
  background-color: rgba(182, 182, 182, 0.8);
  position: absolute;
  z-index: 9999;
  top: 60px;
  left: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 0.4s;
}

#toggler:checked ~ .nav-container {
  height: 30vh;
}
#toggler:checked ~ .cover {
  display: block;
}
</style>
