import { ref, reactive } from 'vue'

const info = {
  name_countryside: ref(""),
  name_village: ref(""),

  mea_Effective_N: ref(""),
  mea_getOlsen_P: ref(""),
  mea_getOlsen_K: ref(""),
  mea_getOrganic_matter: ref(""),

  sug_Effective_N: ref(""),
  sug_Olsen_P: ref(""),
  sug_Olsen_K: ref(""),
  sug_Organic_matter: ref("")
}

// 专家修改数据
const updateData = ref([
  {
    name: "碱解氮",
    elementName: "Effective_N",
    // 值为ref对象，所以是会自己跟着改的
    suggestValue: info.sug_Effective_N,
  },
  {
    name: "有效磷",
    elementName: "Olsen_P",
    suggestValue: info.sug_Olsen_P,
  },
  {
    name: "速效钾",
    elementName: "Olsen_K",
    suggestValue: info.sug_Olsen_K,
  },
  // {
  //   name: "有机质",
  //   elementName: "organic_matter",
  //   suggestValue: info.sug_Organic_matter,
  // },
]);

// 本次查询的经纬度
let currJingwei = reactive({
  jing: "",
  wei: "",
});

export {
  info,
  updateData,
  currJingwei
}