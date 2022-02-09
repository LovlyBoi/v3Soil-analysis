import { setCurrEl } from './useCurrEl'

function useToFun1(router) {
  return function toFun1() {
    // 设置高亮元素
    setCurrEl(1)
    // 路由跳转
    router.replace('/fun1').catch((e) => e)
  }
}

function useToFun2(router) {
  return function toFun2() {
    // 设置高亮元素
    setCurrEl(2)
    // 路由跳转
    router.replace('/fun2').catch((e) => e)
  }
}

function useGoto(router) {
  return function goto(num) {
    switch (num) {
      case 1:
        setCurrEl(1)
        router.replace('/fun1').catch((e) => console.log(e))
        break
      case 2:
        setCurrEl(2)
        router.replace('/fun2').catch((e) => e)
        break
      case -1:
        setCurrEl(-1)
        router.replace('/login').catch((e) => e)
        break
      case -2:
        setCurrEl(-2)
        router.replace('/register').catch((e) => e)
        break
      default:
        break
    }
  }
}

export { useToFun1, useToFun2, useGoto }
