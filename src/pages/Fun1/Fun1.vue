<template>
  <div class="fun1">
    <!-- 头部查询组件 -->
    <div class="query-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col :span="7">
          <div class="grid-content">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="jingwei.jing"
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
              v-model.trim="jingwei.wei"
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
      <el-row :gutter="10" class="hidden-md-and-up">
        <el-col :span="22" :offset="1">
          <div class="grid-content">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="jingwei.jing"
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
              v-model.trim="jingwei.wei"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="22" :offset="1">
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

    <!-- 查询结果展示组件 -->
    <div class="show-wrapper">
      <el-button
        v-if="userState.userInfo.role == 'expert'"
        size="small"
        type="primary"
        round
        style="float: right"
        @click="showUpdateTable = true"
      >
        修改数据
      </el-button>
      <el-descriptions
        class="margin-top"
        title="查询结果"
        :column="3"
        size="medium"
        border
      >
        <el-descriptions-item width="160px" label="乡/镇名称">
          {{ name_countryside }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="村名称">
          {{ name_village }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="土壤碱解氮含量">
          {{ mea_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item label="土壤有效磷含量">
          {{ mea_getOlsen_P }}
        </el-descriptions-item>
        <el-descriptions-item label="土壤速效钾含量">
          {{ mea_getOlsen_K }}
        </el-descriptions-item>
        <el-descriptions-item label="土壤有机质含量">
          {{ mea_getOrganic_matter }}
        </el-descriptions-item>
        <el-descriptions-item label="碱解氮的参考施肥量">
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item label="有效磷的参考施肥量">
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item label="速效钾的参考施肥量">
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item label="有机质的参考施肥量">
          {{ sug_Organic_matter }}
        </el-descriptions-item>
        <el-descriptions-item label="代替测量点的经度">
          {{ currJingwei.jing }}
        </el-descriptions-item>
        <el-descriptions-item label="代替测量点的纬度">
          {{ currJingwei.wei }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 专家修改弹出窗口 -->
    <el-drawer
      v-model="showUpdateTable"
      title="修改此次查询数据"
      direction="ltr"
      size="50%"
    >
      <el-table :data="updateData" style="width: 100%">
        <el-table-column label="属性" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="参考值" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.suggestValue }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Fun1Map from "./Fun1Map.vue";
import { ElMessageBox, ElLoading } from "element-plus";
import message from "../../hooks/useMessage";
import { userState } from "../../hooks/useUserState";
import { queryFun1, updateExpertSuggest } from "../../api";
import { options } from "./config/fun1-config";
import {
  clearInfo,
  assignResult,
  checkJingWeiRule,
  isOutOfBound,
} from "./utils";
import { info, updateData } from "./state/fun1-state";

export default {
  name: "Fun1",
  components: {
    Fun1Map,
  },
  setup() {
    let crop = ref("玉米");

    const mapRef = ref(null)

    // 本次查询的经纬度
    let currJingwei = reactive({
      jing: "",
      wei: "",
    });

    // 点击地图的经纬度
    const jingwei = reactive({
      jing: "",
      wei: "",
    });

    const showUpdateTable = ref(false);

    // 发送修改请求
    function updateSuggest(elementName, suggestValue) {
      let data = {
        // 本次查询的经纬度
        jing: currJingwei.jing + "",
        wei: currJingwei.wei + "",
        elementName,
        suggestValue: suggestValue + "",
        cropName: crop.value,
      };
      return updateExpertSuggest(data);
    }

    // 修改数据函数
    function handleEdit(index, row) {
      // 当前查询经纬度为空
      if (currJingwei.jing == "") {
        message("warning", "还没有查询哦~");
        return;
      }

      let loading = null;

      // 检查格式，然后发送请求
      ElMessageBox.prompt("请输入将要修改的值", "修改查询值", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // 匹配小数正则
        inputPattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
        inputErrorMessage: "格式错误",
      })
        .then(({ value }) => {
          // 小于0，不允许
          if (value < 0) {
            message("error", "不允许输入负值");
            return;
          }

          // 加载loading
          loading = ElLoading.service({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          // 发送修改请求
          return updateSuggest(row.elementName, value);
        })
        .then(
          (data) => {
            if (data.code != 200) {
              return Promise.reject(data);
            }

            // 重新获取数据
            return queryFun1(
              currJingwei.jing,
              currJingwei.wei,
              crop.value,
              // 这次查询不需要成功提示
              false,
              // 也不需要遮罩
              false
            );
          },
          (reason) => {
            message("error", "数据更新失败");
            console.warn("数据更新失败", reason);
          }
        )
        .then(
          (data) => {
            if (data.code != 200) {
              return Promise.reject(data);
            }
            // 拆包赋值，更新数据
            let res = data.data;
            assignResult(info, res);
          },
          (reason) => {
            message("error", "重新拉取数据失败");
            console.warn("重新拉取数据失败", reason);
          }
        )
        .finally(() => {
          loading.close();
        });
    }

    // 发送 fun1 查询
    function commitJingWei() {
      // 检查经纬度格式
      if (!checkJingWeiRule(jingwei.jing, jingwei.wei)) {
        return;
      }

      if (isOutOfBound(jingwei.jing, jingwei.wei)) {
        message("warning", "经纬度超出检测范围");
        return;
      }

      // 判断是否登录
      if (!userState.value.isLogin) {
        message("error", "请先登录");
        return;
      }

      // 清除展示框内的信息
      clearInfo(info, currJingwei);

      // 发送查询请求
      queryFun1(jingwei.jing, jingwei.wei, crop.value)
        // 成功
        .then((data) => {
          if (data.code != 200) {
            return Promise.reject(data);
          }
          let res = data.data;
          // 不是直接测量点
          if (res.isDirectMeasured === "false") {
            message(
              "warning",
              "暂无该地点的参考值，已为您寻找最近的参考点",
              4000
            );
          }

          // 赋值本次查询的值
          currJingwei.jing = res.min_Longitude;
          currJingwei.wei = res.min_Latitude;

          // 在地图上标记出来，注意精确查询是没有min值的
          let min_point = new window.TMap.LatLng(
            Number.parseFloat(res.min_Latitude || jingwei.wei),
            Number.parseFloat(res.min_Longitude || jingwei.jing)
          );

          mapRef.value.addNewMarker(min_point)

          // 数据赋值
          assignResult(info, res);
        })
        // 失败
        .catch((reason) => {
          console.warn("功能一查询失败", reason);
          message("error", "fun1查询失败");
        });
    }

    function mapClickHandle({ jing, wei }) {
      jingwei.jing = jing;
      jingwei.wei = wei;
    }

    return {
      mapRef,
      mapClickHandle,

      userState,
      jingwei,

      options,

      showUpdateTable,
      updateData,
      handleEdit,

      crop,
      ...info,
      
      currJingwei,
      commitJingWei,
    };
  },
};
</script>

<style scoped>
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
</style>
