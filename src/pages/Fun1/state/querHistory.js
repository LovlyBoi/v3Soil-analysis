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
  }

  record(queryRecord) {
    QueryRecord.queryHistory.push(queryRecord)
    this.cacheHistory()
  }

  cacheHistory() {
    return cache.setCache('queryHistory', QueryRecord.queryHistory)
  }

  getHistory() {
    return QueryRecord.queryHistory = cache.getCache('queryHistory')
  }
}

// static 语法报错，应该是 babel 配置低了，懒得调了
QueryRecord.queryHistory = []

export { QueryRecord }
