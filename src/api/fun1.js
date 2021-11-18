import { zwRequest } from '../network'
import message from '../hooks/useMessage';

// fun1查询
function queryFun1(jing, wei, crop, showMessage = true) {
  const config = {
    method: 'POST',
    url: '/fun1',
    data: {
      longitude: jing + '',
      latitude: wei + '',
      cropName: crop
    }
  }
  if (showMessage) {
    config.interceptors = {
      responseInterceptors(data) {
        if (data.code == 200) {
          message('success', data.msg)
        }
        else {
          message('error', data.msg)
        }
        return data
      }
    }
  }
  return zwRequest.request(config)
}

// 专家修改建议值
function updateExpertSuggest({ jing, wei, elementName, cropName, suggestValue }) {
  return zwRequest.request({
    method: 'POST',
    url: '/newExpertSuggest',
    data: {
      longitude: jing,
      latitude: wei,
      elementName,
      cropName,
      suggestValue,
    },
    interceptors: {
      responseInterceptors(data) {
        if (data.code == 200) {
          message('success', data.msg)
        }
        else {
          message('error', data.msg)
        }
        return data
      }
    }
  })
}

export {
  queryFun1,
  updateExpertSuggest
}