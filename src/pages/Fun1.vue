<template>
  <div class="wrapper">
    <!-- 头部查询组件 -->
    <div class="head-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col :span="7">
          <div class="grid-content jingdu-box">
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
          <div class="grid-content weidu-box">
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
          <div class="grid-content jingdu-box">
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
          <div class="grid-content weidu-box">
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
    <div class="map-wrapper">
      <div id="map-container"></div>
    </div>
    <!-- 查询结果展示组件 -->
    <div class="show-wrapper">
      <el-button
        v-if="userState.userInfo.role == 'expert'"
        size="small"
        type="primary"
        round
        style="float: right"
        @click="updateTable = true"
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
      v-model="updateTable"
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
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElLoading } from "element-plus";
import message from "../hooks/useMessage";
import { userState } from "../hooks/useUserState";
import { queryFun1, updateExpertSuggest } from "../api";

let map = null,
  markers = null;

export default {
  name: "Fun1",
  setup() {
    let crop = ref("玉米");
    let name_countryside = ref("");
    let name_village = ref("");
    let mea_Effective_N = ref("");
    let mea_getOlsen_P = ref("");
    let mea_getOlsen_K = ref("");
    let mea_getOrganic_matter = ref("");
    let sug_Effective_N = ref("");
    let sug_Olsen_P = ref("");
    let sug_Olsen_K = ref("");
    let sug_Organic_matter = ref("");
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

    const updateTable = ref(false);

    // 专家修改数据
    const updateData = ref([
      {
        name: "碱解氮",
        elementName: "Effective_N",
        // 值为ref对象，所以是会自己跟着改的
        suggestValue: sug_Effective_N,
      },
      {
        name: "有效磷",
        elementName: "Olsen_P",
        suggestValue: sug_Olsen_P,
      },
      {
        name: "速效钾",
        elementName: "Olsen_K",
        suggestValue: sug_Olsen_K,
      },
      {
        name: "有机质",
        elementName: "organic_matter",
        suggestValue: sug_Organic_matter,
      },
    ]);

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
      console.log(index, row);

      // 当前查询经纬度为空
      if (currJingwei.jing == "") {
        message("warning", "还没有查询哦~");
        return;
      }

      // 检查格式，然后发送请求
      ElMessageBox.prompt("请输入将要修改的值", "修改查询值", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // 匹配小数正则
        inputPattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
        inputErrorMessage: "格式错误",
      })
      .then(({ value }) => {
        let suggestValue = value;

        if (value < 0) {
          // 小于0，不允许
          message("error", "不允许输入负值");
          return;
        }

        // 加载loading
        const loading = ElLoading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        // 发送修改请求
        updateSuggest(row.elementName, suggestValue)
          .then(
            ({ data }) => {
              if(data.code != 200){
                return Promise.reject(data)
              }
              // 再开一个loading
              const loading2 = ElLoading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              // 重新获取数据
              queryFun1(currJingwei.jing, currJingwei.wei, crop.value)
                .then(
                  ({ data }) => {
                    if(data.code != 200){
                      return Promise.reject(data)
                    }
                    // 拆包赋值，更新数据
                    let res = data.data;
                    assignResult(res);
                  }
                )
                .catch(
                  (reason) => {
                    message("error", "重新拉取数据失败");
                    console.warn("重新拉取数据失败", reason);
                  }
                )
                .finally(() => {
                  // 关闭loading
                  loading2.close();
                });
            },
            (reason) => {
              console.log(reason);
            }
          )
          .catch(reason => {
            message("error", "数据更新失败");
            console.warn("数据更新失败", reason);
          })
          .finally(() => {
            loading.close();
          });
      });
    }

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

    // 清除所有信息
    function clearInfo() {
      name_countryside.value = "";
      name_village.value = "";
      mea_Effective_N.value = "";
      mea_getOlsen_P.value = "";
      mea_getOlsen_K.value = "";
      mea_getOrganic_matter.value = "";
      sug_Effective_N.value = "";
      sug_Olsen_P.value = "";
      sug_Olsen_K.value = "";
      sug_Organic_matter.value = "";
      currJingwei.jing = "";
      currJingwei.wei = "";
    }

    // 抽离赋值语句
    function assignResult(res) {
      name_countryside.value = res.name_countryside;
      name_village.value = res.name_village;

      mea_Effective_N.value = res.mea_Effective_N;
      mea_getOlsen_P.value = res.mea_getOlsen_P;
      mea_getOlsen_K.value = res.mea_getOlsen_K;
      mea_getOrganic_matter.value = res.mea_getOrganic_matter;

      sug_Effective_N.value = res.sug_Effective_N;
      sug_Olsen_P.value = res.sug_Olsen_P;
      sug_Olsen_K.value = res.sug_Olsen_K;
      sug_Organic_matter.value = res.sug_Organic_matter;
    }

    // 抽离检查语句
    function checkJingWeiRule(jing, wei) {
      // 判断是否输入了经纬度
      if (jing === "") {
        if (wei !== "") {
          message("warning", "请输入经度");
          return false;
        } else {
          clearInfo();
          message("warning", "请先选择一个点，或填写经纬度", 2000);
          return false;
        }
      } else {
        if (wei === "") {
          message("warning", "请输入纬度");
          return false;
        }
      }

      // 判断经纬度格式
      if (
        /^\d+$|^\d*\.\d+$/g.test(jing) !== true ||
        /^\d+$|^\d*\.\d+$/g.test(wei) !== true
      ) {
        message("error", "经纬度格式不正确");
        return false;
      }

      // 判断经纬度数值大小
      if (
        Number.parseFloat(jing) < 0 ||
        Number.parseFloat(jing) >= 180 ||
        Number.parseFloat(wei) < 0 ||
        Number.parseFloat(wei) >= 90
      ) {
        message("error", "请输入正确的经纬度");
        return false;
      }

      // 检查完返回true
      return true;
    }

    // 查看点是否越界
    function isOutOfBound(jing, wei) {
      if (jing < 124.48 || jing > 125.48) {
        return true;
      }
      if (wei < 45.35 || wei > 46.16) {
        return true;
      }
      return false;
    }

    // 发送 fun1 查询
    function commitJingWei() {
      // 检查经纬度格式
      if (!checkJingWeiRule(jingwei.jing, jingwei.wei)) {
        return;
      }

      // 判断是否登录
      if (!userState.value.isLogin) {
        message("error", "请先登录");
        return;
      }

      // 清除展示框内的信息
      clearInfo();

      // 遮罩层打开
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // 发送查询请求
      queryFun1(jingwei.jing, jingwei.wei, crop.value)
      // 成功
      .then(({ data }) => {
        if(data.code != 200){
          return Promise.reject(data)
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
        markers.remove(["min_Marker"]);
        markers.add([
          {
            id: "min_Marker",
            styleId: "redMarker",
            position: min_point,
          },
        ]);

        // 数据赋值
        assignResult(res);
      })
      // 失败
      .catch(reason => {
        console.warn("fun1查询失败", reason)
        message('error', 'fun1查询失败')
      })
      // 最后关闭遮罩
      .finally(() => {
        loading.close()
      })
    }

    // 初始化地图
    function initMap() {
      let TMap = window.TMap;

      //定义地图中心点坐标
      let center = new TMap.LatLng(45.755, 124.98);

      let mapContainer = document.getElementById("map-container");

      //定义map变量，调用 TMap.Map() 构造函数创建地图
      map = new TMap.Map(mapContainer, {
        center: center, //设置地图中心点坐标
        zoom: 11.5, //设置地图缩放级别
        pitch: 20, //设置俯仰角
        rotation: 0, //设置地图旋转角度
      });

      // 点击任何位置添加一个蓝色标记点
      map.on("click", (evt) => {
        const jing = evt.latLng.getLng().toFixed(6);
        const wei = evt.latLng.getLat().toFixed(6);
        // 检查经纬度越界
        if (isOutOfBound(jing, wei)) {
          message("warning", "经纬度超出检测范围");
          return;
        }
        markers.remove(["userMarker"]);
        markers.add([
          {
            id: "userMarker",
            styleId: "blueMarker",
            position: evt.latLng,
          },
        ]);
        // 拿到点击的经纬度
        jingwei.jing = jing;
        jingwei.wei = wei;
        // console.log(jingwei)
      });

      // 标记点层
      markers = new TMap.MultiMarker({
        id: "marker-layer", //图层id
        map,
        styles: {
          //点标注的相关样式
          // 红色标记点样式
          redMarker: new TMap.MarkerStyle({
            width: 25,
            height: 25,
            anchor: { x: 16, y: 32 },
            // src: "public/img/map-marker-red.png",
          }),
          // 蓝色标记点样式
          blueMarker: new TMap.MarkerStyle({
            width: 25,
            height: 25,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
          }),
        },
        geometries: [],
      });
    }

    onMounted(() => {
      // 异步加载地图
      const mapScript = document.createElement("script");
      mapScript.type = "text/javascript";
      mapScript.src =
        "https://map.qq.com/api/gljs?v=1.exp&key=YUJBZ-BPQ3U-ED5V6-47KRA-BJJA6-VBBPM";
      document.body.appendChild(mapScript);
      mapScript.onload = () => {
        //加载完成后初始化地图
        initMap();
      };
    });

    return {
      userState,
      jingwei,

      options,

      updateTable,
      updateData,
      handleEdit,

      crop,

      name_countryside,
      name_village,
      mea_Effective_N,
      mea_getOlsen_P,
      mea_getOlsen_K,
      mea_getOrganic_matter,
      sug_Effective_N,
      sug_Olsen_P,
      sug_Olsen_K,
      sug_Organic_matter,

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

.wrapper {
  line-height: 18px;
}

.map-wrapper {
  width: 100%;
  height: 400px;
  margin-top: 15px;
  background-color: rgb(141, 148, 168);
}

#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.show-wrapper {
  margin-top: 15px;
}
</style>

