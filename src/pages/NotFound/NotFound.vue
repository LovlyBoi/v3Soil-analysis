<template>
  <h2>Page Not Found</h2>
  <p>走错路了咩？</p>
  <p>
    <span class="path">/{{ $route.params.pathMatch }}</span> 路径不存在。。。
  </p>
  <div class="btn-table">
    <el-button type="primary" @click="backToFun1">返回首页</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useToFun1 } from '../../hooks/useToFun'
export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    const toFun1 = useToFun1(router)

    function backToFun1() {
      toFun1()
    }

    return { backToFun1 }
  },
}
</script>

<style scoped>
h2 {
  font-size: 22px;
  margin: 10px 0 30px 0;
  font-weight: bold;
}

p {
  margin: 10px;
}

.path {
  color: rgb(223, 96, 58);
  font-size: 16px;
}
</style>
