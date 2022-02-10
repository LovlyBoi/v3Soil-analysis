import { cache } from '@/utils/cache'

class QueryRecord {
  constructor(queryData, responceData) {
    // 查询的数据
    this.cropName = queryData.cropName
    this.queryPosition = {
      latitude: queryData.latitude,
      longitude: queryData.longitude,
    }
    // 响应的数据
    this.isDirectMeasured = JSON.parse(responceData.isDirectMeasured)
    this.mea_Effective_N = responceData.mea_Effective_N
    this.mea_Olsen_K = responceData.mea_Olsen_K
    this.mea_Olsen_P = responceData.mea_Olsen_P
    this.mea_organic_matter = responceData.mea_organic_matter
    this.mea_ph = responceData.mea_ph
    this.realPosition = {
      latitude: responceData.min_Latitude,
      longitude: responceData.min_Longitude,
    }
    this.name_countryside = responceData.name_countryside
    this.name_village = responceData.name_village
    this.sug_Effective_N = responceData.sug_Effective_N
    this.sug_K2SO4 = responceData.sug_K2SO4
    this.sug_KCL = responceData.sug_KCL
    this.sug_Olsen_K = responceData.sug_Olsen_K
    this.sug_Olsen_P = responceData.sug_Olsen_P
    this.sug_erAn = responceData.sug_erAn
    this.sug_niaoSu = responceData.sug_niaoSu
    this.sug_organic_matter = responceData.sug_organic_matter
    this.sug_ph = responceData.sug_ph

    // 新建一个record直接放进记录里
    this.record(this)
  }

  record(queryRecord) {
    let len = QueryRecord.queryHistory.length
    let maxLen = QueryRecord.maxHistoryNumber
    if (len >= maxLen) {
      // QueryRecord.queryHistory = QueryRecord.queryHistory.slice(
      //   len - maxLen + 1,
      //   len
      // )
      QueryRecord.queryHistory = [queryRecord].concat(
        QueryRecord.queryHistory.slice(0, maxLen - 1)
      )
    } else {
      QueryRecord.queryHistory = [queryRecord, ...QueryRecord.queryHistory]
    }
    this.cacheHistory()
  }

  cacheHistory() {
    return cache.setCache('queryHistory', QueryRecord.queryHistory)
  }

}

// static 语法报错，应该是 babel 配置低了，懒得调了
QueryRecord.queryHistory = []

// 记录最大存储量
QueryRecord.maxHistoryNumber = 5

// 初始化记录
QueryRecord.init = function () {
  QueryRecord.queryHistory = cache.getCache('queryHistory') ?? []
}

QueryRecord.generateRequestData = function(queryRecord) {
  const data = {
    mea_organic_matter: queryRecord.mea_organic_matter,
    mea_Olsen_K: queryRecord.mea_Olsen_K,
    mea_Olsen_P: queryRecord.mea_Olsen_P,
    min_Longitude: queryRecord.realPosition.longitude,
    sug_ph: queryRecord.sug_ph,
    sug_Olsen_K: queryRecord.sug_Olsen_K,
    name_countryside: queryRecord.name_countryside,
    sug_organic_matter: queryRecord.sug_organic_matter,
    sug_Effective_N: queryRecord.sug_Effective_N,
    min_Latitude: queryRecord.realPosition.latitude,
    mea_ph: queryRecord.mea_ph,
    isDirectMeasured: JSON.stringify(queryRecord.isDirectMeasured),
    sug_Olsen_P: queryRecord.sug_Olsen_P,
    name_village: queryRecord.name_village,
    mea_Effective_N: queryRecord.mea_Effective_N,
  }
  return data
}

export { QueryRecord }
