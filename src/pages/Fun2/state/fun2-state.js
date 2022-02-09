import { ref } from 'vue'
const data = {
  // 收集的数据
  mea_Effective_N: ref(''),
  mea_Olsen_P: ref(''),
  mea_Olsen_K: ref(''),
  mea_Organic_matter: ref(''),

  // 服务器返回的数据
  sug_Effective_N: ref(''),
  sug_Olsen_P: ref(''),
  sug_Olsen_K: ref(''),
  sug_Organic_matter: ref(''),
}

export { data }
