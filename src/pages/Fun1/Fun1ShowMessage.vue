<template>
  <div class="fun1-show-message">
    <!-- 大屏幕显示 -->
    <div class="hidden-xs-only">
      <!-- 土地指标 -->
      <el-descriptions title="土地指标" :column="3" size="medium" border>
        <el-descriptions-item width="160px" label="乡/镇名称">
          {{ name_countryside }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="村名称">
          {{ name_village }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="PH 值">
          {{ mea_ph }}
        </el-descriptions-item>
        <el-descriptions-item label="碱解氮含量 (mg/kg)">
          {{ mea_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item label="有效磷含量 (mg/kg)">
          {{ mea_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item label="速效钾含量 (mg/kg)">
          {{ mea_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item label="有机质含量 (g/kg)">
          {{ mea_Organic_matter }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="代替测量点的经度">
          {{ currJingwei.jing }}
        </el-descriptions-item>
        <el-descriptions-item label="代替测量点的纬度">
          {{ currJingwei.wei }}
        </el-descriptions-item> -->
      </el-descriptions>

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
        <!-- <el-descriptions-item label="施 P2O5 量 kg/亩">
          {{ sug_Olsen_P }}
        </el-descriptions-item> -->
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="有机质的参考施肥量">
          {{ sug_Organic_matter }}
        </el-descriptions-item> -->
      </el-descriptions>
    </div>

    <!-- 小屏幕显示 -->
    <div class="hidden-sm-and-up">
      <!-- 土地指标 -->
      <el-descriptions title="土地指标" :column="2" size="medium" border>
        <el-descriptions-item width="160px" label="乡/镇名称">
          {{ name_countryside }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="村名称">
          {{ name_village }}
        </el-descriptions-item>
        <el-descriptions-item width="160px" label="PH 值">
          {{ mea_ph }}
        </el-descriptions-item>
        <el-descriptions-item label="碱解氮含量 (mg/kg)">
          {{ mea_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item label="有效磷含量 (mg/kg)">
          {{ mea_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item label="速效钾含量 (mg/kg)">
          {{ mea_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item label="有机质含量 (g/kg)">
          {{ mea_Organic_matter }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="代替测量点的经度">
          {{ currJingwei.jing }}
        </el-descriptions-item>
        <el-descriptions-item label="代替测量点的纬度">
          {{ currJingwei.wei }}
        </el-descriptions-item> -->
      </el-descriptions>

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
        <!-- <el-descriptions-item label="施 P2O5 量 kg/亩">
          {{ sug_Olsen_P }}
        </el-descriptions-item> -->
        <el-descriptions-item width="160px">
          <template #label>
            <span class="description-text">建议施 K</span
            ><span class="description-text sub">2</span
            ><span class="description-text">O</span
            ><span class="description-text"> 量 (kg/亩)</span>
          </template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="有机质的参考施肥量">
          {{ sug_Organic_matter }}
        </el-descriptions-item> -->
      </el-descriptions>
    </div>
  </div>

  <!-- 专家修改弹出窗口 -->
  <el-drawer
    v-model="showUpdateTable"
    title="修改此次查询数据"
    direction="ltr"
    size="50%"
  >
    <el-table :data="updateData" style="width: 100%">
      <el-table-column label="属性" min-width="70">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="参考值" min-width="70">
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
</template>

<script>
import { ref } from "vue";
import { ElMessageBox, ElLoading } from "element-plus";
import message from "../../hooks/useMessage";
import { queryFun1, updateExpertSuggest } from "../../api";
import { currJingwei, info, updateData } from "./state/fun1-state";
import { assignResult } from "./utils";
import { userState } from "../../hooks/useUserState";

export default {
  props: ["crop"],
  setup(props) {
    const showUpdateTable = ref(false);

    // 发送修改请求
    function updateSuggest(elementName, suggestValue) {
      let data = {
        // 本次查询的经纬度
        jing: currJingwei.jing + "",
        wei: currJingwei.wei + "",
        elementName,
        suggestValue: suggestValue + "",
        cropName: props.crop,
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
              props.crop,
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

    return {
      showUpdateTable,
      handleEdit,
      userState,
      ...info,
      currJingwei,
      updateData,
    };
  },
};
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
