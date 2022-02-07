<template>
  <div class="side-bar">
    <el-menu default-active="1" @select="handleSelect">
      <el-menu-item index="1">
        <el-icon><map-location /></el-icon>
        <span>查成分</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><pie-chart /></el-icon>
        <span>建议量</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { MapLocation, PieChart } from '@element-plus/icons'
import { currEl } from '../hooks/useCurrEl'
import { useGoto } from '../hooks/useToFun'

export default {
  name: 'SideBar',
  components: {
    MapLocation,
    PieChart,
  },
  setup() {
    const router = useRouter()

    const goto = useGoto(router)

    function handleSelect(index) {
      index = Number.parseInt(index)
      goto(index)
    }

    return {
      currEl,
      handleSelect,
    }
  },
}
</script>

<style scoped>
.el-menu-item {
  margin: 3px;
  background-color: #eee;
  display: block;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
}

.el-menu-item:hover {
  background-color: #ccc;
}

.is-active {
  background-color: #ccc;
}
</style>
