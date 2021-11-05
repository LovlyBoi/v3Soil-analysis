<template>
  <div class="wrapper">
    <h3>输入成分，查看建议施肥量</h3>
    <!-- 头部查询组件 -->
    <div class="head-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="big-screen hidden-sm-and-down" style="margin-bottom: 30px">
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
import { ref, reactive } from "vue";
import { sendInfo } from "../api";
import { userState } from "../hooks/useUserState";
import message from "../hooks/useMessage"

export default {
  name: "Fun2",
  setup() {
    // 收集的数据
    const mea_Effective_N = ref("");
    const mea_Olsen_P = ref("");
    const mea_Olsen_K = ref("");
    const mea_Organic_matter = ref("");

    const options = reactive([
      {
        value: "大豆",
        label: "大豆",
      },
      {
        value: "玉米",
        label: "玉米",
      },
      {
        value: "小麦",
        label: "小麦",
      },
      {
        value: "香瓜",
        label: "香瓜",
      },
      {
        value: "糯玉米",
        label: "糯玉米",
      },
    ]);

    const crop = ref("大豆")

    // 服务器返回的数据
    const sug_Effective_N = ref("");
    const sug_Olsen_P = ref("");
    const sug_Olsen_K = ref("");
    const sug_Organic_matter = ref("");

    function clearInfo() {
      sug_Effective_N.value = "";
      sug_Olsen_P.value = "";
      sug_Olsen_K.value = "";
      sug_Organic_matter.value = "";
    }

    // 检查数据格式
    function checkDataRule(meaArr) {
      if (!Array.isArray(meaArr)) {
        return;
      }

      // 判断输入值的格式
      if (
        meaArr.some((item) => {
          // 如果有非空项
          return item === "" ? false : true;
        })
      ) {
        // 取到所有非空项
        let notEmptyItems = meaArr.filter((item) => {
          return item === "" ? false : true;
        });

        // 对所有非空项进行格式判断，只要有不合格的就进行提示
        if (
          notEmptyItems.some((item) => {
            return !/^\d+$|^\d*\.\d+$/g.test(item);
          })
        ) {
          message('error', "请输入正确格式的值")
          return false;
        }
        // 格式合格
        return true;
      }
      // 一项都没有输入，清空展示框
      else {
        clearInfo();
        return false;
      }
    }

    // 提交信息
    async function commitInfo() {
      // 装进数组里，方便下面判断
      let meaArr = [
        mea_Effective_N.value,
        mea_Olsen_P.value,
        mea_Olsen_K.value,
        mea_Organic_matter.value,
      ];

      // 判断是否登录
      if (!userState.value.isLogin) {
        message('error', '请先登录')
        return;
      }

      // 检测格式
      if (checkDataRule(meaArr)) {
        // 检测完格式了，发送请求
        let res = await sendInfo(...meaArr, crop.value);
        // console.log(res.data);
        res = res.data.data;
        if (res) {
          sug_Effective_N.value = res.sug_Effective_N;
          sug_Olsen_P.value = res.sug_Olsen_P;
          sug_Olsen_K.value = res.sug_Olsen_K;
          sug_Organic_matter.value = res.sug_Organic_matter;
        }
      }
    }

    return {
      mea_Effective_N,
      mea_Olsen_P,
      mea_Olsen_K,
      mea_Organic_matter,
      options,
      crop,
      sug_Effective_N,
      sug_Olsen_P,
      sug_Olsen_K,
      sug_Organic_matter,
      commitInfo
    };
  },
};
</script>

<style scoped>
h3 {
  letter-spacing: 1.5px;
  font-size: 1.5vw;
  margin-bottom: 20px;
}


</style>