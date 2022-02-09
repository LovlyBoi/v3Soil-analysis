<template>
  <div class="head-wrapper">
    <h1 class="title">智能施肥</h1>
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
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { InfoFilled } from '@element-plus/icons'
import { currEl } from '../hooks/useCurrEl'
import { userState } from '../hooks/useUserState'
import { useGoto } from '../hooks/useToFun'
import exitLogin from '../hooks/useExitLogin'
import { cache } from '../utils/cache'

export default {
  name: 'HeaderCom',
  setup() {
    // 拿到router
    const router = useRouter()
    const goto = useGoto(router)

    // 登录点击事件
    function showLogin() {
      goto(-1)
    }

    // 注册点击事件
    function showRegister() {
      goto(-2)
    }

    // 优先去去 userState 找，没有再本地存储中找，再没有返回 “尊敬的客户”，这样避免了切换用户时得刷新才能拿到数据（不知道怎么把本地存储变成响应式）
    const username = computed(() => {
      if (window.localStorage) {
        return (
          userState.value.userInfo.username ||
          cache.getCache('username') ||
          '尊敬的客户'
        )
      } else {
        return userState.value.userInfo.username || '尊敬的客户'
      }
    })

    return {
      currEl,
      showLogin,
      exitLogin,
      showRegister,
      username,
      userState,
      InfoFilled,
    }
  },
}
</script>

<style scoped>
.head-wrapper {
  display: flex;
  justify-content: space-between;
}

.title {
  width: 140px;
  font-size: 32px;
  letter-spacing: 3px;
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translateX(-70px);
}

#logina,
#zhuce {
  margin: 0 10px;
}

#logina:hover,
#zhucea:hover {
  transition: all 300ms;
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
