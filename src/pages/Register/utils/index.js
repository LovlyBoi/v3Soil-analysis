function clearInfo(registerInfo) {
  registerInfo.username = ''
  registerInfo.pass = ''
  registerInfo.checkPass = ''
  registerInfo.idcard = ''
  registerInfo.peasantname = ''
}

function makeLoadingTrigger(loadingbtns) {
  return function (state) {
    loadingbtns.forEach((btn) => {
      btn.value = state
    })
  }
}

export { clearInfo, makeLoadingTrigger }
