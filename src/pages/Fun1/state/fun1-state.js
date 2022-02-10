import { ref, reactive } from 'vue'
import { QueryRecord } from './querHistory'

const info = {
  name_countryside: ref(''),
  name_village: ref(''),

  mea_Effective_N: ref(''),
  mea_Olsen_P: ref(''),
  mea_Olsen_K: ref(''),
  mea_Organic_matter: ref(''),
  mea_ph: ref(''),

  sug_Effective_N: ref(''),
  sug_Olsen_P: ref(''),
  sug_Olsen_K: ref(''),
  sug_Organic_matter: ref(''),

  sug_niaoSu: ref(''),
  sug_erAn: ref(''),
  sug_KCL: ref(''),
  sug_K2SO4: ref(''),
}

const sugest_value = {
  sug_Effective_N: info.sug_Effective_N,
  sug_Olsen_P: info.sug_Olsen_P,
  sug_Olsen_K: info.sug_Olsen_P,
  sug_Organic_matter: info.sug_Olsen_P,
  sug_niaoSu: info.sug_niaoSu,
  sug_erAn: info.sug_erAn,
  sug_KCL: info.sug_KCL,
  sug_K2SO4: info.sug_K2SO4,
}

// 本次查询的经纬度
let currJingwei = reactive({
  jing: '',
  wei: '',
})

// 给第一个数据展示遍历item用的
const measure_value = [
  {
    label: '乡/镇名称',
    value: info.name_countryside,
  },
  {
    label: '村名称',
    value: info.name_village,
  },
  {
    label: 'pH 值',
    value: info.mea_ph,
  },
  {
    label: '碱解氮含量 (mg/kg)',
    value: info.mea_Effective_N,
  },
  {
    label: '有效磷含量 (mg/kg)',
    value: info.mea_Olsen_P,
  },
  {
    label: '速效钾含量 (mg/kg)',
    value: info.mea_Olsen_K,
  },
  {
    label: '有机质含量 (g/kg)',
    value: info.mea_Organic_matter,
  },
  // {
  //   label: '代替测量点的经度',
  //   value: currJingwei.jing
  // },
  // {
  //   label: '代替测量点的纬度',
  //   value: currJingwei.wei
  // },
]

// 专家修改数据
const updateData = ref([
  {
    name: '碱解氮',
    elementName: 'Effective_N',
    // 值为ref对象，所以是会自己跟着改的
    suggestValue: info.sug_Effective_N,
  },
  {
    name: '有效磷',
    elementName: 'Olsen_P',
    suggestValue: info.sug_Olsen_P,
  },
  {
    name: '速效钾',
    elementName: 'Olsen_K',
    suggestValue: info.sug_Olsen_K,
  },
])

export {
  info,
  sugest_value,
  updateData,
  currJingwei,
  measure_value,
  QueryRecord,
}
