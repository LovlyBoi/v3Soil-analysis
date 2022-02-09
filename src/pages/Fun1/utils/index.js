import message from '../../../hooks/useMessage'

// 清除所有信息
function clearInfo(data, currJingwei) {
  if (!data) return

  data.name_countryside.value = ''
  data.name_village.value = ''

  data.mea_Effective_N.value = ''
  data.mea_Olsen_P.value = ''
  data.mea_Olsen_K.value = ''
  data.mea_Organic_matter.value = ''

  data.sug_Effective_N.value = ''
  data.sug_Olsen_P.value = ''
  data.sug_Olsen_K.value = ''
  data.sug_Organic_matter.value = ''

  data.sug_niaoSu.value = ''
  data.sug_erAn.value = ''
  data.sug_KCL.value = ''
  data.sug_K2SO4.value = ''

  currJingwei.jing = ''
  currJingwei.wei = ''
}

// 抽离赋值语句
function assignResult(data, res) {
  if (!data) return

  data.name_countryside.value = res.name_countryside
  data.name_village.value = res.name_village

  data.mea_Effective_N.value = res.mea_Effective_N
  data.mea_Olsen_P.value = res.mea_Olsen_P
  data.mea_Olsen_K.value = res.mea_Olsen_K
  data.mea_Organic_matter.value = res.mea_organic_matter
  data.mea_ph.value = res.mea_ph

  data.sug_Effective_N.value = res.sug_Effective_N
  data.sug_Olsen_P.value = res.sug_Olsen_P
  data.sug_Olsen_K.value = res.sug_Olsen_K
  data.sug_Organic_matter.value = res.sug_organic_matter

  data.sug_niaoSu.value = res.sug_niaoSu
  data.sug_erAn.value = res.sug_erAn
  data.sug_KCL.value = res.sug_KCL
  data.sug_K2SO4.value = res.sug_K2SO4
}

// 检查经纬度格式
function checkJingWeiRule(jing, wei) {
  // 判断是否输入了经纬度
  if (jing === '') {
    if (wei !== '') {
      message('warning', '请输入经度')
      return false
    } else {
      clearInfo()
      message('warning', '请先选择一个点，或填写经纬度', 2000)
      return false
    }
  } else {
    if (wei === '') {
      message('warning', '请输入纬度')
      return false
    }
  }

  // 判断经纬度格式
  if (
    /^\d+$|^\d*\.\d+$/g.test(jing) !== true ||
    /^\d+$|^\d*\.\d+$/g.test(wei) !== true
  ) {
    message('error', '经纬度格式不正确')
    return false
  }

  // 判断经纬度数值大小
  if (
    Number.parseFloat(jing) < 0 ||
    Number.parseFloat(jing) >= 180 ||
    Number.parseFloat(wei) < 0 ||
    Number.parseFloat(wei) >= 90
  ) {
    message('error', '请输入正确的经纬度')
    return false
  }

  // 检查完返回true
  return true
}

// 查看点是否越界
function isOutOfBound(jing, wei) {
  if (jing < 124.48 || jing > 125.48) {
    return true
  }
  if (wei < 45.35 || wei > 46.16) {
    return true
  }
  return false
}

function addPoint(mapRef, jing, wei) {
  let point = new window.TMap.LatLng(
    Number.parseFloat(wei),
    Number.parseFloat(jing)
  )
  mapRef.value.addNewMarker(point)
}

export { clearInfo, assignResult, checkJingWeiRule, isOutOfBound, addPoint }
