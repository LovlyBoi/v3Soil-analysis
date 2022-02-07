<template>
  <div class="fun2">
    <h2>输入成分，查看建议施肥量</h2>
    <!-- 头部查询组件 -->
    <div class="head-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row
        :gutter="10"
        class="big-screen hidden-sm-and-down"
        style="margin-bottom: 30px"
      >
        <el-col :span="4">
          <div class="grid-content">
            <el-input
              id="MEN"
              name="MEN"
              placeholder="碱解氮含量"
              type="text"
              v-model="mea_Effective_N"
            />
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content">
            <el-input
              id="MGP"
              name="MGP"
              placeholder="有效磷含量"
              type="text"
              v-model="mea_Olsen_P"
            />
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content">
            <el-input
              id="MGK"
              name="MGKMGM"
              placeholder="速效钾含量"
              type="text"
              v-model="mea_Olsen_K"
            />
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content">
            <el-input
              id="MGM"
              name="MGM"
              placeholder="有机质含量"
              type="text"
              v-model="mea_Organic_matter"
            />
          </div>
        </el-col>

        <el-col :span="4">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-button
          type="primary"
          plain
          @click="commitInfo"
          style="margin-left: 4vw"
          >提交</el-button
        >
      </el-row>

      <!-- 小屏幕响应式 -->
      <el-row :gutter="10" class="small-screen hidden-md-and-up">
        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="MEN"
              name="MEN"
              placeholder="破解氮含量"
              type="text"
              v-model="mea_Effective_N"
            />
          </div>
        </el-col>

        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="MGP"
              name="MGP"
              placeholder="有效磷含量"
              type="text"
              v-model="mea_Olsen_P"
            />
          </div>
        </el-col>
        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="MGK"
              name="MGKMGM"
              placeholder="速效钾含量"
              type="text"
              v-model="mea_Olsen_K"
            />
          </div>
        </el-col>
        <el-col :span="22" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGM"
              name="MGM"
              placeholder="有机质含量"
              type="text"
              v-model="mea_Organic_matter"
            />
          </div>
        </el-col>

        <el-col :span="14" :offset="1" style="margin-bottom: 30px">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-button
          type="primary"
          plain
          @click="commitInfo"
          style="margin-bottom: 30px"
        >
          提交
        </el-button>
      </el-row>
    </div>

    <!-- 查询结果展示组件 -->
    <div class="show-wrapper">
      <el-descriptions
        class="margin-top"
        title="查询结果"
        :column="2"
        size="medium"
        border
      >
        <el-descriptions-item width="150px" label="碱解氮的参考值">
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item width="150px" label="有效磷的参考值">
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item label="速效钾的参考值">
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item label="有机质的参考值">
          {{ sug_Organic_matter }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { queryFun2 } from '../../api'
import { userState } from '../../hooks/useUserState'
import message from '../../hooks/useMessage'
import { options } from './config/fun2-config'
import { data as state } from './state/fun2-state'
import { checkDataRule, assignResult } from './utils'

export default {
  name: 'Fun2',
  setup() {
    const crop = ref('大豆')

    // 提交信息
    function commitInfo() {
      // 判断是否登录
      if (!userState.value.isLogin) {
        message('error', '请先登录')
        return
      }

      // 装进数组里，方便下面判断
      let meaArr = [
        state.mea_Effective_N.value,
        state.mea_Olsen_P.value,
        state.mea_Olsen_K.value,
        state.mea_Organic_matter.value,
      ]

      // 检测格式
      if (!checkDataRule(meaArr)) {
        return
      }

      // 检测完格式了，发送请求
      queryFun2(...meaArr, crop.value)
        .then((data) => {
          if (data.code !== 200) {
            return Promise.reject(data)
          }
          let res = data.data
          assignResult(state, res)
          message('success', '查询成功')
        })
        .catch((reason) => {
          message('error', '功能二查询失败')
          console.warn('fun2查询失败', reason)
        })
    }

    return {
      ...state,
      options,
      crop,
      commitInfo,
    }
  },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  h2 {
    letter-spacing: 1.5px;
    font-size: 20px;
    margin-bottom: 20px;
  }
}
@media only screen and (min-width: 768px) {
  h2 {
    letter-spacing: 1.5px;
    font-size: 25px;
    margin-bottom: 20px;
  }
}
</style>
