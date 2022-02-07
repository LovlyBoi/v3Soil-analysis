import { zwRequest } from '../network'

// 发送fun2查询
export function queryFun2(MEN, MOP, MOK, MOM, crop) {
  return zwRequest.request({
    method: 'GET',
    url: '/fun2',
    params: {
      mea_Effective_N: MEN,
      mea_Olsen_P: MOP,
      mea_Olsen_K: MOK,
      mea_Organic_matter: MOM,
      cropName: crop,
    },
  })
}
