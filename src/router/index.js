import { createRouter, createWebHashHistory } from 'vue-router'
import { setCurrEl } from '../hooks/useCurrEl'
import { userState } from '../hooks/useUserState'

// 映射关系
// 异步加载组件，打包时这几个组件会单独打包，提高首屏速度
const routes = [
  {
    path: '/',
    // 根路由重定向到fun1
    redirect: '/fun1',
  },
  {
    path: '/fun1',
    // import函数返回promise
    // 使用webpack的magic comment来指定打包名
    component: () =>
      import(/* webpackChunkName: "fun1-chunk" */ '../pages/Fun1/Fun1'),
  },
  {
    path: '/fun2',
    component: () =>
      import(/* webpackChunkName: "fun2-chunk" */ '../pages/Fun2/Fun2'),
  },
  {
    path: '/register',
    component: () =>
      import(
        /* webpackChunkName: "register-chunk" */ '../pages/Register/Register'
      ),
  },
  {
    path: '/login',
    component: () =>
      import(
        /* webpackChunkName: "user-login-chunk" */ '../pages/UserLogin/UserLogin'
      ),
  },
  {
    // 匹配不到的时候，匹配所有路径进这个route，展示404页面
    path: '/:pathMatch(.*)',
    component: () =>
      import(
        /* webpackChunkName: "not-found-chunk" */ '../pages/NotFound/NotFound'
      ),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 使用路由守卫来确保高亮元素不会因为修改url而不变
router.beforeEach((to) => {
  switch (to.path) {
    case '/fun1':
      setCurrEl(1)
      break
    case '/fun2':
      setCurrEl(2)
      break
    case '/login':
      if (userState.value.isLogin) {
        // 已经登录了，不进行跳转
        return false
      }
      setCurrEl(-1)
      break
    case '/register':
      if (userState.value.isLogin) {
        return false
      }
      setCurrEl(-2)
      break
    default:
      setCurrEl(0)
  }
})

export default router
