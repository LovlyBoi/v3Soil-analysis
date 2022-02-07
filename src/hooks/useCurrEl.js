// 用来展示组件
import { ref } from 'vue'

const currEl = ref(1)

// 设置高亮元素接口
function setCurrEl(newVal) {
  currEl.value = newVal
}

export { currEl, setCurrEl }
