<template>
  <div class="side-bar-wrapper">
    <div>
      <el-row type="flex" justify="center" style="margin: 3px 0">
        <el-col :span="23">
          <!-- 通过数字来确定高亮元素 -->
          <div
            :class="{
              active: currEl === 1,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
          >
            <a href="javascript:;" @click="toFun1(1)">查成分</a>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="23">
          <div
            :class="{
              active: currEl === 2,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
          >
            <a href="javascript:;" @click="toFun2(2)">建议量</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { currEl, setCurrEl } from "../hooks/useCurrEl";

export default {
  name: "SideBar",
  setup() {
    const router = useRouter();

    function toFun1(num) {
      // 设置高亮元素
      setCurrEl(num);
      // 路由跳转
      router.replace("/fun1").catch((e) => e);
    }

    function toFun2(num) {
      // 设置高亮元素
      setCurrEl(num);
      // 路由跳转
      router.replace("/fun2").catch((e) => e);
    }

    return {
      currEl,
      toFun1,
      toFun2,
    };
  },
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #e9eef3;
}

.grid-content {
  border-radius: 5px;
  min-height: 36px;
}

.grid-content > a {
  display: inline-block;
  width: 100%;
  line-height: 36px;
}

.grid-content:hover a {
  transition: all 150ms;
  color: #409eff;
}

.active {
  background-color: #b5c0ce;
}

.active a {
  color: #409eff;
}
</style>