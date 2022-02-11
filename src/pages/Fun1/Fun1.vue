<template>
  <div class="fun1">
    <h2 class="hidden-sm-and-up title">智慧查询</h2>
    <!-- 头部查询组件 -->
    <div class="query-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="hidden-xs-only">
        <el-col :span="7">
          <div class="grid-content">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="mapJingwei.jing"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="7" :offset="1">
          <div class="grid-content">
            <el-input
              id="weidu"
              name="weidu"
              placeholder="请输入纬度"
              type="text"
              v-model.trim="mapJingwei.wei"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-button
          type="primary"
          plain
          @click="commitJingWei"
          style="margin-left: 4vw"
          >提交</el-button
        >
      </el-row>

      <!-- 小屏幕响应式 -->
      <el-row :gutter="10" class="hidden-sm-and-up">
        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="mapJingwei.jing"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="weidu"
              name="weidu"
              placeholder="请输入纬度"
              type="text"
              v-model.trim="mapJingwei.wei"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="16" :offset="1">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-button type="primary" plain @click="commitJingWei">提交</el-button>
      </el-row>
    </div>

    <!-- 地图组件 -->
    <fun-1-map @mapClick="mapClickHandle" ref="mapRef"></fun-1-map>

    <!-- 操作按钮组件 -->
    <fun-1-operate-pannel :crop="crop"></fun-1-operate-pannel>

    <!-- 查询结果展示组件 -->
    <fun-1-show-message :crop="crop"></fun-1-show-message>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import Fun1Map from './Fun1Map.vue'
import Fun1OperatePannel from './Fun1OperatePannel.vue'
import Fun1ShowMessage from './Fun1ShowMessage.vue'
import message from '../../hooks/useMessage'
import { userState } from '../../hooks/useUserState'
import { queryFun1, getCrops } from '../../api'
import { options, addOptions } from './config/fun1-config'
import {
  clearInfo,
  assignResult,
  checkJingWeiRule,
  isOutOfBound,
  addPoint,
} from './utils'
import { info, currJingwei, QueryRecord } from './state/fun1-state'

export default {
  name: 'Fun1',
  components: {
    Fun1Map,
    Fun1ShowMessage,
    Fun1OperatePannel,
  },
  setup() {
    let crop = ref('')
    getCrops()
      .then((value) => {
        if (value.code === 200) {
          addOptions(value.data)
          crop.value = value.data[0]
        } else {
          message('error', value.msg)
          console.warn('获取作物code非200', value)
        }
      })
      .catch((err) => {
        message('error', '作物获取失败')
        console.warn(err)
      })

    const mapRef = ref(null)

    // 点击地图的经纬度
    const mapJingwei = reactive({
      jing: '',
      wei: '',
    })

    // 挂载时初始化历史记录
    QueryRecord.init()

    // 发送 fun1 查询
    function commitJingWei() {
      // 检查经纬度格式
      if (!checkJingWeiRule(mapJingwei.jing, mapJingwei.wei)) {
        return
      }

      if (isOutOfBound(mapJingwei.jing, mapJingwei.wei)) {
        message('warning', '经纬度超出检测范围')
        return
      }

      // 判断是否登录
      if (!userState.value.isLogin) {
        message('error', '请先登录')
        return
      }

      // 清除展示框内的信息
      clearInfo(info, currJingwei)

      // 发送查询请求
      const queryData = {
        longitude: mapJingwei.jing + '',
        latitude: mapJingwei.wei + '',
        cropName: crop.value,
      }
      queryFun1(queryData)
        // 成功
        .then((data) => {
          if (data.code !== 200) {
            return Promise.reject(data)
          }
          let res = data.data
          // 不是直接测量点，什么都不做
          if (!JSON.parse(res.isDirectMeasured)) {
            // message(
            //   "warning",
            //   "暂无该地点的参考值，已为您寻找最近的参考点",
            //   4000
            // );
          }

          // 赋值本次查询的值
          currJingwei.jing = res.min_Longitude
          currJingwei.wei = res.min_Latitude

          let wei = res.min_Latitude ?? mapJingwei.wei
          let jing = res.min_Longitude ?? mapJingwei.jing
          // 在地图上加点
          addPoint(mapRef, jing, wei)

          // 数据赋值
          assignResult(info, res)

          // 生成查询记录
          new QueryRecord(queryData, res)
        })
        // 失败
        .catch((reason) => {
          console.warn('功能一查询失败', reason)
          message('error', 'fun1查询失败')
        })
    }

    function mapClickHandle({ jing, wei }) {
      mapJingwei.jing = jing
      mapJingwei.wei = wei
    }

    return {
      mapRef,
      mapClickHandle,
      mapJingwei,
      options,
      crop,
      commitJingWei,
    }
  },
}
</script>

<style scoped>
.title {
  letter-spacing: 1.5px;
  font-size: 25px;
  margin-bottom: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.fun1 {
  line-height: 18px;
}

.show-wrapper {
  margin-top: 15px;
}

.btn-wrapper {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
</style>
