import { zwRequest } from '../network'
import message from '../hooks/useMessage'

// fun1查询
function queryFun1(data, showMessage = true, showLoading = true) {
  const config = {
    method: 'POST',
    url: '/fun1',
    // data: {
    //   longitude: jing + '',
    //   latitude: wei + '',
    //   cropName: crop,
    // },
    data,
  }
  if (showMessage) {
    config.interceptors = {
      responseInterceptors(data) {
        if (data.code === 200) {
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      },
    }
  }
  if (!showLoading) {
    config.showLoading = false
  }
  return zwRequest.request(config)
}

// 专家修改建议值
function updateExpertSuggest({
  jing,
  wei,
  elementName,
  cropName,
  suggestValue,
}) {
  return zwRequest.request({
    method: 'POST',
    url: '/newExpertSuggest',
    showLoading: false,
    data: {
      longitude: jing,
      latitude: wei,
      elementName,
      cropName,
      suggestValue,
    },
    interceptors: {
      responseInterceptors(data) {
        if (data.code === 200) {
          message('success', data.msg)
        } else {
          message('error', data.msg)
        }
        return data
      },
    },
  })
}

function getCrops() {
  return zwRequest.request({
    method: 'GET',
    url: '/getEnableCropTypeName',
  })
}

function getExcelURL(data) {
  return zwRequest.request({
    method: 'POST',
    url: '/suggestValues/excel',
    data
  })
}

export { queryFun1, updateExpertSuggest, getCrops, getExcelURL }
