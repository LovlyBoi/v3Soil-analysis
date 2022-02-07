import message from '../../../hooks/useMessage'
// 检查数据格式
function checkDataRule(meaArr) {
  if (!Array.isArray(meaArr)) {
    return
  }

  // 判断输入值的格式
  if (
    meaArr.some((item) => {
      // 如果有非空项
      return item === '' ? false : true
    })
  ) {
    // 取到所有非空项
    let notEmptyItems = meaArr.filter((item) => {
      return item === '' ? false : true
    })

    // 对所有非空项进行格式判断，只要有不合格的就进行提示
    if (
      notEmptyItems.some((item) => {
        return !/^\d+$|^\d*\.\d+$/g.test(item)
      })
    ) {
      message('error', '请输入正确格式的值')
      return false
    }
    // 格式合格
    return true
  }
  // 一项都没有输入，清空展示框
  else {
    clearInfo()
    return false
  }
}

function clearInfo(data) {
  if (!data) return

  data.sug_Effective_N.value = ''
  data.sug_Olsen_P.value = ''
  data.sug_Olsen_K.value = ''
  data.sug_Organic_matter.value = ''
}

function assignResult(data, res) {
  if (!data) return

  data.sug_Effective_N.value = res.sug_Effective_N
  data.sug_Olsen_P.value = res.sug_Olsen_P
  data.sug_Olsen_K.value = res.sug_Olsen_K
  data.sug_Organic_matter.value = res.sug_Organic_matter
}

export { checkDataRule, assignResult }
