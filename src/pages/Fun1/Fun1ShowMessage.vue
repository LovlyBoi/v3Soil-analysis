<template>
  <div class="fun1-show-message">
    <!-- 大屏幕显示 -->
    <div class="hidden-xs-only">
      <!-- 土地指标 -->
      <el-descriptions title="土地指标" :column="3" size="medium" border>
        <el-descriptions-item
          v-for="item in measure_value"
          :key="item.value"
          width="160px"
          :label="item.label"
        >
          {{ item.value.value }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 施肥建议 -->
      <el-descriptions title="施肥建议" :column="3" size="medium" border>
        <el-descriptions-item label="建议施 N 量 (kg/亩)" width="160px">
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 P</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text sub">5</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">折算 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">SO</span
            ><span class="description-text sub">4</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_K2SO4 }}
        </el-descriptions-item>
        <el-descriptions-item label="折算 KCL 量 (kg/亩)" width="160px">
          {{ sug_KCL }}
        </el-descriptions-item>
        <el-descriptions-item label="折算二胺量 (kg/亩)" width="160px">
          {{ sug_erAn }}
        </el-descriptions-item>
        <el-descriptions-item label="折算尿素量 (kg/亩)" width="160px">
          {{ sug_niaoSu }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 小屏幕显示 -->
    <div class="hidden-sm-and-up">
      <!-- 土地指标 -->
      <el-descriptions title="土地指标" :column="2" size="medium" border>
        <el-descriptions-item
          v-for="item in measure_value"
          :key="item.value"
          width="160px"
          :label="item.label"
        >
          {{ item.value.value }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 施肥建议 -->
      <el-descriptions title="施肥建议" :column="2" size="medium" border>
        <el-descriptions-item label="建议施 N 量 (kg/亩)" width="160px">
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 P</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text sub">5</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">折算 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">SO</span
            ><span class="description-text sub">4</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_K2SO4 }}
        </el-descriptions-item>
        <el-descriptions-item label="折算 KCL 量 (kg/亩)" width="160px">
          {{ sug_KCL }}
        </el-descriptions-item>
        <el-descriptions-item label="折算二胺量 (kg/亩)" width="160px">
          {{ sug_erAn }}
        </el-descriptions-item>
        <el-descriptions-item label="折算尿素量 (kg/亩)" width="160px">
          {{ sug_niaoSu }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import {
  currJingwei,
  sugest_value,
  updateData,
  measure_value,
} from './state/fun1-state'
import { userState } from '../../hooks/useUserState'

export default {
  props: ['crop'],
  setup() {
    return {
      userState,
      ...sugest_value,
      measure_value,
      currJingwei,
      updateData,
    }
  },
}
</script>

<style scoped>
.el-descriptions {
  margin: 10px 0;
}

.description-text {
  font-weight: 700;
}

.sub {
  vertical-align: sub;
  font-size: 12px;
}
</style>
