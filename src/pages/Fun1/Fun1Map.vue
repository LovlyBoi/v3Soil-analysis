<template>
  <!-- 地图组件 -->
  <div class="map-wrapper">
    <div id="map-container"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import message from "../../hooks/useMessage";
import { isOutOfBound } from "./utils";

let map = null,
  markers = null;

export default {
  emits: ["mapClick"],
  setup(_, context) {
    function addNewMarker(position) {
      markers.remove(["min_Marker"]);
      markers.add([
        {
          id: "min_Marker",
          styleId: "redMarker",
          position,
        },
      ]);
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
        context.emit("mapClick", { jing, wei });
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
      addNewMarker,
    };
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .map-wrapper {
    width: 100%;
    height: 40vh;
    margin-top: 15px;
    background-color: rgb(141, 148, 168);
  }
}
@media only screen and (min-width: 768px) {
  .map-wrapper {
    width: 100%;
    height: 400px;
    margin-top: 15px;
    background-color: rgb(141, 148, 168);
  }
}

#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
