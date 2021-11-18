<template>
  <h2>Page Not Found</h2>
  <p>走错路了咩？</p>
  <p><span class="path">/{{$route.params.pathMatch}}</span> 路径不存在。。。请检查路径后刷新重试</p>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
h2{
  font-size: 22px;
  margin: 10px 0 30px 0;
  font-weight: bold;
}

p{
  margin: 10px;
}

.path{
  color: rgb(223, 96, 58);
  font-size: 16px;
}
</style>