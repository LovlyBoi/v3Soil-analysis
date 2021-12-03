<template>
  <button @click="handleBtn1">开始 data1</button>
  <button @click="handleBtn2">开始 data2</button>
  <button @click="handleBtn3">data1 data2 混合</button>
</template>

<script>
export default {
  name: "test",
  setup() {
    let testNum = 100;
    let data1 = {
      longitude: "125.104001",
      latitude: "45.731155",
      cropName: "玉米",
    };
    let data2 = {
      longitude: "125.063053",
      latitude: "45.749454",
      cropName: "玉米",
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let correctData2 = {
      mea_organic_matter: 29.3,
      mea_Olsen_K: 181.0,
      mea_Olsen_P: 15.9,
      sug_Olsen_K: 4.2,
      sug_organic_matter: "无参考值",
      sug_Effective_N: 4.0,
      mea_ph: 8.0,
      sug_Olsen_P: 4.9,
      mea_Effective_N: 136.8,
    };
    let correctData1 = {
      mea_organic_matter: 25.7,
      mea_Olsen_K: 161.0,
      mea_Olsen_P: 7.1,
      sug_Olsen_K: 4.5,
      sug_Effective_N: 12.5,
      mea_ph: 8.0,
      sug_Olsen_P: 5.2,
      mea_Effective_N: 118.5,
    };

    function checkData(data, res) {
      for (const key in data) {
        if (res[key] != data[key]) {
          console.log(`数据出错，正确：${key}, ${data[key]}，响应：${key}, ${res[key]}`)
          return false;
        }
      }
      return true;
    }

    function handleBtn1() {
      for (let i = 0; i < testNum; i++) {
        fetch("/api/fun1", {
          method: "post",
          headers: myHeaders,
          body: JSON.stringify(data1),
        })
          .then((val) => {
            return val.json();
          })
          .then((val) => {
            if(!checkData(correctData1, val.data)){
              console.log(`数据出错`)
            }
            console.log(val);
          })
          .catch((reason) => {
            console.log(reason);
          });
      }
    }
    function handleBtn2() {
      for (let i = 0; i < testNum; i++) {
        fetch("/api/fun1", {
          method: "post",
          headers: myHeaders,
          body: JSON.stringify(data2),
        })
          .then((val) => {
            return val.json();
          })
          .then((val) => {
            if(!checkData(correctData2, val.data)){
              console.log('数据出错')
            }
            console.log(val);
          })
          .catch((reason) => {
            console.log(reason);
          });
      }
    }
    function handleBtn3() {
      for (let i = 0; i < testNum; i++) {
        let data = data1;
        if (i % 2 == 0) {
          data = data2;
        }
        if(i == 0){
          console.log(Date.now())
        }
        fetch("/api/fun1", {
          method: "post",
          headers: myHeaders,
          body: JSON.stringify(data),
        })
          .then((val) => {
            if(i == testNum - 1){
              console.log(Date.now())
            }
            return val.json();
          })
          .then((val) => {
            
            if (i % 2 == 0) {
              if(!checkData(correctData2, val.data)){
                console.log('数据出错2')
              }
            } else {
              if(!checkData(correctData1, val.data)){
                console.log('数据出错1')
              }
            }
          })
          .catch((reason) => {
            console.log(reason);
          });
      }
    }
    return {
      handleBtn1,
      handleBtn2,
      handleBtn3,
    };
  },
};
</script>

<style></style>
